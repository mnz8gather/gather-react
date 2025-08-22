import { Tooltip } from 'antd';
import { useState } from 'react';
import { GeneralTab } from '@/shared/GeneralTab';
import type { TooltipProps } from 'antd';

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
