import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { IsSameOrAfterToday } from 'src/utils/decorators/is-same-or-after-today.decorator';
import { IsWeekday } from 'src/utils/decorators/is-weekday.decorator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in the format YYYY-MM-DD',
  })
  @IsNotEmpty()
  @ApiProperty()
  @IsSameOrAfterToday({ message: 'Date must be today or in the future' })
  @IsWeekday()
  date: string;

  @IsNotEmpty()
  @ApiProperty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Time must be in the format HH:MM',
  })
  time: string;
}
