import { Tooltip } from 'antd';
import { useState } from 'react';
import type { TooltipProps } from 'antd';

type TooltipPropsWithTitle = Extract<TooltipProps, { title: any }>;
type TooltipPropsWithOverlay = Extract<TooltipProps, { overlay: any }>;
type ClickHiddenTooltipPropsWithTitle = Omit<TooltipPropsWithTitle, 'visible' | 'onVisibleChange'>;
type ClickHiddenTooltipPropsWithOverlay = Omit<TooltipPropsWithOverlay, 'visible' | 'onVisibleChange'>;
type ClickHiddenTooltipProps = ClickHiddenTooltipPropsWithTitle | ClickHiddenTooltipPropsWithOverlay;

function ClickHiddenTooltip(props: ClickHiddenTooltipProps) {
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
      <div onClick={handleClick}>{children}</div>
    </Tooltip>
  );
}
