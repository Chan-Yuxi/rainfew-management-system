import http from "@/utils/http";

import { LoginField } from "@/@types";

export function login(data: LoginField) {
  return http.request({
    url: "/login",
    method: "post",
    data: data,
  });
}
