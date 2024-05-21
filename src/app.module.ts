import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'database/database.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [DatabaseModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
