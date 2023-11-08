import type { RouteOption } from "@/@types";
import type { RouteObject } from "react-router-dom";
import type { ComponentType } from "react";

import React, { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import Layout from "@/layouts";

function lazyLoad(routes: RouteOption[]) {
  return routes.map<RouteObject>((route) => {
    const mapRoute: RouteObject = {};
    mapRoute.path = route.path;
    if (route.elementPath) {
      mapRoute.element = wrapper(route.elementPath);
    }
    if (route.redirect) {
      mapRoute.element = <Navigate to={route.redirect} replace></Navigate>;
    }
    if (route.children) {
      mapRoute.children = lazyLoad(route.children);
    }
    return mapRoute;
  });
}

const modules = import.meta.glob<
  boolean,
  string,
  { default: ComponentType<unknown> }
>("/src/pages/**/*.tsx");

function wrapper(elementPath: string): React.ReactNode {
  const Page = elementPath.startsWith("@layout")
    ? Layout
    : lazy(modules[`/src/pages/${elementPath}.tsx`]);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Page />
    </Suspense>
  );
}

const Guard: React.FC<P> = ({ routes }) => {
  return useRoutes(lazyLoad(routes));
};

type P = {
  routes: RouteOption[];
};

export default Guard;
