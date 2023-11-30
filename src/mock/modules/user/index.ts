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
          nickname: "ChanYuxi",
          email: "2438149743@qq.com",
          status: "Online",
          description: "Hello World always say by a programmer.",
          token: "hello-mock-fake-token",
          roles: ["creator", "admin", "manager"],
          permissions: ["user:add", "user:delete"],
        },
      };
    },
  },
] as MockMethod[];
