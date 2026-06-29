<script setup>
defineProps({
  number: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: '',
  },
  metaLeft: {
    type: Array,
    default: () => [],
  },
  metaRight: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="content-section__meta-row">
    <span class="content-section__number">{{ number }}.</span>
    <div class="content-section__meta-col">
      <p class="content-section__meta-title">{{ title }}</p>
      <p v-for="(line, index) in metaLeft" :key="`left-${index}`">{{ line }}</p>
    </div>
    <div class="content-section__meta-col">
      <p v-if="type" class="content-section__meta-type">{{ type }}</p>
      <p v-for="(line, index) in metaRight" :key="`right-${index}`">{{ line }}</p>
    </div>
  </div>
</template>
