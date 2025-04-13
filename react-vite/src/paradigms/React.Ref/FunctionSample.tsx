import React, { forwardRef, useImperativeHandle } from 'react';
import { GeneralRef } from '@/paradigms/React.Ref/interface';

// ======================= 普通函数 =======================
interface SampleGeneralProps extends React.HTMLProps<HTMLDivElement> {}

function Sample1(props: SampleGeneralProps, ref: React.ForwardedRef<GeneralRef>) {
  useImperativeHandle(ref, () => {
    return {
      log(s?: string) {
        console.log(s);
      },
    };
  }, []);

  return <div {...props} />;
}

/** 形式 1 */
export const RefSample1 = forwardRef(Sample1);

/** 形式 2 */
export const RefSample2 = forwardRef<GeneralRef, SampleGeneralProps>(Sample1);

// ======================= 箭头函数 =======================
const Sample3: React.ForwardRefRenderFunction<GeneralRef, SampleGeneralProps> = (props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      log(s?: string) {
        console.log(s);
      },
    };
  }, []);

  return <div {...props} />;
};

/** 形式1 */
export const RefSample3 = forwardRef(Sample3);

const Sample4 = (props: SampleGeneralProps, ref: React.ForwardedRef<GeneralRef>) => {
  useImperativeHandle(ref, () => {
    return {
      log(s?: string) {
        console.log(s);
      },
    };
  }, []);

  return <div {...props} />;
};

/** 形式2 */
export const RefSample4 = forwardRef<GeneralRef, SampleGeneralProps>(Sample4);
