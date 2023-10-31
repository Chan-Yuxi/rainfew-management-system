import { useRoutes, RouteObject } from "react-router-dom";
import store from "@/store";

import systemUtils from "@/utils/system";
import Layout from "@/layouts";
import Login from "@/pages/Login";
import { MenuOption } from "@/@types";

// const routes: RouteObject[] = [
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/",
//     element: <Layout />,
//     children: systemUtils.loadRoutes(
//       systemUtils.extractDynamicRoutesFrom(store.getState().system.menus)
//     ),
//   },
// ];

// console.log(routes);

export const Router = ({ menu }) => {
  return useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Layout />,
      children: systemUtils.loadRoutes(
        systemUtils.extractDynamicRoutesFrom(menu as MenuOption[])
      ),
    },
  ]);
};
