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
  withCredentials: true,
});

baseService.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");
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

    if (status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;

        try {
          const res = await axios.post(
            "http://localhost:3456/v1/api/auth/session/refresh",
            {},
            {
              withCredentials: true,
            }
          );

          if (res.status === 201) {
            const { access_token } = res.data.data;
            localStorage.setItem("access_token", access_token);
            baseService.defaults.headers.common["Authorization"] =
              `Bearer ${access_token}`;
            onAccessTokenFetched(access_token); 
            isRefreshing = false;

            return baseService(originalRequest);
          }
        } catch (refreshError) {
          isRefreshing = false;
          subscribers = []; 
          window.location.href = "/auth/login"; 
          return Promise.reject(refreshError);
        }
      } else {
        return new Promise((resolve) => {
          addSubscriber((accessToken: string) => {
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            resolve(baseService(originalRequest)); 
          });
        });
      }
    }

    return Promise.reject(error);
  }
);
