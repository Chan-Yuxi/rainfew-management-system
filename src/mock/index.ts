import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

import systemModule from "./modules/system";
import userModule from "./modules/user";

export function setupProdMockServer() {
  createProdMockServer([...systemModule, ...userModule]);
}
