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

// antd

export type GetProps<T extends React.ComponentType<any> | object> = T extends React.ComponentType<infer P> ? P : T extends object ? T : never;

export type GetProp<T extends React.ComponentType<any> | object, PropName extends keyof GetProps<T>> = NonNullable<GetProps<T>[PropName]>;

type ReactRefComponent<Props extends { ref?: React.Ref<any> | string }> = (props: Props) => React.ReactNode;

type ExtractRefAttributesRef<T> = T extends React.RefAttributes<infer P> ? P : never;

export type GetRef<T extends ReactRefComponent<any> | React.Component<any>> =
  T extends React.Component<any> ? T : T extends React.ComponentType<infer P> ? ExtractRefAttributesRef<P> : never;

type GetProps2<T> = T extends React.ComponentType<infer P> ? P : never;
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
