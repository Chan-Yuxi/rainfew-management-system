function extractItems(options) {
  return options.map((o) => {
    const item = {};

    if (o.label) {
      item.label = o.label;
    }
    if (o.type) {
      item.type = o.type;
    }
    if (o.path) {
      item.key = o.path;
    }
    if (o.children) {
      item.children = extractItems(o.children);
    }

    return item;
  });
}

console.dir(
  extractItems([
    {
      path: "/home",
      label: "Home",
      key: "home",
      elementPath: "Home/index",
      children: [{}],
    },
    {
      path: "/setting",
      key: "setting",
      label: "Setting",
      children: [
        {
          type: "group",
          label: "mine",
          children: [
            {
              path: "profile",
              label: "profile",
              key: "profile",
              elementPath: "Setting/profile",
            },
            {
              path: "/account",
              label: "account",
              key: "account",
              elementPath: "Setting/account",
            },
          ],
        },
        {
          type: "divider",
        },
        {
          type: "group",
          label: "other",
          children: [
            {
              path: "system",
              label: "system",
              key: "system",
              elementPath: "Setting/system",
            },
          ],
        },
      ],
    },
  ]),
  {
    depth: 10,
  }
);
