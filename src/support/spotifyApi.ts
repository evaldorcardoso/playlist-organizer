import { inject } from "vue";
import { AxiosInstance, AxiosResponse } from "axios";
import { AxiosInjectionKey } from "@/axios";
import ISpotifyUser from "@/interface/ISpotifyUser";
import ISpotifyUserPlaylists from "@/interface/ISpotifyUserPlaylists";

interface IResponseData {
  data: any;
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

  const getUserPlaylists = async (): Promise<
    AxiosResponse<ISpotifyUserPlaylists> | undefined
  > => {
    return await $axios?.get<ISpotifyUserPlaylists>(
      `${import.meta.env.VITE_API_URL}/me/playlists?limit=50`
    );
  };

  return {
    getUserPlaylists,
    getProfile,
  };
}
