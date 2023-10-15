import ISpotifyUser from "@/interface/ISpotifyUser";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("users", () => {
  const userStore = ref<ISpotifyUser>();

  const getUser = computed(() => userStore.value);

  function setUser(user: ISpotifyUser | undefined) {
    userStore.value = user;
  }

  return { userStore, getUser, setUser };
});
