import { query } from "express-validator";
import { errorsHandler } from "../handlers/errors.handler.js";
import { calendarController } from "../controllers/calendar.controller.js";
import { CalendarQueryParameters } from "../constants/calendar-query-parameters.js";
import { Routes } from "../constants/routes.js";

/**
 * @param {Express} app
 */
export const router = (app) => {
  app
    .route(Routes.CALENDAR)
    .get(
      query(CalendarQueryParameters.CALENDAR_ID).isString().trim().notEmpty(),
      query(CalendarQueryParameters.START_TIME).isDate(),
      query(CalendarQueryParameters.END_TIME).isDate(),
      errorsHandler.handle(calendarController.getBusyIntervals),
    );
};
