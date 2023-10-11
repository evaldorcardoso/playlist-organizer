import { App, InjectionKey, Plugin } from "vue";
import Axios, { AxiosInstance } from "axios";
import helpers from "./support/helpers";
import { useRequestToken } from "./support/requestToken";

const { refreshToken } = useRequestToken();

// Crie uma chave de injeção para o Axios
export const AxiosInjectionKey: InjectionKey<AxiosInstance> =
  Symbol("useAxios");

export const axiosPlugin: Plugin = {
  install: (app: App) => {
    const { accessToken, expireTime } = helpers.getLocalStorage();
    const axiosInstance = Axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (accessToken !== null && accessToken !== undefined) {
      axiosInstance.interceptors.response.use(
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
            return axiosInstance(config);
          }
          return Promise.reject(error);
        }
      );
    }

    // Injete o Axios na instância do aplicativo Vue
    app.provide(AxiosInjectionKey, axiosInstance);
  },
};
