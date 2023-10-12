import { defineStore } from "pinia";
import { computed, ref } from "vue";

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

export const useUserStore = defineStore("users", () => {
  const userStore = ref<ISpotifyUser>();

  const getUser = computed(() => userStore.value);

  function setUser(user: any) {
    userStore.value = user;
  }

  return { userStore, getUser, setUser };
});
