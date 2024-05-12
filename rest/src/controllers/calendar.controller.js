import { calendarService } from "../services/calendar.service.js";
import { isValidDate } from "../utils/is-valid-date.js";
import { Errors } from "../constants/errors.js";

export class CalendarController {
  /**
   * @type {CalendarService}
   */
  #calendarService;

  /**
   * @param {CalendarService} calendarService
   */
  constructor(calendarService) {
    this.#calendarService = calendarService;
  }

  /**
   * @param {Request} req
   * @return {Promise<calendar_v3.Schema$TimePeriod[]>|*}
   */
  getBusyIntervals(req) {
    const calendarId = req.query.calendarId;
    const startTime = new Date(req.query.startTime);
    const endTime = new Date(req.query.endTime);

    if (!calendarId || !isValidDate(startTime) || !isValidDate(endTime)) {
      throw new Error(Errors.CALENDAR_INVALID_QUERY_PARAMETERS);
    }

    return this.#calendarService.getBusyIntervals(
      calendarId,
      startTime,
      endTime,
    );
  }
}

export const calendarController = new CalendarController(calendarService);
