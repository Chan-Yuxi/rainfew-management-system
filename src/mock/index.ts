import { createProdMockServer } from "vite-plugin-mock/client";

import userModule from "./modules/user";

export function setupProdMockServer() {
  createProdMockServer([...userModule])
    .then(() => console.log("use mock server"))
    .catch((err) => console.log("failed to start mock server", err));
}
