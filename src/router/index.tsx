import { useRoutes } from "react-router-dom";
import { connect } from "react-redux";

import { RootState } from "@/store";
import { RouteOption } from "@/@types";
import Login from "@/pages/Login";

const staticRoutes: RouteOption[] = [
  {
    path: "/login",
    elementPath: "Login/index",
  },
];

const mapStateToProps = (state: RootState) => ({
  dynamicRoutes: state.system.dynamicRoutes,
});

type P = {
  dynamicRoutes: RouteOption[];
};

const Router: React.FC<P> = ({ dynamicRoutes }) => {
  console.log("combine routes:", [...staticRoutes, ...dynamicRoutes]);
  return useRoutes([
    {
      path: "/login",
      element: <Login></Login>,
    },
  ]);
};

export default connect(mapStateToProps)(Router);
