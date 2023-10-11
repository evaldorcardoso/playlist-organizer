import { inject } from "vue";
import { AxiosInstance, AxiosResponse } from "axios";
import { AxiosInjectionKey } from "@/axios";

interface IResponseData {
  data: any;
}

export function useProfile() {
  const $axios = inject<AxiosInstance>(AxiosInjectionKey);

  const getProfile = async (): Promise<
    AxiosResponse<IResponseData> | undefined
  > => {
    return await $axios?.get<IResponseData>(
      `${import.meta.env.VITE_API_URL}/me`
    );
  };

  return {
    getProfile,
  };
}
