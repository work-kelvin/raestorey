<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  showHint: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:index'])

const index = ref(0)

const current = computed(() => props.items[index.value] ?? null)
const hasMultiple = computed(() => props.items.length > 1)

function goTo(nextIndex) {
  if (!props.items.length) return
  index.value = (nextIndex + props.items.length) % props.items.length
  emit('update:index', index.value)
}

function onImageClick(event) {
  if (!hasMultiple.value) return

  const rect = event.currentTarget.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const goPrev = clickX < rect.width / 2

  goTo(goPrev ? index.value - 1 : index.value + 1)
}

function openAt(nextIndex) {
  goTo(nextIndex)
}

defineExpose({ openAt, index })
</script>

<template>
  <figure
    v-if="current"
    class="image-carousel"
    :class="{ 'is-navigable': hasMultiple }"
    @click="onImageClick"
  >
    <img :src="current.src" :alt="current.alt || current.caption" loading="lazy" />
    <figcaption v-if="hasMultiple || current.caption">
      <template v-if="hasMultiple">{{ index + 1 }}/{{ items.length }}</template>
      <span v-if="current.caption">
        <template v-if="hasMultiple"> — </template>{{ current.caption }}
      </span>
    </figcaption>
    <p v-if="showHint && hasMultiple" class="image-carousel__hint">
      Click left or right to navigate
    </p>
  </figure>
</template>
