import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class CancelAppointmentDto {
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in the format YYYY-MM-DD',
  })
  @IsNotEmpty()
  @ApiProperty()
  date: string;

  @IsNotEmpty()
  @ApiProperty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Time must be in the format HH:MM',
  })
  time: string;
}
