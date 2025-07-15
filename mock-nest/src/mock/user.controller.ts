import { faker } from '@faker-js/faker';
import { Controller, Get, Query } from '@nestjs/common';
import type { SexType } from '@faker-js/faker';

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
    @Query('current') current?: number,
    @Query('pageSize') pageSize?: number,
    @Query('begin') begin?: number,
    @Query('end') end?: number,
    @Query('sex') sex?: string,
  ) {
    const size = 108;
    faker.seed(size);
    const temp = faker.helpers.uniqueArray<User>(createUser, size);
    return { data: temp, total: size };
  }
}
