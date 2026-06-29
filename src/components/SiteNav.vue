<script setup>
import { useRouter, useRoute } from 'vue-router'
import { site } from '../config/site'
import { navSections } from '../data/sections'
defineProps({
  activeId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['navigate'])
const router = useRouter()
const route = useRoute()

function onNavigate(event, id) {
  event.preventDefault()

  if (route.path !== '/') {
    router.push({ path: '/', hash: `#${id}` })
    return
  }

  emit('navigate', id)
}
</script>

<template>
  <nav class="site-nav" aria-label="Site index">
    <RouterLink to="/" class="site-nav__name">{{ site.name }}</RouterLink>

    <template v-for="section in navSections" :key="section.id">
      <span
        v-if="section.wip"
        class="site-nav__link site-nav__link--disabled"
        aria-disabled="true"
      >
        {{ section.number }}. {{ section.label }}
      </span>

      <a
        v-else
        :href="`/#${section.id}`"
        class="site-nav__link"
        :class="{ 'is-active': activeId === section.id }"
        @click="onNavigate($event, section.id)"
      >
        {{ section.number }}. {{ section.label }}
      </a>
    </template>

  </nav>
</template>
