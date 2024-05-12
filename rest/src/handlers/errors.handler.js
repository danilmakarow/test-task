import { validationResult } from "express-validator";
import { Errors } from "../constants/errors.js";
import { HttpStatus } from "../constants/http-status.js";

export class ErrorsHandler {
  #returnResult(status, res, data) {
    res.status(status).json({ result: data });
  }

  #returnError(status, res, error) {
    res.status(status).json({ code: status, ...error });
  }

  #parseValidationError(errorsArray) {
    return errorsArray.map(({ msg, path }) => ({
      field: path,
      message: msg,
    }));
  }

  handle(handlerFunction) {
    return async (req, res) => {
      try {
        const validationErrors = validationResult(req);

        if (validationErrors.errors.length) {
          return this.#returnError(HttpStatus.BAD_REQUEST, res, {
            message: Errors.VALIDADTION_ERROR,
            errors: this.#parseValidationError(validationErrors.errors),
          });
        }

        const result = await handlerFunction(req, res);
        this.#returnResult(HttpStatus.OK, res, result);
      } catch (error) {
        this.#returnError(HttpStatus.INTERNAL_SERVER_ERROR, res, {
          message: error.message || Errors.DEFAULT_ERROR,
        });
      }
    };
  }
}

export const errorsHandler = new ErrorsHandler();
