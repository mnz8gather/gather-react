import { Link } from 'react-router';
import type { MenuProps } from 'antd';
import type { CustomRouteObject } from './interface';

type MenuItem = Required<MenuProps>['items'][number];

export function makeMenu(routes: CustomRouteObject[]): MenuItem[] {
  let temp: MenuItem[] = [];
  for (const route of routes) {
    if (route?.path === '/' && route?.children) {
      temp = recursionMenu(route.children);
      break;
    }
  }
  return temp;
}

/**
 * 暂时不考虑动态参数的问题
 */
function recursionMenu(routes: CustomRouteObject[], parentPath: string = ''): MenuItem[] {
  return routes
    .filter((route) => {
      // 通配符
      if (route?.path === '*') {
        return false;
      }
      return !route.notInMenu;
    })
    .map((route) => {
      let fullPath: string;
      const currentPath = route?.path ?? '';
      // 索引路由
      if (route?.index) {
        fullPath = parentPath || '/';
        const itemTemp: MenuItem = {
          key: fullPath,
          label: <Link to={fullPath}>{route?.label ?? fullPath}</Link>,
        };
        return itemTemp;
      }
      if (currentPath.startsWith('/')) {
        // 绝对路径
        fullPath = currentPath;
      } else {
        if (parentPath) {
          fullPath = `/${parentPath}/${currentPath}`.replace(/\/+/g, '/');
        } else {
          fullPath = currentPath ? `/${currentPath}`.replace(/\/+/g, '/') : '/';
        }
      }

      const temp = route?.children;
      const children = temp ? recursionMenu(temp, fullPath.replace(/\/+$/, '')) : undefined;

      const itemTemp: MenuItem = {
        children,
        key: fullPath,
        label: <Link to={fullPath}>{route?.label ?? fullPath}</Link>,
      };
      return itemTemp;
    });
}
