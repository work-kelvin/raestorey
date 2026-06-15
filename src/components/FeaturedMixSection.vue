<script setup>
import { featuredMix } from '../data/featuredMix'
import SectionHeader from './SectionHeader.vue'
import FigureGallery from './FigureGallery.vue'
</script>

<template>
  <section :id="featuredMix.id" class="content-section">
    <SectionHeader
      :number="featuredMix.number"
      :title="featuredMix.title"
      :type="featuredMix.type"
      :meta-left="featuredMix.metaLeft"
      :meta-right="featuredMix.metaRight"
    />

    <div class="content-section__body prose">
      <p v-for="(paragraph, index) in featuredMix.about.split('\n\n')" :key="index">
        {{ paragraph }}
      </p>
    </div>

    <FigureGallery :figures="featuredMix.figures" :title="featuredMix.title" />

    <hr class="content-section__rule" />
  </section>
</template>
