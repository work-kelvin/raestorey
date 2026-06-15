<script setup>
import { site } from '../config/site'
import SectionHeader from './SectionHeader.vue'
</script>

<template>
  <section id="information" class="content-section information">
    <SectionHeader number="00" :title="site.name" type="Information" />

    <div class="content-section__body prose">
      <p>{{ site.bio }}</p>
    </div>

    <div class="information__profile">
      <p>
        <a :href="`mailto:${site.email}`">{{ site.email }}</a>
      </p>
      <p>
        <a :href="site.instagram" target="_blank" rel="noopener noreferrer">{{ site.instagramHandle }}</a>
      </p>
    </div>
  </section>
</template>
