import { useRoutes, RouteObject } from "react-router-dom";
import store from "@/store";

import systemUtils from "@/utils/system";
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
    children: systemUtils.loadRoutes(
      systemUtils.extractDynamicRoutesFrom(store.getState().system.menu)
    ),
  },
];

export const Router = () => {
  return useRoutes(routes);
};
