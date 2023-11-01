import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/login",
    method: "post",
    response: () => {
      return {
        code: 200,
        message: "success",
        data: {
          username: "admin",
          nickname: "admin",
          token: "hello-mock-fake-token",
          permissions: ["user:add", "user:delete"],
        },
      };
    },
  },
] as MockMethod[];
