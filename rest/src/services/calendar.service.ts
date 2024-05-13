import {
  GoogleCalendarService,
  googleCalendarService,
} from "./google-calendar.service";

export class CalendarService {
  constructor(private googleService: GoogleCalendarService) {}

  async getBusyIntervals(calendarId: string, startTime: Date, endTime: Date) {
    return await this.googleService.getBusyIntervals(
      calendarId,
      startTime.toISOString(),
      endTime.toISOString(),
    );
  }
}

export const calendarService = new CalendarService(googleCalendarService);
