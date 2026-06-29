<script setup>
import { projects } from '../data/projects'
import SectionHeader from './SectionHeader.vue'
</script>

<template>
  <section :id="projects.id" class="content-section is-wip">
    <SectionHeader number="04" title="Projects" type="Programming" />
    <hr class="content-section__rule" />
  </section>
</template>
