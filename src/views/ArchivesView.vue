<script setup>
import SiteNav from '../components/SiteNav.vue'
import EndlessEightPanel from '../components/EndlessEightPanel.vue'
import ArchivesContent from '../components/ArchivesContent.vue'
import MobilePlayerBar from '../components/MobilePlayerBar.vue'
import { endlessEight } from '../data/endlessEight'
import { initPlaylist } from '../composables/useAudioPlayer'
import { onMounted } from 'vue'

onMounted(() => {
  initPlaylist(endlessEight.tracks)
})
</script>

<template>
  <div class="site-layout">
    <div class="site-layout__nav">
      <SiteNav active-id="archives" />
    </div>

    <div class="site-layout__void">
      <EndlessEightPanel />
    </div>

    <main class="site-layout__content site-layout__content--static">
      <ArchivesContent />
    </main>

    <MobilePlayerBar />
  </div>
</template>
