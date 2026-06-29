<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const emit = defineEmits(['close'])

const COLLAPSED_WIDTH = 88
const COLLAPSED_HEIGHT = 36
const EXPANDED_WIDTH = 420
const EXPANDED_HEIGHT = 560
const MIN_WIDTH = 200
const MIN_HEIGHT = 120

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

const panelStyle = computed(() => ({
  left: `${posX.value}px`,
  top: `${posY.value}px`,
  width: `${width.value}px`,
  height: `${height.value}px`,
}))

function readPageMargins() {
  const root = getComputedStyle(document.documentElement)
  return {
    left: parseFloat(root.getPropertyValue('--page-margin-left')) || 70,
    top: parseFloat(root.getPropertyValue('--page-margin-top')) || 70,
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
    x: margins.left + 180,
    y: margins.top + 120,
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

function collapsePanel() {
  hasExpanded.value = false
  applyDefaultState()
}

function expandPanel() {
  hasExpanded.value = true
  const defaults = getDefaultPosition()
  width.value = defaults.width
  height.value = defaults.height
  posY.value = defaults.y
}

function onDragStart(event) {
  if (event.button !== 0) return
  if (event.target.closest('button, .cv-overlay__resize, .cv-overlay__sheet')) return

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

onMounted(() => {
  nextTick(() => applyDefaultState())
})

onBeforeUnmount(() => {
  onPointerEnd()
})
</script>

<template>
  <aside
    class="cv-overlay"
    :class="{
      'cv-overlay--expanded': hasExpanded,
      'cv-overlay--collapsed': !hasExpanded,
      'cv-overlay--dragging': isDragging,
      'cv-overlay--resizing': isResizing,
    }"
    :style="panelStyle"
    aria-label="C.V."
    @pointerdown="onDragStart"
  >
    <button
      v-if="!hasExpanded"
      type="button"
      class="cv-overlay__expand"
      aria-label="Expand C.V."
      @click.stop="expandPanel"
      @pointerdown.stop
    >
      ↗
    </button>

    <button
      v-if="hasExpanded"
      type="button"
      class="cv-overlay__reset"
      aria-label="Collapse C.V."
      @click.stop="collapsePanel"
      @pointerdown.stop
    >
      ↙
    </button>

    <button
      type="button"
      class="cv-overlay__close"
      aria-label="Close C.V."
      @click.stop="emit('close')"
      @pointerdown.stop
    >
      ×
    </button>

    <p v-if="!hasExpanded" class="cv-overlay__label">C.V.</p>

    <div v-if="hasExpanded" class="cv-overlay__content">
      <div class="cv-overlay__sheet" aria-label="C.V." />
    </div>

    <div
      v-for="corner in ['nw', 'ne', 'sw', 'se']"
      :key="corner"
      class="cv-overlay__resize"
      :class="`cv-overlay__resize--${corner}`"
      @pointerdown="onResizeStart(corner, $event)"
    />
  </aside>
</template>
