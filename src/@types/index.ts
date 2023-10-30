// store Types
export interface UserState {
  username: string;
  nickname: string;
  permissions: string[];
}

export interface SystemState {
  auth: boolean;
  dynamicRoutes: RouteOption[];
}

// router Types
export interface RouteOption {
  // @example Home/index
  //          System/User/index
  //          ...
  path: string;
  elementPath: string;
  children?: RouteOption[];
}

export interface MenuOption extends RouteOption {
  label: string;
  key: string;
  disable: boolean;
  type?: string;
  children?: MenuOption[];
}
