<template>
  <nav class="w-full flex items-center justify-between px-4">
    <h1 class="text-4xl font-semibold">insta</h1>
    <ul class="flex gap-8 text-gray-400">
      <li v-for="button in buttons" :key="button.title">
        <button @click="button.action">
          <Icon class="w-5 h-5 md:w-6 md:h-6" :name="button.icon" :title="button.title" />
        </button>
      </li>
    </ul>
  </nav>

  <section class="grid grid-cols-3 py-12" :class="[gridGap]">
    <div
      v-for="(photo, index) in photos"
      :key="index"
      class="relative overflow-hidden flex items-center justify-center cursor-pointer aspect-square bg-black"
      @click="openFilePicker(index)"
    >
      <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" @change="setPhoto(index, $event)" :ref="'inputRef' + index" />
      <NuxtImg v-if="photo !== null" :src="photo" alt="" loading="lazy" placeholder :class="currentObjectFit + ' w-full h-full'" />
      <NuxtImg v-else :src="defaultPhoto" alt="" loading="lazy" placeholder :class="currentObjectFit + ' w-full h-full'" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      photos: [],
      photoHistory: [],
      currentGap: 1,
      currentObjectFit: "object-cover",
      gridGap: "gap-1",
      defaultPhoto: "/example.png",
    };
  },
  mounted() {
    const savedPhotos = JSON.parse(localStorage.getItem("savedPhotos")) || [];

    this.photos = savedPhotos.length === 0 ? new Array(9).fill(null) : savedPhotos;
  },
  computed: {
    buttons() {
      return [
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
          icon: "line-md:rotate-270",
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
          this.photoHistory.push([...this.photos]);
          this.photos[index] = reader.result;
          localStorage.setItem("savedPhotos", JSON.stringify(this.photos));
        };
        reader.readAsDataURL(file);
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
    undo() {
      if (this.photoHistory.length > 0) {
        this.photos = this.photoHistory.pop();
        localStorage.setItem("savedPhotos", JSON.stringify(this.photos));
      }
    },
    reset() {
      this.photos = new Array(9).fill(null);
      localStorage.setItem("savedPhotos", JSON.stringify(this.photos));
    },
  },
};
</script>
