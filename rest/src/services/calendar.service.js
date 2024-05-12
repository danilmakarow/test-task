import { googleService } from "./google.service.js";

export class CalendarService {
  /**
   * @type {GoogleService}
   */
  #googleService;

  /**
   * @param {GoogleService} googleService
   */
  constructor(googleService) {
    this.#googleService = googleService;
  }

  /**
   * @param {string} calendarId
   * @param {Date} startTime
   * @param {Date} endTime
   * @return {Promise<calendar_v3.Schema$TimePeriod[]>}
   */
  async getBusyIntervals(calendarId, startTime, endTime) {
    const data = await this.#googleService.getCalendarBusyIntervals(
      calendarId,
      startTime.toISOString(),
      endTime.toISOString(),
    );

    return data;
  }
}

export const calendarService = new CalendarService(googleService);
