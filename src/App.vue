<script setup>
import { provide } from 'vue'
import SiteIntro from './components/SiteIntro.vue'
import { endlessEight } from './data/endlessEight'
import { initPlaylist, playTrack } from './composables/useAudioPlayer'
import { useSiteReveal } from './composables/useSiteReveal'

const { siteRevealed, revealSite } = useSiteReveal()

provide('siteRevealed', siteRevealed)

function onReveal() {
  initPlaylist(endlessEight.tracks)
  revealSite()
  playTrack(0)
}
</script>

<template>
  <Transition name="site-intro">
    <SiteIntro v-if="!siteRevealed" @reveal="onReveal" />
  </Transition>
  <RouterView />
</template>
