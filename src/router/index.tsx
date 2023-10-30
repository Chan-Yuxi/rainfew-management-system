import { useRoutes } from "react-router-dom";
import store from "@/store";
import systemUtils from "@/utils/system";

import type { RouteObject } from "react-router-dom";

import Layout from "@/layouts";
import Login from "@/pages/Login";

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
  },
];

export const Router = () => {
  return useRoutes([
    ...routes,
    ...systemUtils.mapRoutes(store.getState().system.dynamicRoutes),
  ]);
};
