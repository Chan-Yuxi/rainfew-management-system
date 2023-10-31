import { Method, AxiosHeaders, AxiosRequestConfig } from "axios";

// Store Types
export interface UserState {
  username: string;
  nickname: string;
  token: string;
  permissions: string[];
}

export interface SystemState {
  auth: boolean;
  menus: MenuOption[];
  dynamicRoutes: RouteOption[];
}

// Router Types
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

// Request Type
export interface Result {
  code: number;
  message: string;
  data: unknown;
}

export interface RequestConfig {
  method: Method;
  url: string;
  data?: unknown;
  params?: unknown;
  baseURL?: string;
}

export interface CreateOptions extends AxiosRequestConfig {
  url?: string;
  method?: string;
  baseURL?: string;
  headers?: AxiosHeaders;
  params?: unknown;
  data?: unknown;
  timeout?: number;
  withCredentials?: boolean;
}

// DTO
export type LoginField = {
  username?: string;
  password?: string;
};
