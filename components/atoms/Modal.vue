<script setup lang="ts">
const { show } = defineProps(['show', 'message']);
const emit = defineEmits(['confirm', 'cancel']);
const cover = 'fixed inset-0 flex items-center justify-center gap-10 z-50';
const icon = 'cursor-pointer hover:opacity-80';

function confirm() {
  emit('confirm');
}

function cancel() {
  emit('cancel');
}
</script>

<template>
  <div v-if="show" :class="cover" class="bg-gray-800 opacity-95" />
  <div v-if="show" :class="cover">
    <div title="Confirm">
      <Icon size="40" name="healthicons:yes" :class="icon" class="text-blue-500" @click="confirm" />
    </div>
    <div title="Cancel">
      <Icon size="40" name="healthicons:no" :class="icon" class="text-red-500" @click="cancel" />
    </div>
  </div>
</template>
