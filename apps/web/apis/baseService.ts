import axios from "axios";

var isRefreshing = false;
let subscribers: Function[] = [];

function onAccessTokenFetched(access_token: string) {
  subscribers.forEach((callback) => callback(access_token));
  subscribers = [];
}

function addSubscriber(callback: Function) {
  subscribers.push(callback);
}

export const baseService = axios.create({
  timeout: 60000,
  baseURL: `${process.env.API_URL}/${process.env.API_VERSION}/${process.env.API_PREFIX}`,
});

baseService.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

baseService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    // if (status === 401 && !originalRequest._retry) {
    //   if (!isRefreshing) {
    //     isRefreshing = true;
    //     originalRequest._retry = true;

    //     try {
    //       const refreshToken = sessionStorage.getItem("refresh_token");
    //       const res = await axios.post("/api/auth/refresh", { refreshToken });

    //       if (res.status === 200) {
    //         const { accessToken,  } = res.data;
    //         localStorage.setItem("access_token", accessToken);
    //         baseService.defaults.headers.common["Authorization"] =
    //           `Bearer ${accessToken}`;
    //         onAccessTokenFetched(accessToken);
    //         isRefreshing = false;
    //         return baseService(originalRequest);
    //       }
    //     } catch (refreshError) {
    //       isRefreshing = false;
    //       subscribers = [];
    //       return Promise.reject(refreshError);
    //     }
    //   } else {
    //     return new Promise((resolve) => {
    //       addSubscriber((accessToken: string) => {
    //         originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
    //         resolve(baseService(originalRequest));
    //       });
    //     });
    //   }
    // }

    return Promise.reject(error);
  }
);
