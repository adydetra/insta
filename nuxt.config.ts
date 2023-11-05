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

  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "insta",
      short_name: "insta",
      theme_color: "#FFF",
      background_color: "#FFF",
      icons: [
        {
          src: "pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});
