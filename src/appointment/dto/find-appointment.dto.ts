import { IsNotEmpty, Matches } from 'class-validator';

export class FindAvailableSlotsDto {
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in the format YYYY-MM-DD',
  })
  date: string;
}
