<script setup>
import { writtenWork } from '../data/writtenWork'
import SectionHeader from './SectionHeader.vue'
</script>

<template>
  <section :id="writtenWork.id" class="content-section is-wip">
    <SectionHeader number="03" title="Written Work" type="Writing" />
    <hr class="content-section__rule" />
  </section>
</template>
