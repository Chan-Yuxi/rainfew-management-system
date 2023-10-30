import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/login",
    method: "post",
    response: () => {
      return {
        code: 200,
        message: "ok",
        data: {
          token: "08ef569828a37703b7797c574cc097af195e0941",
        },
      };
    },
  },
] as MockMethod[];
