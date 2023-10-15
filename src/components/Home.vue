<script setup lang="ts">
import { useProfile } from '@/support/spotifyApi';
import { onMounted } from 'vue';
import { useUserStore } from '@/store/userStore'
import router from '@/router';
import { ref } from 'vue';

  const { getProfile } = useProfile();
  const userStore = useUserStore()
  const drawer = ref(false)

  const getUserProfile = async() => {
    if (!userStore.getUser) {
      const response = await getProfile()
      userStore.setUser(response?.data)
    }
  }

  onMounted(async () => {
    await getUserProfile()
  })
</script>

<template>
  <v-app>
    <v-app-bar color="#212121" class="flex-grow-0" app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Playlist Organizer</v-app-bar-title>
      <template v-slot:append>
        <v-img @click="drawer = !drawer" :src="userStore.getUser?.images[0].url" width="40" class="rounded-circle"></v-img>
      </template>
    </v-app-bar>
    <v-navigation-drawer color="grey-darken-4" app v-model="drawer" expand-on-hover>
      <v-list-item
        :prepend-avatar="userStore.getUser?.images[0].url"
        :title="userStore.getUser?.display_name"
        :subtitle="userStore.getUser?.email"
      ></v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item prepend-icon="fas fa-home" title="Dashboard" value="dashboard" @click="router.push('/')" />
        <v-list-item prepend-icon="fas fa-book" title="My Library" value="library" @click="router.push('library')"></v-list-item>
        <v-list-item prepend-icon="fas fa-sign-out-alt" title="Logout" value="logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<style scoped>
.navbar {
  background-color: #141414;
  color: #fff;
}
</style>
