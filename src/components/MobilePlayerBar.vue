<script setup>
import { computed } from 'vue'
import { useAudioPlayer } from '../composables/useAudioPlayer'

const { currentTrack, isPlaying, togglePlayback } = useAudioPlayer()

const subtitle = computed(() => currentTrack.value?.artist ?? '')
</script>

<template>
  <div v-if="currentTrack" class="mobile-player">
    <div class="mobile-player__info">
      <p class="mobile-player__title">{{ currentTrack.title }}</p>
      <p v-if="subtitle" class="mobile-player__sub">{{ subtitle }}</p>
    </div>
    <button type="button" class="mobile-player__toggle" @click="togglePlayback">
      {{ isPlaying ? 'Pause' : 'Play' }}
    </button>
  </div>
</template>
