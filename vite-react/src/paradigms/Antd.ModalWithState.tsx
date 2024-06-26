// 根据不同的 props 渲染不同的内容
// 这种在 hook 会有影响，不能使用
// if (destroyOnClose && !open) {
//   return null;
// }

import { useEffect } from 'react';

// 请求类型改成手动模式
// useEffect 增加判断
// react 18 增加 ignore

function T(props: any) {
  const { destroyOnClose, open } = props;

  useEffect(() => {
    if (!(destroyOnClose && !open)) {
    }
  }, [destroyOnClose, open]);

  if (destroyOnClose && !open) {
    return null;
  }
  return <>modal</>;
}
