<script setup>
import { useAudioPlayer } from '../composables/useAudioPlayer'
import { endlessEight } from '../data/endlessEight'

const { tracks, currentIndex, isPlaying, playTrack, togglePlayback } = useAudioPlayer()
</script>

<template>
  <aside class="endless-eight" aria-label="Endless Eight">
    <p class="endless-eight__title">{{ endlessEight.title }}</p>

    <button type="button" class="endless-eight__toggle" @click="togglePlayback">
      {{ isPlaying ? 'Pause' : 'Play' }}
    </button>

    <ul class="endless-eight__list">
      <li v-for="(track, index) in tracks" :key="track.id">
        <button
          type="button"
          class="endless-eight__track"
          :class="{
            'is-active': index === currentIndex,
            'is-playing': isPlaying && index === currentIndex,
          }"
          @click="playTrack(index)"
        >
          <span class="endless-eight__song">
            <span
              v-if="index === currentIndex"
              class="endless-eight__mark"
              aria-hidden="true"
            >
              {{ isPlaying ? '▶' : '▷' }}
            </span>
            {{ track.title }}
          </span>
          <span class="endless-eight__artist">{{ track.artist }}</span>
        </button>
      </li>
    </ul>

    <p class="endless-eight__note">
      <em>{{ endlessEight.recreatedNote }}</em>
    </p>

    <p class="endless-eight__description">
      <em>{{ endlessEight.description }}</em>
    </p>
  </aside>
</template>
