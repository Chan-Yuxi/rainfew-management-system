import { RouteOption, MenuOption } from "@/@types";
import { MenuProps } from "antd";

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
 * If there are children attributes, there are three situations
 * 1. as a real route with sub routes: Generate Route
 * 2. as a container (without path): push(...)
 * 3. as a label (without elementPath) (requires processing prefix)
 * 4. as a label (without path and elementPath)
 * If the elementPath attribute exists, there is a situation where
 * 1. as a real route
 * Otherwise, there will be an error
 *
 * @param option config
 * @param prefix string
 * @returns dynamicRoutes
 */
function extractRoutes(option: MenuOption[], prefix = "") {
  const routes: RouteOption[] = [];

  option.forEach((o) => {
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
 *
 * @param option config
 * @returns menuItems
 */
function extractItems(option: MenuOption[]): NonNullable<MenuProps["items"]> {
  console.log(option);
  return [];
}

/**
 * Analyze the path configuration information returned by the backend,
 * extract and generate dynamic routing and Antd menu configuration
 * information
 *
 * @param menuOption config
 * @returns [dynamicRoutes, menuItems]
 */
export function resolveMenuOption(menuOption: MenuOption[]) {
  return [extractRoutes(menuOption), extractItems(menuOption)] as const;
}
