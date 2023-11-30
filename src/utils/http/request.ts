import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { requestBefore, responseSuccess, responseFailure } from "./optimized";
import { RequestConfig, Result } from "@/@types";

import nProgress from "nprogress";

class Request {
  instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(requestBefore);
  }

  request<T = Result["data"]>(config: RequestConfig): Promise<T | undefined> {
    nProgress.start();
    return new Promise((resolve, reject) => {
      this.instance
        .request<Result>(config)
        .then((response) => {
          if (responseSuccess) {
            const result = responseSuccess<T>(response);
            result === "error" ? resolve(undefined) : resolve(result);
            return;
          }
          reject("missing response processor");
        })
        .catch((error) => {
          if (responseFailure) {
            reject(responseFailure(error));
            return;
          }
          reject(error);
        })
        .finally(() => {
          nProgress.done();
        });
    });
  }
}

export default Request;
