import { calendar_v3, google } from "googleapis";
import { Errors } from "../constants/errors";

export class GoogleCalendarService {
  calendarApi = google.calendar("v3");

  async getBusyIntervals(
    calendarId: string,
    timeMin: string,
    timeMax: string,
  ): Promise<calendar_v3.Schema$TimePeriod[]> {
    try {
      const response = await this.calendarApi.freebusy.query({
        auth: process.env.GOOGLE_API_KEY,
        requestBody: {
          timeMin,
          timeMax,
          items: [{ id: calendarId }],
        },
      });

      const calendarsData = response.data.calendars?.[calendarId].busy;

      if (!calendarsData) {
        throw new Error(Errors.NO_CALENDAR_DATA);
      }

      return calendarsData;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : Errors.DEFAULT_GOOGLE_ERROR;
      throw new Error(message);
    }
  }
}

export const googleCalendarService = new GoogleCalendarService();
