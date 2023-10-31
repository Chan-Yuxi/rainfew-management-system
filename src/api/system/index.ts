import http from "@/utils/http";

export function getMenus() {
  return http.request({
    url: "/menu",
    method: "get",
  });
}
