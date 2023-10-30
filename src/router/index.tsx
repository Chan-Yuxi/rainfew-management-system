import { Navigate, useRoutes } from "react-router-dom";
import store from "@/store";
import systemUtils from "@/utils/system";

import type { RouteObject } from "react-router-dom";

import Login from "@/pages/Login";
import Home from "@/pages/Home";

const routes: RouteObject[] = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "/",
    element: <Navigate to="/login"></Navigate>,
  },
];

export const Router = () => {
  return useRoutes([
    ...routes,
    ...systemUtils.mapRoutes(store.getState().system.dynamicRoutes),
  ]);
};
