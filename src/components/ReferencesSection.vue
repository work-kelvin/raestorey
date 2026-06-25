<script setup>
import { ref, computed } from 'vue'
import { references } from '../data/references'
import ImageCarousel from './ImageCarousel.vue'
import SectionHeader from './SectionHeader.vue'

const carousel = ref(null)
const activeIndex = ref(0)

const carouselItems = computed(() =>
  references.items.map((item) => ({
    src: item.image,
    alt: `${item.type} — ${item.title}`,
  })),
)

const activeItem = computed(() => references.items[activeIndex.value] ?? null)

function openReference(index) {
  carousel.value?.openAt(index)
  activeIndex.value = index
}

function onCarouselIndex(index) {
  activeIndex.value = index
}
</script>

<template>
  <section :id="references.id" class="content-section references-section">
    <SectionHeader number="02" title="References" type="Selection" />

    <ImageCarousel
      ref="carousel"
      :items="carouselItems"
      @update:index="onCarouselIndex"
    />

    <div v-if="activeItem" class="reference-detail">
      <div class="reference-detail__col">
        <p class="reference-detail__title">{{ activeItem.title }}</p>
        <p v-for="(line, index) in activeItem.metaLeft" :key="`left-${index}`">{{ line }}</p>
      </div>
      <div class="reference-detail__col">
        <p class="reference-detail__type">{{ activeItem.type }}</p>
        <p v-for="(line, index) in activeItem.metaRight" :key="`right-${index}`">{{ line }}</p>
      </div>
    </div>

    <ul class="references-index">
      <li v-for="(item, index) in references.items" :key="item.id">
        <button
          type="button"
          class="references-index__link"
          :class="{ 'is-active': index === activeIndex }"
          @click="openReference(index)"
        >
          {{ item.type }} — {{ item.title }}
        </button>
      </li>
    </ul>
  </section>
</template>
