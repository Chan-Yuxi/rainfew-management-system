import { MenuOption } from "@/@types";
import http from "@/utils/http";

export function getMenus() {
  return http.request<MenuOption[]>({
    url: "/menu",
    method: "get",
  });
}
