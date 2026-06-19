<script setup>
const emit = defineEmits(['reveal'])

function onReveal() {
  emit('reveal')
}
</script>

<template>
  <div class="site-intro" aria-label="Enter site">
    <button
      type="button"
      class="site-intro__play"
      aria-label="Play to enter"
      @click="onReveal"
    >
      <svg class="site-intro__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5v14l11-7z" fill="currentColor" />
      </svg>
    </button>
  </div>
</template>
