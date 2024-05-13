import { Request } from "express";
import { CalendarService, calendarService } from "../services/calendar.service";
import { isValidDate } from "../utils/is-valid-date";
import { Errors } from "../constants/errors";
import { isString } from "class-validator";

export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  getBusyIntervals(req: Request) {
    const calendarId = req.query.calendarId;
    const startTime = new Date(req.query.startTime as string);
    const endTime = new Date(req.query.endTime as string);

    if (
      !isString(calendarId) ||
      !isValidDate(startTime) ||
      !isValidDate(endTime)
    ) {
      throw new Error(Errors.INVALID_CALENDAR_QUERY_PARAMETERS);
    }

    return this.calendarService.getBusyIntervals(
      calendarId,
      startTime,
      endTime,
    );
  }
}

export const calendarController = new CalendarController(calendarService);
