import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('APPOINTMENTS_REPOSITORY')
    private appointmentsRepository: typeof Appointment,
    private configService: ConfigService,
  ) {}

  create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { date, time, name } = createAppointmentDto;
    return this.appointmentsRepository.create({ date, time, name });
  }

  async findAllActives(date: string): Promise<Appointment[]> {
    return this.appointmentsRepository.findAll({
      where: {
        date: Sequelize.where(
          Sequelize.fn('strftime', '%Y-%m-%d', Sequelize.col('date')),
          date,
        ),
        status: 'active',
      },
    });
  }

  async validateAvailableAppointments(date: string, time: string) {
    const appointments = await this.findAvailableSlots(date);
    const isAvailable = appointments.find((item) => item.time === time);
    if (!isAvailable) {
      throw new BadRequestException('This time is not available');
    }

    const isTaken = appointments.find(
      (item) => item.time === time && item.available_slots === 0,
    );
    if (isTaken) {
      throw new BadRequestException('This time has been taken');
    }
  }

  async findAvailableSlots(date: string) {
    const slotDuration = this.configService.get<number>(
      'appointment.slot.duration',
    );
    const appointments = await this.findAllActives(date);
    const appointmentsTime = appointments.map((item) => item.time);

    const startHour = 9;
    const endHour = 18;
    const slots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const time = `${hour > 9 ? '' : '0'}${hour}:${minute === 0 ? '00' : minute}`;
        slots.push({
          date,
          time,
          available_slots: appointmentsTime.indexOf(time) < 0 ? 1 : 0,
        });
      }
    }

    return slots;
  }

  async findOneByDateTime(date: string, time: string): Promise<Appointment> {
    return this.appointmentsRepository.findOne({
      where: {
        date: Sequelize.where(
          Sequelize.fn('strftime', '%Y-%m-%d', Sequelize.col('date')),
          date,
        ),
        time,
      },
    });
  }

  async cancel(appointment: Appointment): Promise<Appointment> {
    appointment.status = 'canceled';
    await appointment.save();

    return appointment;
  }
}
