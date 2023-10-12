import { inject } from "vue";
import { AxiosInstance, AxiosResponse } from "axios";
import { AxiosInjectionKey } from "@/axios";

interface IResponseData {
  data: any;
}

interface ISpotifyUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: any;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: any;
    total: Number;
  };
  href: string;
  id: string;
  images: [
    {
      height: Number;
      url: string;
      width: Number;
    }
  ];
  product: string;
  type: string;
  uri: string;
}

export function useProfile() {
  const $axios = inject<AxiosInstance>(AxiosInjectionKey);

  const getProfile = async (): Promise<
    AxiosResponse<ISpotifyUser> | undefined
  > => {
    return await $axios?.get<ISpotifyUser>(
      `${import.meta.env.VITE_API_URL}/me`
    );
  };

  return {
    getProfile,
  };
}
