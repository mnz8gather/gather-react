type UnionOmit<Type, P, U extends string | number | symbol> = Type extends P ? Omit<Type, U> : never;

type UnionToParm<U> = U extends any ? (k: U) => void : never;
type UnionToSect<U> = UnionToParm<U> extends (k: infer I) => void ? I : never;
type ExtractParm<F> = F extends { (a: infer A): void } ? A : never;

type SpliceOne<Union> = Exclude<Union, ExtractOne<Union>>;
type ExtractOne<Union> = ExtractParm<UnionToSect<UnionToParm<Union>>>;

type ToTupleRec<Union, Rslt extends any[]> =
  SpliceOne<Union> extends never ? [ExtractOne<Union>, ...Rslt] : ToTupleRec<SpliceOne<Union>, [ExtractOne<Union>, ...Rslt]>;

/** 联合转元组 */
export type ToTuple<Union> = ToTupleRec<Union, []>;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

/**
 * 互斥，只能选择一个
 *
 * interface XORE1 {
 *   a: string;
 *   b: number;
 * }
 * interface XORE2 {
 *   c: boolean;
 * }
 * type XORE3 = XOR<XORE1, XORE2>;
 * type XORE4 = XORE1 | XORE2;
 * // difference
 * export const xora: XORE3 = { a: '1', b: 2, c: true };
 * export const xorb: XORE4 = { a: '1', b: 2, c: true };
 */
export type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

type GetProps2<T> = T extends React.ComponentType<infer P> ? P : never;

type Parameters2<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
