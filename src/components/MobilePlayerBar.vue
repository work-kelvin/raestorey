<script setup>
import { useAudioPlayer } from '../composables/useAudioPlayer'

const { currentTrack, isPlaying, togglePlayback } = useAudioPlayer()
</script>

<template>
  <div v-if="currentTrack" class="mobile-player">
    <div class="mobile-player__info">
      <p class="mobile-player__title">{{ currentTrack.title }}</p>
      <p class="mobile-player__sub">{{ currentTrack.subtitle }}</p>
    </div>
    <button type="button" class="mobile-player__toggle" @click="togglePlayback">
      {{ isPlaying ? 'Pause' : 'Play' }}
    </button>
  </div>
</template>
