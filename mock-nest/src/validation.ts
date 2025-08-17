import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator';

interface OptionalOptions {
  nullable?: boolean;
  /** convert empty strings to null */
  emptyToNull?: boolean;
}

/**
 * Checks if value is missing and if so, ignores all validators.
 *
 * @param validationOptions {@link OptionalOptions}
 *
 * @see IsOptional exported from `class-validator.
 */
// https://stackoverflow.com/a/71353929
export function Optional({ nullable, emptyToNull, ...validationOptions }: OptionalOptions = {}) {
  const decorators: PropertyDecorator[] = [];

  if (nullable === true) {
    decorators.push(IsOptional(validationOptions));
  } else {
    decorators.push(ValidateIf((object: any, v: any) => v !== undefined, validationOptions));
  }

  if (emptyToNull) {
    decorators.push(Transform(({ value }) => (value === '' ? null : value)));
  }

  return applyDecorators(...decorators);
}

type UUIDOptions = { optional?: boolean; each?: boolean; nullable?: boolean };

export const ValidateUUID = (options?: UUIDOptions) => {
  const { optional, each, nullable, ...apiPropertyOptions } = {
    optional: false,
    each: false,
    nullable: false,
    ...options,
  };
  return applyDecorators(
    IsUUID('4', { each }),
    optional ? Optional({ nullable }) : IsNotEmpty(),
    each ? IsArray() : IsString(),
  );
};
