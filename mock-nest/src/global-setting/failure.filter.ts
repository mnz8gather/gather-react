import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class FailureFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception?.getStatus?.();
    const message = exception.message;

    response.status(status).json({
      code: addPrefix(status),
      message,
    });
  }
}

function addPrefix(num: number): number {
  const prefix = 101;
  const numStr = num.toString();
  const result = Number(`${prefix}${numStr}`);
  return result;
}
