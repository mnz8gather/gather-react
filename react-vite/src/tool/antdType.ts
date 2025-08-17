import type { MenuProps, TableProps } from 'antd';

export type MenuItemType = Exclude<MenuProps['items'], undefined>;

export type MenuClick = Exclude<MenuProps['onClick'], undefined>;

export type TableRowSelection<T> = Required<Exclude<TableProps<T>['rowSelection'], undefined>>;
