<template>
  <nav class="w-full flex items-center justify-between px-4">
    <h1 class="text-4xl font-semibold">insta</h1>
    <div class="flex gap-6 md:gap-8 lg:gap-6 2xl:gap-8 text-gray-400">
      <button
        @click="undo"
        aria-label="button"
        :title="undoButtonTitle"
        :disabled="isUndoDisabled"
        :class="isUndoDisabled ? 'cursor-not-allowed text-red-400 transiton ease-in-out' : 'hover:opacity-80'"
      >
        <Icon id="icon" :name="undoButtonIcon" :title="undoButtonTitle" />
      </button>
      <button v-for="button in buttons" @click="button.action" aria-label="button" :title="button.title" class="hover:opacity-80">
        <Icon id="icon" :name="button.icon" :title="button.title" />
      </button>
      <button
        @click="reset"
        aria-label="button"
        :title="resetButtonTitle"
        :disabled="isResetDisabled"
        :class="isResetDisabled ? 'cursor-not-allowed text-red-400 transiton ease-in-out' : 'hover:opacity-80'"
      >
        <Icon id="icon" :name="resetButtonIcon" :title="resetButtonTitle" />
      </button>
      <AtomsColor />
    </div>
  </nav>

  <section class="grid grid-cols-3 py-12" :class="[gridGap]">
    <div
      v-for="(photo, index) in photos"
      :key="index"
      class="relative overflow-hidden flex items-center justify-center cursor-pointer aspect-square bg-black"
      @click="openFilePicker(index)"
    >
      <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" @change="setPhoto(index, $event)" :ref="'inputRef' + index" aria-label="input" />
      <NuxtImg v-if="photo !== null" :src="photo" alt="" loading="lazy" placeholder :class="currentObjectFit + ' w-full h-full'" />
      <NuxtImg v-else :src="defaultPhoto" alt="" loading="lazy" placeholder :class="currentObjectFit + ' w-full h-full'" />
    </div>
  </section>

  <AtomsModal :show="showConfirmModal" @confirm="handleReset" @cancel="cancelReset" />
  <transition
    enter-active-class="duration-300 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <AtomsToTopBottom v-if="photos.length > 15" class="transition" />
  </transition>
</template>

<style>
#icon {
  @apply w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5 mt-2;
}
</style>

<script setup>
const photos = ref([]);
const changeHistory = ref([]);
const currentGap = ref(1);
const currentObjectFit = ref("object-cover");
const gridGap = ref("gap-1");
const defaultPhoto = "/example.png";
const maxPhotos = 9;
const showConfirmModal = ref(false);
let undoButtonDisabled = ref(false);
let resetButtonDisabled = ref(false);

const hasContent = computed(() => photos.value.some((photo) => photo !== null));
const resetButtonIcon = computed(() => (hasContent.value ? "line-md:close-circle" : "line-md:close-circle"));
const resetButtonTitle = computed(() => (hasContent.value ? "Reset" : "Reset is disabled"));
const isResetDisabled = computed(() => changeHistory.value.length === 0);
const undoButtonIcon = computed(() => (changeHistory.value.length > 0 ? "line-md:arrow-left-square" : "line-md:arrow-left-square"));
const undoButtonTitle = computed(() => (changeHistory.value.length > 0 ? "Undo" : "Undo is disabled"));
const isUndoDisabled = computed(() => changeHistory.value.length === 0);

const buttons = computed(() => [
  {
    title: "New box",
    icon: "line-md:plus-square",
    action: addNewBox,
  },
  {
    title: "Object Fit",
    icon: "line-md:arrow-align-center",
    action: toggleObjectFit,
  },
  {
    title: "Gap",
    icon: "line-md:square",
    action: toggleGap,
  },
]);

const openFilePicker = (index) => {
  const inputRef = `inputRef${index}`;
  const inputElement = $refs[inputRef];
  inputElement.click();
};

const setPhoto = (index, event) => {
  const file = event.target.files[0];
  if (file) {
    const allowedExtensions = ["png", "jpeg", "jpg"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert("Only PNG, JPG, and JPEG files are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newPhotos = [...photos.value];
      newPhotos[index] = reader.result;

      changeHistory.value.push({
        type: "image",
        index: index,
        data: reader.result,
      });

      photos.value = newPhotos;
      updateUndoButtonDisabled();
      localStorage.setItem("savedPhotos", JSON.stringify(photos.value));
      localStorage.setItem("changeHistory", JSON.stringify(changeHistory.value));
    };
    reader.readAsDataURL(file);
  }
};

const addNewBox = () => {
  photos.value.push(null);
  changeHistory.value.push({
    type: "box",
    index: photos.value.length - 1,
  });
  updateUndoButtonDisabled();
  updateResetButtonDisabled();
  localStorage.setItem("savedPhotos", JSON.stringify(photos.value));
  localStorage.setItem("changeHistory", JSON.stringify(changeHistory.value));
};

const undo = () => {
  if (changeHistory.value.length > 0) {
    const lastChange = changeHistory.value.pop();
    if (lastChange.type === "image") {
      photos.value[lastChange.index] = null;
    } else if (lastChange.type === "box") {
      photos.value.splice(lastChange.index, 1);
    }
    updateUndoButtonDisabled();
    updateResetButtonDisabled();
    localStorage.setItem("savedPhotos", JSON.stringify(photos.value));
    localStorage.setItem("changeHistory", JSON.stringify(changeHistory.value));
  }
};

const updateUndoButtonDisabled = () => {
  undoButtonDisabled = changeHistory.value.length === 0;
};

const updateResetButtonDisabled = () => {
  resetButtonDisabled = photos.value.every((photo) => photo === null);
};

const toggleGap = () => {
  if (gridGap.value === "gap-1") {
    gridGap.value = "gap-2";
    currentGap.value = 2;
  } else if (gridGap.value === "gap-2") {
    gridGap.value = "gap-3";
    currentGap.value = 3;
  } else {
    gridGap.value = "gap-1";
    currentGap.value = 1;
  }
};

const toggleObjectFit = () => {
  if (currentObjectFit.value === "object-cover") {
    currentObjectFit.value = "object-contain";
  } else {
    currentObjectFit.value = "object-cover";
  }
};

const reset = () => {
  if (!isResetDisabled.value) {
    showConfirmModal.value = true;
  }
};

const handleReset = () => {
  showConfirmModal.value = false;
  photos.value = new Array(9).fill(null);
  changeHistory.value = [];
  updateResetButtonDisabled();
  localStorage.setItem("savedPhotos", JSON.stringify(photos.value));
  localStorage.setItem("changeHistory", JSON.stringify(changeHistory.value));
};

const cancelReset = () => {
  showConfirmModal.value = false;
};

onMounted(() => {
  const savedPhotos = JSON.parse(localStorage.getItem("savedPhotos")) || [];
  const savedChangeHistory = JSON.parse(localStorage.getItem("changeHistory")) || [];

  if (savedPhotos.length < maxPhotos) {
    photos.value = savedPhotos.concat(new Array(maxPhotos - savedPhotos.length).fill(null));
  } else {
    photos.value = savedPhotos;
  }
  changeHistory.value = savedChangeHistory;
  updateUndoButtonDisabled();
  updateResetButtonDisabled();
});
</script>
