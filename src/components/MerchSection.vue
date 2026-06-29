<script setup>
import { merch } from '../data/merch'
import SectionHeader from './SectionHeader.vue'
</script>

<template>
  <section :id="merch.id" class="content-section is-wip">
    <SectionHeader number="05" title="Merch" type="Shop" />
    <hr class="content-section__rule" />
  </section>
</template>
