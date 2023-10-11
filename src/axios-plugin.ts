import axios, { AxiosInstance } from "axios";
import helpers from "@/support/helpers";
import { useRequestToken } from "@/support/requestToken.ts";
import type { App, InjectionKey } from "vue";

const { refreshToken } = useRequestToken();
export const AxiosInjectionKey: InjectionKey<AxiosInstance> =
  Symbol("useAxios");

export default {
  install(app: App) {
    const { accessToken, expireTime } = helpers.getLocalStorage();
    const useAxios = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (accessToken !== null && accessToken !== undefined) {
      useAxios.interceptors.response.use(
        async (config) => {
          if (Date.now() > Number(expireTime)) {
            await refreshToken();
            const { accessToken } = helpers.getLocalStorage();
            config.headers["Authorization"] = `Bearer ${accessToken}`;
          }
          return config;
        },
        async (error) => {
          if (error.response.status === 401) {
            await refreshToken();
            const config = error.config;
            config.headers["Authorization"] = `Bearer ${accessToken}`;
            return useAxios(config);
          }
          return Promise.reject(error);
        }
      );
    }

    // app.provide("useAxios", useAxios);
    app.provide(AxiosInjectionKey, useAxios);
  },
};
