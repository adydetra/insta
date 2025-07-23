<template>
  <div class="fixed start-[84%] inset-y-1/2 flex-col gap-4 lg:start-2/3 -mt-12 md:flex">
    <NuxtLink to="#top" border-1 border-gray-700 rounded-full border-solid p-[0.001rem] hover:opacity-50>
      <div i-meteocons:pressure-high-fill text-3xl leading-0 />
    </NuxtLink>
    <NuxtLink to="#bottom" border-1 border-gray-700 rounded-full border-solid p-[0.001rem] hover:opacity-50>
      <div i-meteocons:pressure-low-fill text-3xl leading-0 />
    </NuxtLink>
  </div>
</template>
