<template>
  <button aria-label="Color Mode" @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')" title="Theme">
    <Icon v-if="$colorMode.value == 'dark'" name="line-md:circle-twotone" :class="icon" />
    <Icon v-else name="line-md:circle" :class="icon" />
  </button>
</template>

<script setup lang="ts">
type Theme = "light" | "dark";

const icon = "w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5 mt-2"

const setColorTheme = (newTheme: Theme) => {
  useColorMode().preference = newTheme;
};
</script>
