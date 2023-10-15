<script setup lang="ts">
// import { ref } from 'vue';
import { usePlaylistsStore } from '@/store/playlistsStore'
import { onMounted } from 'vue';
import { useProfile } from '@/support/spotifyApi';
import ISpotifyPlaylist from "@/interface/ISpotifyPlaylist";
import { storeToRefs } from 'pinia';

const { getUserPlaylists } = useProfile();
const playlistsStore = usePlaylistsStore()
const { playlists } = storeToRefs(playlistsStore);
// const playlists = ref([
//     {
//         src: 'backgrounds/bg.jpg',
//     },
//     {
//         src: 'backgrounds/md.jpg',
//     },
//     {
//         src: 'backgrounds/bg-2.jpg',
//     },
//     {
//         src: 'backgrounds/md2.jpg',
//     },
// ])

const getPlaylists = async() => {
    if (playlistsStore.getPlaylists.length === 0) {
        const response = await getUserPlaylists()
        console.log(response)
        // var playlists:Array<ISpotifyPlaylist> = [];
        response?.data.items.forEach((playlist: ISpotifyPlaylist) => {
            // playlists.push(playlist)
            playlistsStore.addPlaylist(playlist)
        })
        // playlistsStore.setPlaylists(playlists)
    }
}

onMounted(async () => {
  await getPlaylists()
})
      
</script>
<template>
  <v-container fluid>
    <v-row >
      <v-skeleton-loader v-if="playlists.length === 0" :elevation="5" type="card"></v-skeleton-loader>
      <v-col v-for="(playlist, index) in playlists" :key="index" cols="12" xl="2" lg="2" md="4" sm="12" xs="12">
        <v-card theme="dark">
          <v-img
            :src="playlist.images[0].url"
            class="align-end"
            aspect-ratio="1.5"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            cover
          >
        </v-img>
        <v-card-title class="text-white text-h5" v-text="playlist.name" />
        <!-- <v-card-subtitle class="text-white" v-text="playlist.description" /> -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn size="small" color="surface-variant" variant="text" icon="fas fa-heart"></v-btn>
            <v-btn size="small" color="surface-variant" variant="text" icon="fas fa-info"></v-btn>
            <v-btn size="small" color="surface-variant" variant="text" icon="fas fa-play"></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>