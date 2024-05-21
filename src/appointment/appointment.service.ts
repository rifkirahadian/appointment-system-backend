import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('APPOINTMENTS_REPOSITORY')
    private appointmentsRepository: typeof Appointment,
  ) {}

  create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { date, time, name } = createAppointmentDto;
    return this.appointmentsRepository.create({ date, time, name });
  }

  async findAll(date: string): Promise<Appointment[]> {
    return this.appointmentsRepository.findAll({
      where: {
        date: Sequelize.where(
          Sequelize.fn('strftime', '%Y-%m-%d', Sequelize.col('date')),
          date,
        ),
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
    const appointments = await this.findAll(date);
    const appointmentsTime = appointments.map((item) => item.time);
    const dates = Array.from(Array(9).keys()).map((item) => item + 9);
    const slots = [];
    dates.forEach((item) => {
      const time1 = `${item > 9 ? '' : '0'}${item}:00`;
      const time2 = `${item > 9 ? '' : '0'}${item}:30`;
      slots.push({
        date,
        time: time1,
        available_slots: appointmentsTime.indexOf(time1) < 0 ? 1 : 0,
      });
      slots.push({
        date,
        time: time2,
        available_slots: appointmentsTime.indexOf(time2) < 0 ? 1 : 0,
      });
    });
    return slots;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
