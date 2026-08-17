<script setup>
import DefaultTheme from "vitepress/theme";
import NotFoundPage from "./404.vue";
import { useRoute } from "vitepress";

const { Layout } = DefaultTheme;
const notFound = useRoute().data?.notFound === true;
</script>

<template>
  <Layout v-if="!notFound">
    <template #not-found><NotFoundPage /></template>
  </Layout>
  <NotFoundPage v-else />
</template>
