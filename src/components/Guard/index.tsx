import React, { Suspense, lazy, ComponentType, PropsWithChildren } from "react";
import { RouteOption } from "@/@types";
import {
  Navigate,
  RouteObject,
  useLocation,
  useRoutes,
  Location,
} from "react-router-dom";
import Layout from "@/layouts";

const modules = import.meta.glob<boolean, string, { default: ComponentType<unknown> }>("/src/pages/**/*.tsx");

function lazyLoad(routes: RouteOption[]) {
  return routes.map<RouteObject>((route) => {
    const mapRoute: RouteObject = {};
    mapRoute.path = route.path;
    if (route.elementPath) {
      mapRoute.element = wrapper(route.elementPath, route.meta);
    }
    if (route.redirect) {
      mapRoute.element = <Navigate to={route.redirect} replace></Navigate>;
    }
    if (route.children) {
      mapRoute.children = lazyLoad(route.children);
    }
    console.log(mapRoute)
    return mapRoute;
  });
}

function wrapper(elementPath: string, meta: unknown): React.ReactNode {
  const Element = lazy(modules[`/src/pages/${elementPath}.tsx`]);
  return (
    <Suspense fallback={<div>loading...</div>}>
      {/* <BeforeEach meta={meta}> */}
        <Element />
      {/* </BeforeEach> */}
    </Suspense>
  );
}

export type BeforeEachType = (
  location: Location<any>,
  meta: unknown
) => string | undefined;

type P = {
  routes: RouteOption[];
  layout: RouteOption[];
  beforeEach: BeforeEachType;
};

let _beforeEach: BeforeEachType | null = null;
const BeforeEach: React.FC<PropsWithChildren & { meta: unknown }> = ({
  children,
  meta,
}) => {
  const location = useLocation();
  let redirect: ReturnType<BeforeEachType> = undefined;
  if (_beforeEach) {
    redirect = _beforeEach(location, meta);
  }
  return redirect ? <Navigate to={redirect} replace></Navigate> : children;
};

const Guard: React.FC<P> = ({ routes, layout, beforeEach }) => {
  _beforeEach = beforeEach;
  console.log('g rerender')
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: lazyLoad(layout),
    },
    ...lazyLoad(routes),
  ]);
};

export default Guard;
