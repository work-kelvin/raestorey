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

    <div class="endless-eight__table">
      <div class="endless-eight__header">
        <span>Song</span>
        <span>Album</span>
        <span>Artist</span>
      </div>

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
              <span class="endless-eight__mark">{{ index === currentIndex && isPlaying ? '▶' : '▷' }}</span>
              {{ track.title }}
            </span>
            <span class="endless-eight__album">{{ track.album }}</span>
            <span class="endless-eight__artist">{{ track.artist }}</span>
          </button>
        </li>
      </ul>
    </div>

    <p class="endless-eight__note">
      <em>{{ endlessEight.recreatedNote }}</em>
    </p>

    <p class="endless-eight__description">
      <em>{{ endlessEight.description }}</em>
    </p>
  </aside>
</template>
