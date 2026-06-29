<script setup>
import { archives } from '../data/archives'
</script>

<template>
  <div class="main-content archives-page">
    <section class="content-section">
      <p class="content-section__index">Archives</p>
      <p class="content-section__intro">
        <em>Archived endless eights, references, and past featured mixes.</em>
      </p>
    </section>

    <section class="content-section">
      <h2 class="content-section__title">Endless Eight</h2>
      <article v-for="item in archives.endlessEight" :key="item.id" class="archive-item">
        <h3 class="inline-work__title">{{ item.title }}</h3>
        <p class="inline-work__date">{{ item.date }}</p>
        <p>{{ item.note }}</p>
      </article>
    </section>

    <section class="content-section">
      <h2 class="content-section__title">References</h2>
      <article v-for="item in archives.references" :key="item.id" class="archive-item">
        <h3 class="inline-work__title">{{ item.title }}</h3>
        <p class="inline-work__date">{{ item.date }}</p>
        <p>{{ item.note }}</p>
      </article>
    </section>

    <section class="content-section">
      <h2 class="content-section__title">Past Mixes</h2>
      <article v-for="item in archives.mixes" :key="item.id" class="archive-item">
        <h3 class="inline-work__title">{{ item.title }}</h3>
        <p class="inline-work__date">{{ item.date }}</p>
        <p>{{ item.body }}</p>
        <p v-if="item.links?.soundcloud">
          <a :href="item.links.soundcloud" target="_blank" rel="noopener noreferrer">SoundCloud</a>
        </p>
        <p v-if="item.links?.spotify">
          <a :href="item.links.spotify" target="_blank" rel="noopener noreferrer">Spotify</a>
        </p>
      </article>
    </section>
  </div>
</template>
