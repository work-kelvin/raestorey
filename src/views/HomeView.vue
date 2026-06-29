<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteNav from '../components/SiteNav.vue'
import MainContent from '../components/MainContent.vue'
import { sectionIds } from '../data/sections'
import { endlessEight } from '../data/endlessEight'
import { initPlaylist } from '../composables/useAudioPlayer'
import { useScrollSpy } from '../composables/useScrollSpy'

const scrollRoot = ref(null)
const route = useRoute()
const ids = computed(() => sectionIds)

const { activeId, scrollToSection } = useScrollSpy(scrollRoot, ids)

onMounted(() => {
  initPlaylist(endlessEight.tracks)
  scrollToHash()
})

watch(
  () => route.hash,
  () => scrollToHash(),
)

function scrollToHash() {
  const id = route.hash.replace('#', '')
  if (id && sectionIds.includes(id)) {
    requestAnimationFrame(() => scrollToSection(id))
  }
}
</script>

<template>
  <div class="site-layout">
    <div class="site-layout__nav">
      <SiteNav :active-id="activeId" @navigate="scrollToSection" />
    </div>

    <div class="site-layout__void" aria-hidden="true" />

    <main ref="scrollRoot" class="site-layout__content">
      <MainContent />
    </main>
  </div>
</template>
