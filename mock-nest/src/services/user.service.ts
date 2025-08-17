import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { BulkIdsDto } from 'src/dtos/shared.dto';
import { PeopleResponseDto, UserResponseDto, PeopleSearchDto } from 'src/dtos/user.dto';

@Injectable()
export class UserService {
  protected people: UserResponseDto[];
  constructor() {
    const size = 108;
    faker.seed(size);
    const people = faker.helpers.uniqueArray<UserResponseDto>(createUser, size);
    this.people = people;
  }

  getAll(dto: PeopleSearchDto): PeopleResponseDto {
    const { current, pageSize, sex, begin, end } = dto;
    const filtered = filterUser(this.people, { sex, begin, end });
    const bTemp = (current - 1) * pageSize;
    const eTemp = current * pageSize;
    const slice = filtered.slice(bTemp, eTemp);
    return { data: slice, total: filtered?.length };
  }

  delete(id: string) {
    this.deleteAll({ ids: [id] });
  }

  deleteAll({ ids }: BulkIdsDto) {
    const idsSet = new Set(ids);
    this.people = this.people.filter((person) => !idsSet.has(person.id));
  }
}

function createUser(): UserResponseDto {
  return {
    id: faker.string.uuid(),
    sex: faker.person.sexType(),
    name: faker.person.fullName(),
    birthday: faker.date.birthdate({ mode: 'age', min: 0, max: 18 }).valueOf(),
    jobTitle: faker.person.jobTitle(),
    jobType: faker.person.jobType(),
  };
}

interface UserFilter {
  begin?: number;
  end?: number;
  sex?: string;
}

function filterUser(data: UserResponseDto[], filter: UserFilter) {
  const { begin, end, sex } = filter;
  return data.filter((item) => {
    const c1 = sex ? item?.sex === sex : true;
    const c2 = begin ? item?.birthday >= begin : true;
    const c3 = end ? item?.birthday <= end : true;
    return c1 && c2 && c3;
  });
}
