function extractRoutes(option, prefix = "") {
  const error = (o) => {
    throw new Error(
      "failed to resolve menu config: incorrect configuration format" + o
    );
  };

  const routes = [];
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
        error(o);
      }
    }
  });

  // console.log("extract Route: ", routes);
  return routes;
}

function generateRoute(o, prefix) {
  const route = {};
  if (o.index) {
    route.index = true;
  }
  if (o.path) {
    route.path = prefix + appendSeparator(o.path);
  }
  route.elementPath = o.elementPath;
  if (o.children) {
    route.children = extractRoutes(o.children);
  }
  return route;
}

function appendSeparator(str) {
  return str.startsWith("/") ? str : "/" + str;
}

console.dir(
  extractRoutes([
    {
      path: "/home",
      elementPath: "Home/index",
    },
    {
      path: "/layout",
      children: [
        {
          path: "/setting",
          elementPath: "Component/Setting/index",
        },
      ],
    },
    {
      path: "account",
      elementPath: "/Layout/index",
      children: [
        {
          children: [
            {
              path: "/hello",
              elementPath: "Hello/index",
            },
          ],
        },
        {
          path: "/username",
          elementPath: "Account/Username/index",
        },
      ],
    },
  ]),
  {
    depth: 10,
  }
);
