<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import { useAudioPlayer } from '../composables/useAudioPlayer'

const { tracks, currentIndex, currentTrack, isPlaying, playTrack, togglePlayback } =
  useAudioPlayer()

const hasExpanded = ref(false)
const offsetX = ref(0)
const offsetY = ref(0)

const isDragging = ref(false)
let dragStartX = 0
let dragStartY = 0
let dragOriginX = 0
let dragOriginY = 0

const overlayStyle = computed(() => ({
  left: `calc(var(--page-margin-left) + ${offsetX.value}px)`,
  bottom: `calc(var(--ee-overlay-bottom) - ${offsetY.value}px)`,
}))

function resetPosition() {
  offsetX.value = 0
  offsetY.value = 0
}

function handleCollapsedPlay() {
  hasExpanded.value = true
  playTrack(currentIndex.value)
}

function handleExpandedToggle() {
  togglePlayback()
}

function onDragStart(event) {
  if (event.button !== 0) return
  if (event.target.closest('button')) return

  isDragging.value = true
  dragStartX = event.clientX
  dragStartY = event.clientY
  dragOriginX = offsetX.value
  dragOriginY = offsetY.value

  window.addEventListener('pointermove', onDragMove)
  window.addEventListener('pointerup', onDragEnd)
}

function onDragMove(event) {
  if (!isDragging.value) return
  offsetX.value = dragOriginX + (event.clientX - dragStartX)
  offsetY.value = dragOriginY - (event.clientY - dragStartY)
}

function onDragEnd() {
  isDragging.value = false
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onDragEnd)
}

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointerup', onDragEnd)
})
</script>

<template>
  <aside
    class="ee-overlay"
    :class="{
      'ee-overlay--expanded': hasExpanded,
      'ee-overlay--collapsed': !hasExpanded,
      'ee-overlay--dragging': isDragging,
    }"
    :style="overlayStyle"
    aria-label="Endless Eight"
    @pointerdown="onDragStart"
  >
    <div class="ee-overlay__chrome">
      <button
        v-if="hasExpanded"
        type="button"
        class="ee-overlay__reset"
        aria-label="Reset position"
        @click="resetPosition"
      >
        ↙
      </button>
    </div>

    <template v-if="!hasExpanded">
      <button type="button" class="ee-overlay__play" @click="handleCollapsedPlay">Play</button>
    </template>

    <template v-else>
      <div class="ee-overlay__now-playing">
        <p class="ee-overlay__song">{{ currentTrack?.title }}</p>
        <p class="ee-overlay__artist">{{ currentTrack?.artist }}</p>
      </div>

      <ul class="ee-overlay__list">
        <li v-for="(track, index) in tracks" :key="track.id">
          <button
            type="button"
            class="ee-overlay__track"
            :class="{
              'is-active': index === currentIndex,
              'is-playing': isPlaying && index === currentIndex,
            }"
            @click="playTrack(index)"
          >
            <span class="ee-overlay__track-song">
              <span
                v-if="index === currentIndex"
                class="ee-overlay__mark"
                aria-hidden="true"
              >
                {{ isPlaying ? '▶' : '▷' }}
              </span>
              {{ track.title }}
            </span>
            <span class="ee-overlay__track-artist">{{ track.artist }}</span>
          </button>
        </li>
      </ul>

      <button type="button" class="ee-overlay__toggle" @click="handleExpandedToggle">
        {{ isPlaying ? 'Pause' : 'Play' }}
      </button>
    </template>
  </aside>
</template>
