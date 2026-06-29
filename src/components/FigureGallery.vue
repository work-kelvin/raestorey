<script setup>
import { computed } from 'vue'
import ImageCarousel from './ImageCarousel.vue'

const props = defineProps({
  figures: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
})

const items = computed(() =>
  props.figures.map((figure) => ({
    src: figure.src,
    caption: figure.caption,
    alt: figure.caption,
  })),
)
</script>

<template>
  <ImageCarousel v-if="items.length" :items="items" :title="title" />
</template>
