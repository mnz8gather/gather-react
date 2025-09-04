import { Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { GeneralTab } from '@/shared/GeneralTab';
import type { TooltipProps } from 'antd';
import '@/style/AutoEllipsis.scss';

const items = [
  {
    key: 'click-hidden',
    label: '点击隐藏',
  },
  {
    key: 'auto-ellipsis',
    label: '自动省略',
  },
];

export function AntdTooltipPage() {
  const [current, setCurrent] = useState('click-hidden');
  return (
    <GeneralTab title='antd Tooltip' items={items} value={current} onChange={setCurrent}>
      {current === 'click-hidden' ? <ClickHiddenSample /> : null}
      {current === 'auto-ellipsis' ? <AutoEllipsisSample /> : null}
    </GeneralTab>
  );
}

function ClickHiddenSample() {
  return (
    <>
      <ClickHidden title='点击隐藏'>点击</ClickHidden>
    </>
  );
}

type TooltipPropsWithTitle = Extract<TooltipProps, { title: any }>;
type TooltipPropsWithOverlay = Extract<TooltipProps, { overlay: any }>;
type ClickHiddenPropsWithTitle = Omit<TooltipPropsWithTitle, 'visible' | 'onVisibleChange'>;
type ClickHiddenPropsWithOverlay = Omit<TooltipPropsWithOverlay, 'visible' | 'onVisibleChange'>;
type ClickHiddenProps = ClickHiddenPropsWithTitle | ClickHiddenPropsWithOverlay;

function ClickHidden(props: ClickHiddenProps) {
  const { children } = props;
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newVisible: boolean) => {
    setOpen(newVisible);
  };
  const handleClick = () => {
    setOpen(false);
  };
  return (
    <Tooltip {...props} open={open} onOpenChange={handleOpenChange}>
      <span onClick={handleClick}>{children}</span>
    </Tooltip>
  );
}

/**
 * fork: ant-design
 *
 * ant-design: components\typography\Base\util.ts
 * - https://github.com/ant-design/ant-design/issues/50143
 * - https://github.com/ant-design/ant-design/issues/50414
 */
function isEleEllipsis(ele: HTMLElement): boolean {
  // Create a new div to get the size
  const childDiv = document.createElement('em');
  ele.appendChild(childDiv);

  const rect = ele.getBoundingClientRect();
  const childRect = childDiv.getBoundingClientRect();

  // Reset
  ele.removeChild(childDiv);

  // Range checker
  return (
    // Horizontal out of range
    rect.left > childRect.left ||
    childRect.right > rect.right ||
    // Vertical out of range
    rect.top > childRect.top ||
    childRect.bottom > rect.bottom
  );
}

const prefixCls = 'auto-ellipsis';

interface AutoEllipsisProps {
  children?: React.ReactNode;
}

function AutoEllipsis(props: AutoEllipsisProps) {
  const { children } = props;
  const typographyRef = useRef<HTMLElement>(null);
  const [isNativeEllipsis, setIsNativeEllipsis] = useState(false);
  useEffect(() => {
    const textEle = typographyRef.current;
    if (textEle) {
      const currentEllipsis = isEleEllipsis(textEle);
      if (isNativeEllipsis !== currentEllipsis) {
        setIsNativeEllipsis(currentEllipsis);
      }
    }
  }, [children]);
  return (
    <Tooltip title={isNativeEllipsis ? children : undefined}>
      <span
        className={clsx({
          [`${prefixCls}-ellipsis`]: true,
          [`${prefixCls}-ellipsis-single-line`]: true,
        })}
        ref={typographyRef}
      >
        {children}
      </span>
    </Tooltip>
  );
}

function AutoEllipsisSample() {
  return (
    <div style={{ width: '50px' }}>
      <AutoEllipsis>
        aaaaaaaaaaaaa<span>11111111111</span>aaaaaa
      </AutoEllipsis>
    </div>
  );
}
