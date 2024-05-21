import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { appointmentsProviders } from './entities/appoinments.provider';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, ...appointmentsProviders],
})
export class AppointmentModule {}
