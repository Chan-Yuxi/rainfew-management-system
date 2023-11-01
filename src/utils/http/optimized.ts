import { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import store from "@/store";

import { Result } from "@/@types";
import { HttpCode } from "@/@types/enum";

export function requestBefore(request: InternalAxiosRequestConfig) {
  const token = store.getState().user.token;
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}

/**
 * The successful response parsing of axios requires us to return the desired
 * result based on a custom status code. We only return data when the status
 * code is 200, and in other cases, it is the string "error". Therefore, in
 * practical use, it is necessary to determine whether the data is undefined
 *
 * @param res response of axios
 * @returns result
 */
export function responseSuccess<T>(res: AxiosResponse<Result>): T | "error" {
  const { code, message, data } = res.data;
  switch (code) {
    case HttpCode.SUCCESS:
      return <T>data;
    case HttpCode.ERROR:
      console.log("request error", code, message);
  }
  return "error";
}

/**
 * When axios requests an error, it is usually because the status value of the
 * HTTP protocol is not 200. Therefore, we will respond based on the status
 * code or use the Antd messaging system to notify the user. Afterwards, we
 * reject this promise method
 *
 * @param err error
 * @returns error
 */
export function responseFailure(err: unknown) {
  return err;
}
