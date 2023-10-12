<script setup lang="ts">
import { useProfile } from '@/support/spotifyApi';
import { onMounted } from 'vue';
import { useUserStore } from '@/store/userStore'
import router from '@/router';

  const { getProfile } = useProfile();
  const userStore = useUserStore()

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
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer expand-on-hover rail class="navbar">
      <v-list>
        <v-list-item
          :prepend-avatar="userStore.getUser?.images[0].url"
          :title="userStore.getUser?.display_name"
          :subtitle="userStore.getUser?.email"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="fas fa-home" title="Dashboard" value="dashboard" @click="router.push('/')" />
        <v-list-item prepend-icon="fas fa-book" title="My Library" value="library"></v-list-item>
        <v-list-item prepend-icon="fas fa-sign-out-alt" title="Logout" value="logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar class="navbar" title="Playlist Organizer"></v-app-bar>
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      Main Content
    </v-main>
    <v-footer app name="footer" style="background-color: #242424;">
      <v-btn class="mx-auto" variant="text" style="color: #fff;">
        made by Evaldo R.C.
      </v-btn>
    </v-footer>
  </v-layout>
</template>

<style scoped>
.navbar {
  background-color: #141414;
  color: #fff;
}
</style>
