import { RouteOption, MenuOption } from "@/@types";

export function extractDynamicRoutes(menuOptions?: MenuOption[], prefix = "") {
  const routes: RouteOption[] = [];
  menuOptions &&
    menuOptions.forEach((option) => {
      if (option.path && option.elementPath) {
        // both path and elementPath exists, so consider it as a route
        const { path, elementPath, children } = option;
        // remove excess "/"
        option.path = `${prefix}/${
          path.startsWith("/") ? path.substring(1) : path
        }`;

        const route = {
          path: option.path,
          elementPath: elementPath,
          children: extractDynamicRoutes(children),
        };

        // remove excess attributes
        Reflect.deleteProperty(option, "elementPath");
        if (route.children.length === 0) {
          Reflect.deleteProperty(route, "children");
        }
        routes.push(route);
      } else if (option.children) {
        if (option.path) {
          routes.push(
            ...extractDynamicRoutes(option.children, prefix + option.path)
          );
          Reflect.deleteProperty(option, "path");
        } else {
          routes.push(...extractDynamicRoutes(option.children, prefix));
        }
      } else {
        console.error(
          "failed to parse menu configuration: if both path and elementPath attributes are not provided, then the attribute children is required"
        );
      }
    });
  return routes;
}
