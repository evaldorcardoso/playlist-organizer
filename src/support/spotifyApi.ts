import { AxiosInstance } from "axios";
import { InjectionKey, inject } from "vue";

export function useProfile() {
  const AxiosInjectionKey: InjectionKey<AxiosInstance> = Symbol("useAxios");
  const $axios = inject(AxiosInjectionKey);

  const getProfile = async () => {
    return $axios?.get(`${import.meta.env.VITE_API_URL}/me`);
  };

  return {
    getProfile,
  };
}
