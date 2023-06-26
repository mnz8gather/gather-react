import { Tooltip } from 'antd';
import { levelsArray, typesArray } from './constant';
import type { TooltipProps } from 'antd';

const tipsMap = {
  L1: levelsArray[0],
  L2: levelsArray[1],
  L3: levelsArray[2],
  L4: levelsArray[3],
  T1: typesArray[0],
  T2: typesArray[1],
  T3: typesArray[2],
  T4: typesArray[3],
} as const;

type TipKeys = keyof typeof tipsMap;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

interface TypeOne {
  tipType: 'type' | 'level';
  tipIndex: number;
}

interface TypeTwo {
  tipMark: TipKeys;
}

/** TypeOne,TypeTwo 互斥，只能选择一个 */
type BubbleTipsProps = XOR<TypeOne, TypeTwo>;

/** 可以使用两种不用形式 */
const BubbleTips = (props: BubbleTipsProps & TooltipProps) => {
  const { tipType, tipIndex, tipMark } = props;

  if (tipIndex) {
    const content = tipType === 'level' ? <Tooltip title={levelsArray[tipIndex - 1]} {...props} /> : <Tooltip title={typesArray[tipIndex - 1]} {...props} />;
    return content;
  }

  if (tipMark) {
    return <Tooltip title={tipsMap[tipMark]} {...props} />;
  }

  return <>{props.children}</>;
};

export default BubbleTips;
