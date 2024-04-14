import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { GeneralResponse } from './generic';

@Injectable()
export class SuccessInterceptor<T, R>
  implements NestInterceptor<T, GeneralResponse<R>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<GeneralResponse<R>> {
    return next.handle().pipe(
      map((data: GeneralResponse<R>) => ({
        code: 1001,
        message: 'success',
        ...data,
      })),
    );
  }
}
