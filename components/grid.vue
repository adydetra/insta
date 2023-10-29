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
      <Color />
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

  <Modal :show="showConfirmModal" @confirm="handleReset" @cancel="cancelReset" />
</template>

<style>
#icon {
  @apply w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5 mt-2;
}
</style>

<script>
export default {
  data() {
    return {
      photos: [],
      changeHistory: [],
      currentGap: 1,
      currentObjectFit: "object-cover",
      gridGap: "gap-1",
      defaultPhoto: "/example.png",
      maxPhotos: 9,
      showConfirmModal: false,
    };
  },
  mounted() {
    const savedPhotos = JSON.parse(localStorage.getItem("savedPhotos")) || [];
    const savedChangeHistory = JSON.parse(localStorage.getItem("changeHistory")) || [];

    if (savedPhotos.length < this.maxPhotos) {
      this.photos = savedPhotos.concat(new Array(this.maxPhotos - savedPhotos.length).fill(null));
    } else {
      this.photos = savedPhotos;
    }
    this.changeHistory = savedChangeHistory;
    this.updateUndoButtonDisabled();
    this.updateResetButtonDisabled();
  },
  computed: {
    hasContent() {
      return this.photos.some((photo) => photo !== null);
    },

    resetButtonIcon() {
      return this.hasContent ? "line-md:close-circle" : "line-md:close-circle";
    },

    resetButtonTitle() {
      return this.hasContent ? "Reset" : "Reset is disabled";
    },

    isResetDisabled() {
      return this.changeHistory.length === 0;
    },

    undoButtonIcon() {
      return this.changeHistory.length > 0 ? "line-md:arrow-left-square" : "line-md:arrow-left-square";
    },

    undoButtonTitle() {
      return this.changeHistory.length > 0 ? "Undo" : "Undo is disabled";
    },

    isUndoDisabled() {
      return this.changeHistory.length === 0;
    },

    buttons() {
      return [
        {
          title: "New box",
          icon: "line-md:plus-square",
          action: this.addNewBox,
        },
        {
          title: "Object Fit",
          icon: "line-md:image",
          action: this.toggleObjectFit,
        },
        {
          title: "Gap",
          icon: "line-md:square",
          action: this.toggleGap,
        },
      ];
    },
  },
  methods: {
    openFilePicker(index) {
      this.$refs["inputRef" + index].click();
    },

    setPhoto(index, event) {
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
          const newPhotos = [...this.photos];
          newPhotos[index] = reader.result;

          this.changeHistory.push({
            type: "image",
            index: index,
            data: reader.result,
          });

          this.photos = newPhotos;
          this.updateUndoButtonDisabled();
          localStorage.setItem("savedPhotos", JSON.stringify(this.photos));
          localStorage.setItem("changeHistory", JSON.stringify(this.changeHistory));
        };
        reader.readAsDataURL(file);
      }
    },

    addNewBox() {
      this.photos.push(null);
      this.changeHistory.push({
        type: "box",
        index: this.photos.length - 1,
      });
      this.updateUndoButtonDisabled();
      this.updateResetButtonDisabled();
      localStorage.setItem("savedPhotos", JSON.stringify(this.photos));
      localStorage.setItem("changeHistory", JSON.stringify(this.changeHistory));
    },

    undo() {
      if (this.changeHistory.length > 0) {
        const lastChange = this.changeHistory.pop();
        if (lastChange.type === "image") {
          this.photos[lastChange.index] = null;
        } else if (lastChange.type === "box") {
          this.photos.splice(lastChange.index, 1);
        }
        this.updateUndoButtonDisabled();
        this.updateResetButtonDisabled();
        localStorage.setItem("savedPhotos", JSON.stringify(this.photos));
        localStorage.setItem("changeHistory", JSON.stringify(this.changeHistory));
      }
    },

    updateUndoButtonDisabled() {
      this.undoButtonDisabled = this.changeHistory.length === 0;
    },

    updateResetButtonDisabled() {
      this.resetButtonDisabled = this.photos.every((photo) => photo === null);
    },

    toggleGap() {
      if (this.gridGap === "gap-1") {
        this.gridGap = "gap-2";
        this.currentGap = 2;
      } else if (this.gridGap === "gap-2") {
        this.gridGap = "gap-3";
        this.currentGap = 3;
      } else {
        this.gridGap = "gap-1";
        this.currentGap = 1;
      }
    },

    toggleObjectFit() {
      if (this.currentObjectFit === "object-cover") {
        this.currentObjectFit = "object-contain";
      } else {
        this.currentObjectFit = "object-cover";
      }
    },

    reset() {
      if (!this.isResetDisabled) {
        this.showConfirmModal = true;
      }
    },

    handleReset() {
      this.showConfirmModal = false;
      this.photos = new Array(9).fill(null);
      this.changeHistory = [];
      this.updateResetButtonDisabled();
      localStorage.setItem("savedPhotos", JSON.stringify(this.photos));
      localStorage.setItem("changeHistory", JSON.stringify(this.changeHistory));
    },

    cancelReset() {
      this.showConfirmModal = false;
    },
  },
};
</script>
