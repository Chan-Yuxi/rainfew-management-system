import http from "@/utils/http";

import { LoginField, UserState } from "@/@types";

export function login(data: LoginField) {
  return http.request<UserState>({
    url: "/login",
    method: "post",
    data: data,
  });
}
