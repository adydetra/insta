<template>
  <button aria-label="Color Mode" @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')">
    <Icon v-if="$colorMode.value == 'dark'" name="line-md:circle-twotone" class="w-4 h-4 lg:w-6 lg:h-6" />
    <Icon v-else name="line-md:circle" class="w-4 h-4 lg:w-6 lg:h-6" />
  </button>
</template>

<script setup lang="ts">
type Theme = "light" | "dark";

const setColorTheme = (newTheme: Theme) => {
  useColorMode().preference = newTheme;
};
</script>
