import { faker } from '@faker-js/faker';
import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import type { SexType } from '@faker-js/faker';
import { ListQueriesDto } from './list-queries.dto';

interface User {
  id: string;
  sex: SexType;
  name: string;
  birthday: number;
}

function createUser(): User {
  return {
    id: faker.string.uuid(),
    sex: faker.person.sexType(),
    name: faker.person.fullName(),
    birthday: faker.date.birthdate().valueOf(),
  };
}

@Controller('user')
export class UserController {
  @Get('/')
  list(
    @Query(
      new ValidationPipe({
        transform: true, // 启用自动类型转换
        whitelist: true, // 自动移除 DTO 中未定义的属性
        forbidNonWhitelisted: true, // 如果有多余属性，则抛出错误
      }),
    )
    queries?: ListQueriesDto,
  ) {
    const size = 108;
    faker.seed(size);
    const temp = faker.helpers.uniqueArray<User>(createUser, size);
    return { data: temp, total: size, queries };
  }
}
