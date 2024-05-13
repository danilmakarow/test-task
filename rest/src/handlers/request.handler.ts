import { Errors } from "../constants/errors";
import { HttpStatus } from "../constants/http-status";
import { Request, Response } from "express";

export class RequestHandler {
  private returnResult(status: number, res: Response, data: unknown) {
    res.status(status).json({ result: data });
  }

  private returnError(status: number, res: Response, error: object) {
    res.status(status).json({ code: status, ...error });
  }

  handle(
    handlerFunction: (req: Request, res: Response) => unknown,
    statusCode: number = HttpStatus.OK,
  ) {
    return async (req: Request, res: Response) => {
      try {
        const result = await handlerFunction(req, res);
        this.returnResult(statusCode, res, result);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : Errors.DEFAULT_ERROR;
        this.returnError(HttpStatus.INTERNAL_SERVER_ERROR, res, {
          message,
        });
      }
    };
  }
}

export const requestHandler = new RequestHandler();
