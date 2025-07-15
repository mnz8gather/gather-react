import type { IndexRouteObject, NonIndexRouteObject } from 'react-router';

interface RouteObjectExtra {
  notInMenu?: boolean;
  label?: React.ReactNode;
}

interface ICustomIndexRouteObject extends IndexRouteObject, RouteObjectExtra {
  // IndexRouteObject 中没有 children, 遵循 IndexRouteObject 的约束
}

interface ICustomNonIndexRouteObject extends NonIndexRouteObject, RouteObjectExtra {
  children?: ICustomRouteObject[];
}

type ICustomRouteObject = ICustomIndexRouteObject | ICustomNonIndexRouteObject;

export type CustomRouteObject = ICustomRouteObject;
