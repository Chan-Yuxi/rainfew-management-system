import { connect } from "react-redux";
import { RootState } from "@/store";
import { RouteOption } from "@/@types";

import Guard, { BeforeEachType } from "@/components/Guard";
import { useRoutes } from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/layouts";
import Profile from "@/pages/Setting/profile";
import Account from "@/pages/Setting/account";

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

const beforeEach: BeforeEachType = (location, meta) => {
  // console.log(location, meta);
  setTitle(meta);
  return undefined;
};

function setTitle(meta: unknown) {
  document.title = (meta as { title: string })?.title || "Rainfew";
}

const Router: React.FC<P> = ({ dynamicRoutes }) => {
  console.log("rerender");

  return (
    <Guard
      routes={staticRoutes}
      layout={dynamicRoutes}
      beforeEach={beforeEach}
    />
  );
  // return useRoutes([
  //   {
  //     path: "/login",
  //     element: <Login></Login>,
  //   },
  //   {
  //     path: "/",
  //     element: <Layout></Layout>,
  //     children: [
  //       {
  //         path: "setting/profile",
  //         element: <Profile></Profile>,
  //       },
  //       {
  //         path: "setting/account",
  //         element: <Account></Account>,
  //       },
  //     ],
  //   },
  // ]);
};

export default connect(mapStateToProps)(Router);
