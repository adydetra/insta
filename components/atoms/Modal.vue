<script setup lang="ts">
const { show } = defineProps(["show", "message"]);
const cover = "fixed inset-0 flex items-center justify-center gap-10 z-50";
const icon = "cursor-pointer hover:opacity-80"

const emit = defineEmits();

const confirm = () => {
  emit("confirm");
};

const cancel = () => {
  emit("cancel");
};
</script>


<template>
  <div v-if="show" :class="cover" class="bg-gray-800 opacity-95"></div>
  <div v-if="show" :class="cover">
    <div title="Confirm"><Icon @click="confirm" size="40" name="healthicons:yes" :class="icon" class="text-blue-500" /></div>
    <div title="Cancel"><Icon @click="cancel" size="40" name="healthicons:no" :class="icon" class="text-red-500" /></div>
  </div>
</template>