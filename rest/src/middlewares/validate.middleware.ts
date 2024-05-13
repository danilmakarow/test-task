import { validate as classValidator } from "class-validator";
import { Request, Response } from "express";
import { HttpStatus } from "../constants/http-status";
import { Errors } from "../constants/errors";

type TValidationTypes = "query" | "body";

export const validate =
  (type: TValidationTypes, Dto: { new (...args: any[]): any }) =>
  async (req: Request, res: Response, next: () => void) => {
    const validator = new Dto();

    for (const key in req[type]) {
      validator[key] = req[type][key];
    }

    const validateErrors = await classValidator(validator);

    if (validateErrors.length) {
      const parsedErrors = validateErrors.map(({ property, constraints }) => ({
        field: property,
        errorMessage: Object.values(constraints || {})[0],
      }));

      res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          message: Errors.VALIDADTION_ERROR,
          code: HttpStatus.BAD_REQUEST,
          errors: parsedErrors,
        });

      return;
    }

    next();
  };
