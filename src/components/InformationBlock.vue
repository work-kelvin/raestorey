<script setup>
import { ref } from 'vue'
import { site } from '../config/site'
import SectionHeader from './SectionHeader.vue'
import CvOverlay from './CvOverlay.vue'

const cvOpen = ref(false)
</script>

<template>
  <section id="information" class="content-section information">
    <SectionHeader number="00" :title="site.name" type="Information" />

    <div class="content-section__body prose">
      <p>{{ site.bio }}</p>
    </div>

    <div class="information__profile">
      <p>
        <a class="information__link" :href="`mailto:${site.email}`">{{ site.contactLabel }}</a>
      </p>
      <p>
        <a
          class="information__link"
          :href="site.instagram"
          target="_blank"
          rel="noopener noreferrer"
        >{{ site.instagramHandle }}</a>
      </p>
      <p>
        <button type="button" class="information__link information__cv-trigger" @click="cvOpen = true">
          C.V.
        </button>
      </p>
    </div>

    <CvOverlay v-if="cvOpen" @close="cvOpen = false" />
  </section>
</template>
