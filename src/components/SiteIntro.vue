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
      <span class="site-intro__mark" aria-hidden="true">▷</span>
    </button>
  </div>
</template>
