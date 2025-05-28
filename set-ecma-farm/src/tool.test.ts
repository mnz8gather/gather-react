import { expect, test } from 'vitest';
import { autoConvertSize } from './tool';

test('1025 B', () => {
  expect(autoConvertSize(1025)).toEqual({
    unit: 'KB',
    value: 1,
  });
});
