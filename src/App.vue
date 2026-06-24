<script setup>
import { onMounted, provide } from 'vue'
import SiteIntro from './components/SiteIntro.vue'
import { useSiteReveal } from './composables/useSiteReveal'
import { initPlaylist, playTrack } from './composables/useAudioPlayer'
import { endlessEight } from './data/endlessEight'

const { siteRevealed, revealSite } = useSiteReveal()

provide('siteRevealed', siteRevealed)

onMounted(() => {
  initPlaylist(endlessEight.tracks)
})

function onIntroReveal() {
  revealSite()
  playTrack(0)
}
</script>

<template>
  <Transition name="site-intro">
    <SiteIntro v-if="!siteRevealed" @reveal="onIntroReveal" />
  </Transition>
  <RouterView />
</template>
