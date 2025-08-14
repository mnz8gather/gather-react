import { faker } from '@faker-js/faker';
import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ListQueriesDto } from '../dtos/user.list-queries.dto';
import type { SexType } from '@faker-js/faker';

interface User {
  id: string;
  sex: SexType;
  name: string;
  birthday: number;
  jobTitle: string;
  jobType: string;
}

function createUser(): User {
  return {
    id: faker.string.uuid(),
    sex: faker.person.sexType(),
    name: faker.person.fullName(),
    birthday: faker.date.birthdate({ mode: 'age', min: 0, max: 18 }).valueOf(),
    jobTitle: faker.person.jobTitle(),
    jobType: faker.person.jobType(),
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
    const { current, pageSize, sex, begin, end } = queries;
    const filtered = filterUser(temp, { sex, begin, end });
    const bTemp = (current - 1) * pageSize;
    const eTemp = current * pageSize;
    const slice = filtered.slice(bTemp, eTemp);
    return { data: slice, total: filtered?.length, queries };
  }
}

interface UserFilter {
  begin?: number;
  end?: number;
  sex?: string;
}

function filterUser(data: User[], filter: UserFilter) {
  const { begin, end, sex } = filter;
  return data.filter((item) => {
    const c1 = sex ? item?.sex === sex : true;
    const c2 = begin ? item?.birthday >= begin : true;
    const c3 = end ? item?.birthday <= end : true;
    return c1 && c2 && c3;
  });
}
