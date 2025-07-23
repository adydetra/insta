<script lang="ts" setup>
useSeoMeta({
  title: 'insta',
  description: 'Web application specifically designed to give you an overview before upload your photos to Instagram',
});

useHead({
  htmlAttrs: {
    class: 'scroll-smooth',
  },
});
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout id="top">
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="postcss">
:root {
  scrollbar-width: thin;
  scrollbar-color: #444 #222;
}
html,
body {
  @apply m-0;
}
body * {
  @apply transition-colors ease-in-out duration-500;
}
:root {
  scrollbar-width: thin;
  scrollbar-color: #444 #222;
}
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #444;
}
::-webkit-scrollbar-thumb:active {
  background-color: #222;
}
html.dark ::-webkit-scrollbar-thumb {
  background-color: #1b1b1b;
}
html.dark ::-webkit-scrollbar-thumb:active {
  background-color: rgb(41, 41, 41);
}
html.dark ::-webkit-scrollbar {
  background-color: #050505;
}
.dark {
  color-scheme: dark;
}
</style>
