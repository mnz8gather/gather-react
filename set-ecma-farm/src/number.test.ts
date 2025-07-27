import { describe, expect, it } from 'vitest';
import { formatDigit } from './number';

describe('Number', () => {
  it('1', () => {
    const r1 = formatDigit(500, 2);
    expect(r1).toBe('500');
  });
  it('2', () => {
    const r2 = formatDigit(12.0, 2);
    expect(r2).toBe('12');
  });
  it('3', () => {
    const r3 = formatDigit(12.34567, 3);
    expect(r3).toBe('12.345');
  });
  it('4', () => {
    const r4 = formatDigit(0.0012345, 2);
    expect(r4).toBe('0.0012');
  });
  it('5', () => {
    const r5 = formatDigit(0.12034, 3);
    expect(r5).toBe('0.120');
  });
  it('6', () => {
    const r6 = formatDigit(0.987, 5);
    expect(r6).toBe('0.987');
  });
});
