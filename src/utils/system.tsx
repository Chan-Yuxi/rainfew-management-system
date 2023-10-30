import type { RouteObject } from "react-router-dom";
import type { RouteOption } from "@/@types";
import Guard from "@/components/Guard";

import { lazy, ComponentType } from "react";

const modules = import.meta.glob<boolean, string, { default: ComponentType<unknown> }>("../pages/**/*.tsx");

function mapRoutes(routes?: RouteOption[]): RouteObject[] {
  return routes === undefined
    ? []
    : routes.map<RouteObject>((route) => ({
        ...route,
        element: lazyLoad(route.elementPath),
      }));
}

function lazyLoad(path: string) {
  console.log('import :', `../pages/${path}.tsx`);
  const Component = lazy(modules[`../pages/${path}.tsx`]);
  return (
    <Guard>
      <Component />
    </Guard>
  );
}

export default {
  mapRoutes,
  lazyLoad,
};
