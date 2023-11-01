import { MockMethod } from "vite-plugin-mock";
import menuDefaultResponse from "./menu_default.json";

export default [
  {
    url: "/api/menu",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "success",
        data: menuDefaultResponse,
      };
    },
  },
] as MockMethod[];
