import { Module } from '@nestjs/common';
import { AppointmentModule } from './appointment/appointment.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, AppointmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
