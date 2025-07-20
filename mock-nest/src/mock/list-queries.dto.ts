import { IsInt, IsOptional, Allow } from 'class-validator';
import { Type } from 'class-transformer';
import { GeneralPagingParamsDto } from './pagination.dto';

export class ListQueriesDto extends GeneralPagingParamsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  begin?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  end?: boolean;

  @Allow()
  sex: string;
}
