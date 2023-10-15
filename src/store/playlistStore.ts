import ISpotifyPlaylist from "@/interface/ISpotifyPlaylist";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const usePlaylistStore = defineStore("playlists", () => {
  let playlistsStore = reactive<Array<ISpotifyPlaylist>>([]);

  const getPlaylists = computed(() => playlistsStore);

  function setPlaylists(playlists: Array<ISpotifyPlaylist>) {
    playlistsStore = playlists;
  }

  function addPlaylist(playlist: ISpotifyPlaylist) {
    playlistsStore.push(playlist);
  }

  return { playlistsStore, getPlaylists, setPlaylists, addPlaylist };
});
