import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter<Error> {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { status, body } = this.formatError(error);
    if (!response.headersSent) {
      response.status(status).json({
        ...body,
        code: addPrefix(status),
      });
    }
  }

  private formatError(error: Error) {
    if (error instanceof HttpException) {
      const status = error.getStatus();
      let body = error.getResponse();

      // unclear what circumstances would return a string
      if (typeof body === 'string') {
        body = { message: body };
      } else {
        const temp = body?.['message'];
        const tempStr = Array.isArray(temp) ? temp.join('; ') : temp;
        if (tempStr) {
          body = { ...body, message: tempStr };
        }
      }

      return { status, body };
    }
    return {
      status: 500,
      body: {
        message: 'Internal server error',
      },
    };
  }
}

function addPrefix(num: number): number {
  const prefix = 101;
  const result = Number(`${prefix}${num}`);
  return result;
}
