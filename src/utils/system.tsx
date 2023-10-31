import { RouteObject } from "react-router-dom";
import { MenuOption, RouteOption } from "@/@types";
import Guard from "@/components/Guard";

import { lazy, ComponentType } from "react";

const modules = import.meta.glob<boolean, string, { default: ComponentType<unknown> }>("/src/pages/**/*.tsx");

function loadRoutes(routes?: RouteOption[]): RouteObject[] {
  return routes === undefined
    ? []
    : routes.map<RouteObject>((route) => ({
        path: route.path,
        element: lazyLoad(route.elementPath),
        children: loadRoutes(route.children),
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

function extractDynamicRoutesFrom(menusOptions: MenuOption[], prefix = "") {
  const routes: RouteOption[] = [];
  menusOptions.forEach((option) => {
    if (option.path && option.elementPath) {
      // both path and elementPath exists, so consider it as a route
      const route: Partial<RouteOption> = {};
      route.path = prefix + option.path;
      route.elementPath = option.elementPath;
      if (option.children) {
        route.children = extractDynamicRoutesFrom(option.children);
      }
      routes.push(route as RouteOption);
    } else if (option.path) {
      if (option.children) {
        routes.push(
          ...extractDynamicRoutesFrom(option.children, prefix + option.path)
        );
      }
    } else if (!option.elementPath) {
      if (option.children) {
        routes.push(...extractDynamicRoutesFrom(option.children));
      }
    }
  });
  return routes;
}

export default {
  loadRoutes,
  lazyLoad,
  extractDynamicRoutesFrom,
};
