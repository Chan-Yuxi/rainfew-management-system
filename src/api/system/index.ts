import http from "@/utils/http";

export function getMenu() {
  return http.request({
    url: "/menu",
    method: "get",
  });
}
