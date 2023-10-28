<template>
  <nav class="w-full flex items-center justify-between px-4 text-">
    <h1 class="text-4xl font-semibold">insta</h1>
    <ul class="flex gap-6 md:gap-8 lg:gap-6 2xl:gap-8 text-gray-400">
      <li v-for="button in buttons" :key="button.title">
        <button @click="button.action" aria-label="button" :title="button.title">
          <Icon class="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5 mt-2" :name="button.icon" :title="button.title" />
        </button>
      </li>
      <Color />
    </ul>
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

    if (savedPhotos.length < this.maxPhotos) {
      this.photos = savedPhotos.concat(new Array(this.maxPhotos - savedPhotos.length).fill(null));
    } else {
      this.photos = savedPhotos;
    }
  },
  computed: {
    buttons() {
      return [
        {
          title: "New box",
          icon: "line-md:plus-square",
          action: this.addNewBox,
        },
        {
          title: "Undo",
          icon: "line-md:arrow-left-square",
          action: this.undo,
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
        {
          title: "Reset",
          icon: "line-md:close-circle",
          action: this.reset,
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
          localStorage.setItem("savedPhotos", JSON.stringify(this.photos));
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
      localStorage.setItem("savedPhotos", JSON.stringify(this.photos));
      console.log("Box baru ditambahkan.");
    },

    undo() {
      if (this.changeHistory.length > 0) {
        const lastChange = this.changeHistory.pop();
        if (lastChange.type === "image") {
          this.photos[lastChange.index] = null;
        } else if (lastChange.type === "box") {
          this.photos.splice(lastChange.index, 1);
        }
        localStorage.setItem("savedPhotos", JSON.stringify(this.photos));
      }
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
      this.showConfirmModal = true;
    },

    handleReset() {
      this.showConfirmModal = false;
      this.photos = new Array(9).fill(null);
      localStorage.setItem("savedPhotos", JSON.stringify(this.photos));
    },

    cancelReset() {
      this.showConfirmModal = false;
    },
  },
};
</script>