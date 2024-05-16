import axios from "axios";
import type { AxiosInstance } from "axios";
import type { RYRequestConfig } from "./type";

class RYRequest {
  instance: AxiosInstance;

  constructor(config: RYRequestConfig) {
    // request实例 => axios实例
    this.instance = axios.create(config);

    // 每个instance实例都要有拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return error;
      },
    );
    this.instance.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (error) => error,
    );
  }

  // 封装网络请求的方法
  request<T = any>(config: RYRequestConfig<T>) {
    if (config.interceptors?.requestSuccess) {
      // 单次请求的成功请求处理
      config = config.interceptors.requestSuccess(config);
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应成功的拦截器
          if (config.interceptors?.responseSuccess) {
            res = config.interceptors.responseSuccess(res);
          }
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  get<T = any>(config: RYRequestConfig<T>) {
    return this.request({ ...config, method: "GET" });
  }

  post<T = any>(config: RYRequestConfig<T>) {
    return this.request({ ...config, method: "POST" });
  }

  delete<T = any>(config: RYRequestConfig<T>) {
    return this.request({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: RYRequestConfig<T>) {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default RYRequest;
