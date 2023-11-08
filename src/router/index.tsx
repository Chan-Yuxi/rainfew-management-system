import type { RootState } from "@/store";
import type { RouteOption } from "@/@types";

import { connect } from "react-redux";

import Guard from "@/components/Guard";

const staticRoutes: RouteOption[] = [
  {
    path: "/login",
    elementPath: "Login/index",
    meta: {
      title: "Login",
    },
  },
  {
    path: "/404",
    elementPath: "Error/404",
  },
  {
    path: "/405",
    elementPath: "Error/405",
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const mapStateToProps = (state: RootState) => ({
  dynamicRoutes: state.system.dynamicRoutes,
});

type P = {
  dynamicRoutes: RouteOption[];
};

const Router: React.FC<P> = ({ dynamicRoutes }) => {
  return <Guard routes={[...staticRoutes, ...dynamicRoutes]} />;
};

export default connect(mapStateToProps)(Router);
