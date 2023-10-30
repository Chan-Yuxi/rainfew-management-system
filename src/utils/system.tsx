import type { RouteObject } from "react-router-dom";
import type { MenuOption, RouteOption } from "@/@types";
import Guard from "@/components/Guard";

import { lazy, ComponentType } from "react";

const modules = import.meta.glob<boolean, string, { default: ComponentType<unknown> }>("/src/pages/**/*.tsx");

function extractMenuOptions(menusOptions: MenuOption[], prefix = "") {
  const routes: RouteOption[] = [];
  menusOptions.forEach((option) => {

    if (option.path && option.elementPath) {
      // both path and elementPath exists, so consider it as a route
      const route: Partial<RouteOption> = {};
      route.path = prefix + option.path;
      route.elementPath = option.elementPath;
      if (option.children) {
        route.children = extractMenuOptions(option.children);
      }
      routes.push(route as RouteOption);

    } else if (option.path) {
      if (option.children) {
        routes.push(...extractMenuOptions(option.children, prefix + option.path));
      }
      
    } else if (!option.elementPath) {
      if (option.children) {
        routes.push(...extractMenuOptions(option.children));
      }
    }
  });
  return routes;
}

function mapRoutes(routes?: RouteOption[]): RouteObject[] {
  return routes === undefined
    ? []
    : routes.map<RouteObject>((route) => ({
        ...route,
        element: lazyLoad(route.elementPath),
      }));
}

function lazyLoad(path: string) {
  const Component = lazy(modules[`/src/pages/${path}.tsx`]);
  return (
    <Guard>
      <Component />
    </Guard>
  );
}

export default {
  mapRoutes,
  lazyLoad,
  extractMenuOptions,
};
