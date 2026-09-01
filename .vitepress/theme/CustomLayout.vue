<script setup>
import DefaultTheme from "vitepress/theme";
import NotFoundPage from "./404.vue";
import { useData, useRoute } from "vitepress";

const { Layout } = DefaultTheme;
const { frontmatter } = useData();
const notFound = useRoute().data?.notFound === true;
const hero = () => frontmatter.value?.hero;
</script>

<template>
  <Layout v-if="!notFound">
    <template #not-found><NotFoundPage /></template>
    <template #home-hero-info>
      <h1 class="heading">
        <span v-if="hero()?.name" v-html="hero().name" class="name clip"></span>
      </h1>
      <div class="secondary-name">Richal Aleman</div>
      <p v-if="hero()?.tagline" v-html="hero().tagline" class="tagline"></p>
    </template>
  </Layout>
  <NotFoundPage v-else />
</template>
