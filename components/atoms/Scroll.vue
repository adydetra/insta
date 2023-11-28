<script lang="ts" setup>
const icons = [
  { name: "high", to: "top" },
  { name: "low", to: "bottom" },
];
const style = "bg-gray-black border border-gray-700/70 rounded-full p-[0.001rem] hover:opacity-50";
</script>

<template>
  <div class="fixed hidden md:flex flex-col gap-4 -mt-12 inset-y-1/2 start-[84%] lg:start-2/3">
    <NuxtLink v-for="icon in icons" :to="'#' + icon.to" :class="style">
      <Icon :name="'meteocons:pressure-' + icon.name + '-fill'" size="32" />
    </NuxtLink>
  </div>
</template>
