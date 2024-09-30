import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseService } from "./baseService";

export interface ApiError {
  status?: number;
  statusText?: string;
  message?: string;
  title?: string;
}

export interface FetchDataResult<T> {
  data?: T;
  error: ApiError;
}

export interface ApiServices {
  get: <T>(url: string, payload?: object) => Promise<T>;
  post: <T>(url: string, payload?: object) => Promise<T>;
  put: <T>(url: string, payload?: object) => Promise<T>;
  delete: <T>(url: string) => Promise<T>;
  patch: <T>(url: string, payload?: object) => Promise<T>;
  fetchData: <T>(param: object) => Promise<T>;
}

const handleAPIError = (error: AxiosResponse): ApiError => {
  const data = error?.data;

  return data;
};

export const apiService: ApiServices = {
  get(url, payload) {
    return this.fetchData({
      url,
      method: "get",
      params: payload,
    });
  },

  post(url, payload) {
    return this.fetchData({
      url,
      method: "post",
      data: payload,
    });
  },

  delete(url) {
    return this.fetchData({
      url,
      method: "delete",
    });
  },

  patch(url, payload) {
    return this.fetchData({
      url,
      method: "patch",
      data: payload,
    });
  },

  put(url, payload) {
    return this.fetchData({
      url,
      method: "put",
      data: payload,
    });
  },

  fetchData<T>(param: AxiosRequestConfig) {
    return new Promise<T>(async (resolve) => {
      baseService<T>({
        ...param,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
        .then((response) => {
          resolve(response.data as T);
        })
        .catch(async (error) => {
          if (error?.response?.status === 401) {
            localStorage.removeItem("access_token");
            return;
          }
          resolve(error);
        });
    });
  },
};
