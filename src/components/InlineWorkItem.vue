<script setup>
import { computed } from 'vue'
import { renderMarkdown } from '../utils/markdown'
import FigureGallery from './FigureGallery.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})

const html = computed(() => renderMarkdown(props.item.body))

const externalLinks = computed(() => {
  const links = props.item.links || {}
  return [
    { key: 'pdf', label: 'PDF', href: links.pdf },
    { key: 'doi', label: 'DOI', href: links.doi },
  ].filter((link) => link.href)
})
</script>

<template>
  <article class="inline-work">
    <h3 class="inline-work__title">{{ item.title }}</h3>
    <p v-if="item.date" class="inline-work__date">{{ item.date }}</p>

    <div class="inline-work__links">
      <p v-for="link in externalLinks" :key="link.key">
        <a :href="link.href" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
      </p>
    </div>

    <div class="inline-work__body prose" v-html="html" />
    <FigureGallery :figures="item.figures" :title="item.title" />
  </article>
</template>
