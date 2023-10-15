import { defineStore } from "pinia";
import ISpotifyPlaylist from "@/interface/ISpotifyPlaylist";

export const usePlaylistsStore = defineStore("usePlaylists", {
  state: () => ({
    playlists: [] as ISpotifyPlaylist[],
  }),
  getters: {
    getPlaylists(): ISpotifyPlaylist[] {
      return this.playlists;
    },
  },
  actions: {
    addPlaylist(playlist: ISpotifyPlaylist) {
      this.playlists.push(playlist);
    },
  },
});
