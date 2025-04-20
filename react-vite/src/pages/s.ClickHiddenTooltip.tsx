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
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };
  const handleClick = () => {
    setVisible(false);
  };
  return (
    <Tooltip {...props} visible={visible} onVisibleChange={handleVisibleChange}>
      <div onClick={handleClick}>{children}</div>
    </Tooltip>
  );
}
