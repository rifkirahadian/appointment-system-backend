import { Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('APPOINTMENTS_REPOSITORY')
    private appointmentsRepository: typeof Appointment
  ) {}

  create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { date, time, name } = createAppointmentDto;
    return this.appointmentsRepository.create({ date, time, name });
  }

  findAll(date: string) {
    const dates = Array.from(Array(9).keys()).map((item) => item + 9);
    const slots = [];
    dates.forEach((item) => {
      slots.push({
        date,
        time: `${item}:00`,
        available_slots: 1,
      });
      slots.push({
        date,
        time: `${item}:30`,
        available_slots: 1,
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
