<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useAudioPlayer } from '../composables/useAudioPlayer'
import { endlessEight } from '../data/endlessEight'

const TRANSPORT_SIZE = 77

const { tracks, currentIndex, currentTrack, isPlaying, playTrack, togglePlayback } =
  useAudioPlayer()

const MIN_WIDTH = 200
const MIN_HEIGHT = 200
const COLLAPSED_WIDTH = TRANSPORT_SIZE
const COLLAPSED_HEIGHT = TRANSPORT_SIZE + 10 + 22 + 16 + 6
const EXPANDED_WIDTH = 320
const EXPANDED_HEIGHT = 420

const overlayRef = ref(null)

const hasExpanded = ref(false)
const posX = ref(0)
const posY = ref(0)
const width = ref(COLLAPSED_WIDTH)
const height = ref(COLLAPSED_HEIGHT)

const isDragging = ref(false)
const isResizing = ref(false)
let resizeCorner = ''
let dragStartX = 0
let dragStartY = 0
let dragOriginX = 0
let dragOriginY = 0
let resizeOriginX = 0
let resizeOriginY = 0
let resizeOriginW = 0
let resizeOriginH = 0

const overlayStyle = computed(() => ({
  left: `${posX.value}px`,
  top: `${posY.value}px`,
  width: `${width.value}px`,
  height: `${height.value}px`,
}))

function readPageMargins() {
  const root = getComputedStyle(document.documentElement)
  return {
    left: parseFloat(root.getPropertyValue('--page-margin-left')) || 70,
    bottom: parseFloat(root.getPropertyValue('--ee-overlay-bottom')) || 40,
  }
}

function getDefaultDimensions() {
  if (hasExpanded.value) {
    return { width: EXPANDED_WIDTH, height: EXPANDED_HEIGHT }
  }
  return { width: COLLAPSED_WIDTH, height: COLLAPSED_HEIGHT }
}

function getDefaultPosition() {
  const margins = readPageMargins()
  const dims = getDefaultDimensions()
  return {
    x: margins.left,
    y: window.innerHeight - dims.height - margins.bottom,
    ...dims,
  }
}

function applyDefaultState() {
  const defaults = getDefaultPosition()
  posX.value = defaults.x
  posY.value = defaults.y
  width.value = defaults.width
  height.value = defaults.height
}

function resetOverlay() {
  hasExpanded.value = false
  applyDefaultState()
}

function expandOverlay() {
  hasExpanded.value = true
  const defaults = getDefaultPosition()
  width.value = defaults.width
  height.value = defaults.height
  posY.value = defaults.y
}

function handleTransport() {
  togglePlayback()
}

function onDragStart(event) {
  if (event.button !== 0) return
  if (event.target.closest('button, .ee-overlay__resize')) return

  isDragging.value = true
  dragStartX = event.clientX
  dragStartY = event.clientY
  dragOriginX = posX.value
  dragOriginY = posY.value

  window.addEventListener('pointermove', onDragMove)
  window.addEventListener('pointerup', onPointerEnd)
  event.preventDefault()
}

function onDragMove(event) {
  if (!isDragging.value) return
  posX.value = dragOriginX + (event.clientX - dragStartX)
  posY.value = dragOriginY + (event.clientY - dragStartY)
}

function onResizeStart(corner, event) {
  if (event.button !== 0) return

  isResizing.value = true
  resizeCorner = corner
  resizeOriginX = posX.value
  resizeOriginY = posY.value
  resizeOriginW = width.value
  resizeOriginH = height.value
  dragStartX = event.clientX
  dragStartY = event.clientY

  window.addEventListener('pointermove', onResizeMove)
  window.addEventListener('pointerup', onPointerEnd)
  event.preventDefault()
  event.stopPropagation()
}

function onResizeMove(event) {
  if (!isResizing.value) return

  const dx = event.clientX - dragStartX
  const dy = event.clientY - dragStartY

  if (resizeCorner.includes('e')) {
    width.value = Math.max(MIN_WIDTH, resizeOriginW + dx)
  }
  if (resizeCorner.includes('w')) {
    const nextWidth = Math.max(MIN_WIDTH, resizeOriginW - dx)
    posX.value = resizeOriginX + (resizeOriginW - nextWidth)
    width.value = nextWidth
  }
  if (resizeCorner.includes('s')) {
    height.value = Math.max(MIN_HEIGHT, resizeOriginH + dy)
  }
  if (resizeCorner.includes('n')) {
    const nextHeight = Math.max(MIN_HEIGHT, resizeOriginH - dy)
    posY.value = resizeOriginY + (resizeOriginH - nextHeight)
    height.value = nextHeight
  }
}

function onPointerEnd() {
  isDragging.value = false
  isResizing.value = false
  resizeCorner = ''
  window.removeEventListener('pointermove', onDragMove)
  window.removeEventListener('pointermove', onResizeMove)
  window.removeEventListener('pointerup', onPointerEnd)
}

function onWindowResize() {
  const margins = readPageMargins()
  const maxX = window.innerWidth - width.value - margins.left
  const maxY = window.innerHeight - height.value - margins.bottom
  posX.value = Math.min(Math.max(0, posX.value), Math.max(0, maxX))
  posY.value = Math.min(Math.max(0, posY.value), Math.max(0, maxY))
}

onMounted(() => {
  nextTick(() => applyDefaultState())
  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  onPointerEnd()
  window.removeEventListener('resize', onWindowResize)
})
</script>

<template>
  <aside
    ref="overlayRef"
    class="ee-overlay"
    :class="{
      'ee-overlay--expanded': hasExpanded,
      'ee-overlay--collapsed': !hasExpanded,
      'ee-overlay--dragging': isDragging,
      'ee-overlay--resizing': isResizing,
    }"
    :style="overlayStyle"
    aria-label="Endless Eight"
    @pointerdown="onDragStart"
  >
    <button
      v-if="!hasExpanded"
      type="button"
      class="ee-overlay__expand"
      aria-label="Expand player"
      @click.stop="expandOverlay"
      @pointerdown.stop
    >
      ↗
    </button>

    <button
      v-if="hasExpanded"
      type="button"
      class="ee-overlay__reset"
      aria-label="Collapse player"
      @click.stop="resetOverlay"
      @pointerdown.stop
    >
      ↙
    </button>

    <div v-if="hasExpanded" class="ee-overlay__content">
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
            @click.stop="playTrack(index)"
            @pointerdown.stop
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
    </div>

    <div class="ee-overlay__footer">
      <div class="ee-overlay__marquee">
        <div class="ee-overlay__marquee-track">
          <span
            v-for="n in 2"
            :key="n"
            class="ee-overlay__marquee-text"
          >
            {{ endlessEight.marquee.lead }}<em class="ee-overlay__marquee-em">{{ endlessEight.marquee.emphasis }}</em>{{ endlessEight.marquee.tail }}
          </span>
        </div>
      </div>

      <button
        type="button"
        class="ee-overlay__transport"
        :aria-label="isPlaying ? 'Pause' : 'Play'"
        @click.stop="handleTransport"
        @pointerdown.stop
      >
        <svg
          v-if="!isPlaying"
          class="ee-overlay__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
        <svg
          v-else
          class="ee-overlay__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M6 5h4v14H6zm8 0h4v14h-4z" fill="currentColor" />
        </svg>
      </button>
    </div>

    <div
      v-for="corner in ['nw', 'ne', 'sw', 'se']"
      :key="corner"
      class="ee-overlay__resize"
      :class="`ee-overlay__resize--${corner}`"
      @pointerdown="onResizeStart(corner, $event)"
    />
  </aside>
</template>
