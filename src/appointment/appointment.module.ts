import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { appointmentsProviders } from './entities/appoinments.provider';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService, ...appointmentsProviders, ConfigService],
})
export class AppointmentModule {}
