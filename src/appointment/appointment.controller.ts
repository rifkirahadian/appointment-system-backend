import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { CancelAppointmentDto } from './dto/cancel-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Res() res: Response,
  ) {
    const { date, time } = createAppointmentDto;
    try {
      await this.appointmentService.validateAvailableAppointments(date, time);
      await this.appointmentService.create(createAppointmentDto);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }

    return res.json({
      message: 'Appointments created',
    });
  }

  @Get()
  @ApiQuery({ name: 'date' })
  async findAll(@Query('date') date, @Res() res: Response) {
    const slots = await this.appointmentService.findAvailableSlots(date);

    return res.json(slots);
  }

  @Post('cancel')
  async cancel(
    @Body() cancelAppointmentDto: CancelAppointmentDto,
    @Res() res: Response,
  ) {
    const { date, time } = cancelAppointmentDto;
    try {
      const appointment = await this.appointmentService.findOneByDateTime(
        date,
        time,
      );
      if (!appointment) {
        throw new BadRequestException('No Appointment at the given time');
      }
      await this.appointmentService.cancel(appointment);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
    return res.json({
      message: 'Appointments canceled',
    });
  }
}
