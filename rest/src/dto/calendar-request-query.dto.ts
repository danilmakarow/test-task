import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CalendarRequestQueryDto {
  @IsString()
  @IsNotEmpty()
  calendarId: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}
