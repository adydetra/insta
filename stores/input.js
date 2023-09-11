// stores/input.js

import { defineStore } from 'pinia';

export const useInputStore = defineStore('input', {
  state: () => ({
    inputs: new Array(9).fill({ photo: null }),
  }),
  actions: {
    setPhoto(index, photoDataUrl) {
      this.inputs[index].photo = photoDataUrl;
    },
  },
});
