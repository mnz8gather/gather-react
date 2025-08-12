import type { MenuProps } from 'antd';

export type AntdMenuItemType = Exclude<MenuProps['items'], undefined>;

export type AntdMenuClick = Exclude<MenuProps['onClick'], undefined>;
