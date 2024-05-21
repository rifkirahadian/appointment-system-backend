import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
