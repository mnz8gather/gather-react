import { IsInt, IsOptional, Allow } from 'class-validator';
import { Type } from 'class-transformer';
import { GeneralPagingParamsDto } from './shared.dto';
import type { SexType } from '@faker-js/faker';

export class SearchPeopleDto extends GeneralPagingParamsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  begin?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  end?: number;

  @Allow()
  sex: string;
}

export class UserResponseDto {
  id: string;
  sex: SexType;
  name: string;
  birthday: number;
  jobTitle: string;
  jobType: string;
}

export class PeopleResponseDto {
  data: UserResponseDto[];
  total: number;
}

export class SearchPersonDto extends GeneralPagingParamsDto {
  @Allow()
  query?: string;
}
