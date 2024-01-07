<script setup lang="ts">
const colorMode = useColorMode();

function toggleMode() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light';
}
</script>

<template>
  <button button aria-label="Color Mode" :title="$colorMode.preference === 'dark' ? 'Switch to light' : 'Switch to dark'" @click="toggleMode">
    <div i-line-md:sunny-outline-loop dark:i-line-md:sunny-outline-to-moon-alt-loop-transition text-gray-400 dark:icon icon dark:text-gray-400 />
  </button>
</template>
