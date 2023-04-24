type UnionToParm<U> = U extends any ? (k: U) => void : never;
type UnionToSect<U> = UnionToParm<U> extends (k: infer I) => void ? I : never;
type ExtractParm<F> = F extends { (a: infer A): void } ? A : never;

type SpliceOne<Union> = Exclude<Union, ExtractOne<Union>>;
type ExtractOne<Union> = ExtractParm<UnionToSect<UnionToParm<Union>>>;

type ToTupleRec<Union, Rslt extends any[]> = SpliceOne<Union> extends never
  ? [ExtractOne<Union>, ...Rslt]
  : ToTupleRec<SpliceOne<Union>, [ExtractOne<Union>, ...Rslt]>;

/** 联合转元组 */
export type ToTuple<Union> = ToTupleRec<Union, []>;
