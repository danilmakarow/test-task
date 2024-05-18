import { Express } from "express";
import { calendarController } from "../controllers/calendar.controller";
import { Routes } from "../constants/routes";
import { requestHandler } from "../handlers/request.handler";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { CalendarRequestQueryDto } from "../dto/calendar-request-query.dto";

export const router = (app: Express) => {
  app
    .route(Routes.CALENDAR)
    .get(
      validateMiddleware("query", CalendarRequestQueryDto),
      requestHandler.handle(
        calendarController.getBusyIntervals.bind(calendarController),
      ),
    );
};
