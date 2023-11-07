import type { RouteOption, MenuOption } from "@/@types";
import type { MenuProps } from "antd";

function error() {
  throw new Error(
    "failed to resolve menu config: incorrect configuration format"
  );
}

/**
 * When a string does not start with `/`, add `/` to its beginning and return
 * @param str string
 * @returns string with `/`
 */
function appendSeparator(str: string) {
  return str.startsWith("/") ? str : "/" + str;
}

/**
 * If there are children attributes, there are four situations
 *
 * 1. as a real route with sub routes, then generate route
 * 2. as a container (without path)
 * 3. as a label (without elementPath, requires processing prefix)
 * 4. as a label (without path and elementPath)
 *
 * If the elementPath attribute exists, there is a situation where
 *
 * 1. as a real route
 *
 * Otherwise, there will be an error
 *
 * @param options config
 * @param prefix string
 * @returns dynamicRoutes
 */
function extractRoutes(options: MenuOption[], prefix = "") {
  const routes: RouteOption[] = [];

  options.forEach((o) => {
    if (o.children) {
      if (o.elementPath) {
        routes.push(generateRoute(o, prefix));
      } else {
        routes.push(
          ...extractRoutes(
            o.children,
            o.path ? prefix + appendSeparator(o.path) : prefix
          )
        );
      }
    } else {
      if (o.path && o.elementPath) {
        routes.push(generateRoute(o, prefix));
      } else {
        error();
      }
    }
  });

  return routes;
}

/**
 * generate route
 */
function generateRoute(o: MenuOption, prefix: string) {
  const route: Partial<RouteOption> = {};

  if (o.index) {
    route.index = true;
  }
  route.elementPath = o.elementPath;
  if (o.path) {
    route.path = prefix + appendSeparator(o.path);
  }
  if (o.children) {
    route.children = extractRoutes(o.children);
  }

  return route as RouteOption;
}

/**
 * Map commonly used menu configuration properties for Antd and return
 * 
 * @param options config
 * @returns menuItems
 */
function extractItems(options: MenuOption[]) {
  return options.map((o) => {
    const item: Record<keyof any, any> = {};

    if (o.label) {
      item.label = o.label;
    }
    if (o.type) {
      item.type = o.type;
    }
    if (o.path) {
      item.key = appendSeparator(o.path);
    }
    if (o.children) {
      item.children = extractItems(o.children);
    }

    return item;
  }) as NonNullable<MenuProps["items"]>;
}

/**
 * Analyze the path configuration information returned by the backend,
 * extract and generate dynamic routing and Antd menu configuration
 * information
 *
 * @param menuOptions config
 * @returns [dynamicRoutes, menuItems]
 */
function resolveMenuOption(menuOptions: MenuOption[]) {
  return [extractRoutes(menuOptions), extractItems(menuOptions)] as const;
}

export default {
  resolveMenuOption,
};
