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
