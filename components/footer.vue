<template>
  <footer class="font-mono text-xs md:text-sm lg:text-xs 2xl:text-sm text-gray-400 space-y-2 px-3">
    <p>
      by <NuxtLink to="https://github.com/devdewa" target="_blank" title="devdewa" :class="link">@devdewa</NuxtLink>, appreciate my work on
      <NuxtLink to="https://github.com/sponsors/devdewa" target="_blank" title="Github Sponsors" :class="link">Sponsors</NuxtLink>
    </p>
    <p>
      powered by nuxt 💚. source on
      <NuxtLink to="https://github.com/devdewa/insta" target="_blank" title="Github" :class="link"><Icon name="line-md:github-loop" title="Github" /></NuxtLink>
    </p>
  </footer>
</template>

<script lang="ts" setup>
const link = "border-b dark:border-gray-800 pb-0.5";
</script>
