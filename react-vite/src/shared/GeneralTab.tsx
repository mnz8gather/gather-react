import { Menu } from 'antd';
import { pick } from 'lodash';
import { useCallback } from 'react';
import { useControllableValue } from 'ahooks';
import { GeneralContainer } from './GeneralContainer';
import type { AntdMenuClick, AntdMenuItemType } from '@/tool/antdType';

const menuHeightDefault = '50px';

interface GeneralTabProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  items?: AntdMenuItemType;
  value?: string;
  onChange?: (key: string) => void;
  defaultValue?: string;
}

export function GeneralTab(props: GeneralTabProps) {
  const { items, children, title } = props;
  const standardProps = pick(props, ['defaultValue', 'value', 'onChange']);
  const [innerValue, setInnerValue] = useControllableValue<string>(standardProps);
  const click = useCallback<AntdMenuClick>((e) => {
    setInnerValue(e.key);
  }, []);
  return (
    <GeneralContainer title={title} bodyStyle={{ padding: '0 16px' }}>
      <Menu items={items} selectedKeys={[innerValue]} onClick={click} mode='horizontal' style={{ height: menuHeightDefault }} />
      <div style={{ height: `calc(100% - ${menuHeightDefault})`, paddingTop: '16px' }}>{children}</div>
    </GeneralContainer>
  );
}
