<script setup lang="ts">

const getAuthorizeUrl = () => (
  `https://accounts.spotify.com/authorize?` +
  `client_id=${import.meta.env.VITE_SPOTIFY_CLIENT_ID}` +
  `&response_type=code` +
  `&redirect_uri=${window.location.origin}/callback` +
  `&scope=user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private user-read-playback-state user-modify-playback-state user-top-read` +
  `&state=34fFs29kd09`
)

const authorize = () => {
  window.location.href = getAuthorizeUrl()
}
</script>

<template>
  <v-container>
    <p class="span-login">Para começar, você precisa se autenticar com o Spotify</p>
    <v-btn class="my-5" @click.prevent="authorize()">
      Login with Spotify
    </v-btn>
  </v-container>
</template>

<style scoped>

</style>