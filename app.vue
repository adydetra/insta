<script lang="ts" setup>
useSeoMeta({
  title: "insta",
  description: "Web application specifically designed to give you an overview before upload your photos to Instagram",
});

useHead({
  htmlAttrs: {
    class: "scroll-smooth",
  },
});
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout id="top">
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  scrollbar-width: thin;
  scrollbar-color: #444 #222;
}
body * {
  @apply transition-colors ease-in-out duration-500;
}
</style>
