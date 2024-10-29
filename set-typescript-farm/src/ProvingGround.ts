import type { IsEqual, ObjectValueType } from './utilities';

interface A {
  [option_depth: number]: string;
  default: string;
}

type B = Record<number | 'default', string>;

type DD = IsEqual<A, B>;

interface Profile {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  age: number;
  isOnline: boolean;
}

type ProfileValues = ObjectValueType<Profile>;
type OVTN = ObjectValueType<null>;
type OVTNB = ObjectValueType<boolean>;
