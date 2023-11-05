export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en",
      },
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@nuxtjs/color-mode", "@nuxt/image", "nuxt-icon", "@vueuse/nuxt", "@vite-pwa/nuxt"],

  devtools: { enabled: false },

  image: {
    quality: 1,
    format: ["webp"],
  },

  tailwindcss: {
    viewer: false,
  },

  googleFonts: {
    families: {
      "Dancing Script": [400, 600],
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
  },

  colorMode: {
    classSuffix: "",
    preference: "light",
  },
});
