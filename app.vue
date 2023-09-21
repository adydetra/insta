<template>
  <NuxtLayout>
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

<script lang="ts" setup>
useSeoMeta({
  title: "insta",
  description: "Web application specifically designed to give you an overview before upload your photos to Instagram",
});
</script>
