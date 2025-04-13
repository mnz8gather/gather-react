import type { IndexRouteObject, NonIndexRouteObject } from 'react-router';

interface MenuRouteExtra {
  notInMenu?: false;
  key: string;
}

interface NotInMenuRouteExtra {
  notInMenu: true;
  key?: string;
}

type ExtraRouteObject = MenuRouteExtra | NotInMenuRouteExtra;

type TCustomIndexRoute = IndexRouteObject & ExtraRouteObject;

type TCustomNonIndexRoute = Omit<NonIndexRouteObject, 'children'> & ExtraRouteObject & { children?: TCustomRouteObject[] };

type TCustomRouteObject = TCustomIndexRoute | TCustomNonIndexRoute;
