<script setup>
const photos = ref([]);
const changeHistory = ref([]);
const currentGap = ref(1);
const currentObjectFit = ref('object-cover');
const gridGap = ref('gap-1');
const defaultPhoto = '/example.png';
const maxPhotos = 9;
const showConfirmModal = ref(false);
const undoButtonDisabled = ref(false);
const resetButtonDisabled = ref(false);

const hasContent = computed(() => photos.value.some(photo => photo !== null));
const resetButtonIcon = computed(() => (hasContent.value ? 'i-line-md:close-circle' : 'i-line-md:close-circle'));
const resetButtonTitle = computed(() => (hasContent.value ? 'Reset' : 'Reset is disabled'));
const isResetDisabled = computed(() => changeHistory.value.length === 0);
const undoButtonIcon = computed(() => (changeHistory.value.length > 0 ? 'i-line-md:arrow-left-square' : 'i-line-md:arrow-left-square'));
const undoButtonTitle = computed(() => (changeHistory.value.length > 0 ? 'Undo' : 'Undo is disabled'));
const isUndoDisabled = computed(() => changeHistory.value.length === 0);

const buttons = computed(() => [
  {
    title: 'New box',
    icon: 'i-line-md:plus-square',
    action: addNewBox,
  },
  {
    title: 'Object Fit',
    icon: 'i-line-md:arrow-align-center',
    action: toggleObjectFit,
  },
  {
    title: 'Gap',
    icon: 'i-line-md:square',
    action: toggleGap,
  },
]);

function openFilePicker(index) {
  const inputRef = `inputRef${index}`;
  const inputElement = $refs[inputRef];
  inputElement.click();
}

function setPhoto(index, event) {
  const file = event.target.files[0];
  if (file) {
    const allowedExtensions = ['png', 'jpeg', 'jpg'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      // eslint-disable-next-line no-alert
      alert('Only PNG, JPG, and JPEG files are allowed.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newPhotos = [...photos.value];
      newPhotos[index] = reader.result;

      changeHistory.value.push({
        type: 'image',
        index,
        data: reader.result,
      });

      photos.value = newPhotos;
      updateUndoButtonDisabled();
      localStorage.setItem('savedPhotos', JSON.stringify(photos.value));
      localStorage.setItem('changeHistory', JSON.stringify(changeHistory.value));
    };
    reader.readAsDataURL(file);
  }
}

function addNewBox() {
  photos.value.push(null);
  changeHistory.value.push({
    type: 'box',
    index: photos.value.length - 1,
  });
  updateUndoButtonDisabled();
  updateResetButtonDisabled();
  localStorage.setItem('savedPhotos', JSON.stringify(photos.value));
  localStorage.setItem('changeHistory', JSON.stringify(changeHistory.value));
}

function undo() {
  if (changeHistory.value.length > 0) {
    const lastChange = changeHistory.value.pop();
    if (lastChange.type === 'image')
      photos.value[lastChange.index] = null;
    else if (lastChange.type === 'box')
      photos.value.splice(lastChange.index, 1);

    updateUndoButtonDisabled();
    updateResetButtonDisabled();
    localStorage.setItem('savedPhotos', JSON.stringify(photos.value));
    localStorage.setItem('changeHistory', JSON.stringify(changeHistory.value));
  }
}

function updateUndoButtonDisabled() {
  undoButtonDisabled.value = changeHistory.value.length === 0;
}

function updateResetButtonDisabled() {
  resetButtonDisabled.value = photos.value.every(photo => photo === null);
}

function toggleGap() {
  if (gridGap.value === 'gap-1') {
    gridGap.value = 'gap-2';
    currentGap.value = 2;
  }
  else if (gridGap.value === 'gap-2') {
    gridGap.value = 'gap-3';
    currentGap.value = 3;
  }
  else {
    gridGap.value = 'gap-1';
    currentGap.value = 1;
  }
}

function toggleObjectFit() {
  if (currentObjectFit.value === 'object-cover')
    currentObjectFit.value = 'object-contain';
  else
    currentObjectFit.value = 'object-cover';
}

function reset() {
  if (!isResetDisabled.value)
    showConfirmModal.value = true;
}

function handleReset() {
  showConfirmModal.value = false;
  photos.value = Array.from({ length: 9 }).fill(null);
  changeHistory.value = [];
  updateResetButtonDisabled();
  localStorage.setItem('savedPhotos', JSON.stringify(photos.value));
  localStorage.setItem('changeHistory', JSON.stringify(changeHistory.value));
}

function cancelReset() {
  showConfirmModal.value = false;
}

onMounted(() => {
  const savedPhotos = JSON.parse(localStorage.getItem('savedPhotos')) || [];
  const savedChangeHistory = JSON.parse(localStorage.getItem('changeHistory')) || [];

  if (savedPhotos.length < maxPhotos)
    photos.value = savedPhotos.concat(Array.from({ length: maxPhotos - savedPhotos.length }).fill(null));

  else
    photos.value = savedPhotos;

  changeHistory.value = savedChangeHistory;
  updateUndoButtonDisabled();
  updateResetButtonDisabled();
});
</script>

<template>
  <nav flex items-center justify-between px-4 pt-6>
    <h1 text-4xl font-semibold leading-0 font-sans>
      insta
    </h1>
    <div flex gap-6 md:gap-8>
      <button
        aria-label="button"
        :title="undoButtonTitle"
        :disabled="isUndoDisabled"
        :class="isUndoDisabled ? 'cursor-not-allowed text-red-400 transiton ease-in-out bg-transparent border-none p-0' : 'button text-gray-400'"
        @click="undo"
      >
        <div icon :class="undoButtonIcon" :title="undoButtonTitle" />
      </button>
      <button v-for="(button, index) in buttons" :key="index" aria-label="button" :title="button.title" button @click="button.action">
        <div text-gray-400 icon :class="button.icon" :title="button.title" />
      </button>
      <button
        aria-label="button"
        :title="resetButtonTitle"
        :disabled="isResetDisabled"
        :class="isResetDisabled ? 'cursor-not-allowed text-red-400 transiton ease-in-out bg-transparent border-none p-0' : 'button text-gray-400'"
        @click="reset"
      >
        <div icon :class="resetButtonIcon" :title="resetButtonTitle" />
      </button>
      <AtomsColor />
    </div>
  </nav>

  <section grid grid-cols-3 pt-12 :class="[gridGap]">
    <div
      v-for="(photo, index) in photos"
      :key="index"
      class="relative aspect-square flex cursor-pointer items-center justify-center overflow-hidden bg-black"
      @click="openFilePicker(index)"
    >
      <input :ref="`inputRef${index}`" type="file" class="absolute inset-0 cursor-pointer opacity-0" aria-label="input" @change="setPhoto(index, $event)">
      <NuxtImg v-if="photo !== null" :src="photo" alt="" loading="lazy" placeholder :class="`${currentObjectFit} w-full h-full`" />
      <NuxtImg v-else :src="defaultPhoto" alt="" loading="lazy" placeholder :class="`${currentObjectFit} w-full h-full`" />
    </div>
  </section>

  <AtomsModal :show="showConfirmModal" @confirm="handleReset" @cancel="cancelReset" />
  <Transition
    enter-active-class="duration-300 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <LazyAtomsScroll v-show="photos.length > 15" class="transition" ignore-attributes />
  </Transition>
</template>
