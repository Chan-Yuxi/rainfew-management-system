import { CreateOptions } from "@/@types";
import Request from "./request";

function createAxios(options: CreateOptions) {
  return new Request({
    baseURL: "/",
    timeout: 10 * 1000,
    headers: { "Content-Type": "application/json;charset=utf-8" },
    ...options,
  });
}

const defaultRequest = createAxios({
  baseURL: "api/",
});

export default defaultRequest;
