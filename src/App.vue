<script setup>
import { provide } from 'vue'
import SiteIntro from './components/SiteIntro.vue'
import { useSiteReveal } from './composables/useSiteReveal'

const { siteRevealed, revealSite } = useSiteReveal()

provide('siteRevealed', siteRevealed)
</script>

<template>
  <Transition name="site-intro">
    <SiteIntro v-if="!siteRevealed" @reveal="revealSite" />
  </Transition>
  <RouterView />
</template>
