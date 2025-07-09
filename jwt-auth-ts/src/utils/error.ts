import { Response } from "express";

export enum ErrorType {
  AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
  AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  NOT_FOUND_ERROR = "NOT_FOUND_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
  ALREADY_EXISTS = "ALREADY EXISTS",
}

export const sendError = (res: Response, errorType: ErrorType, msg: String) => {
  let statusCode: number = 400;
  switch (errorType) {
    case ErrorType.ALREADY_EXISTS:
      statusCode = 409;
      break;
    case ErrorType.AUTHENTICATION_ERROR || ErrorType.AUTHORIZATION_ERROR:
      statusCode = 401;
      break;
    case ErrorType.NOT_FOUND_ERROR:
      statusCode = 404;
      break;
    case ErrorType.VALIDATION_ERROR:
      statusCode = 400;
      break;
    case ErrorType.SERVER_ERROR:
      statusCode = 500;
  }
  return res.status(statusCode).json({ message: msg, type: errorType });
};
