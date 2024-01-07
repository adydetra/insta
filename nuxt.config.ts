export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

  modules: ['@unocss/nuxt', '@nuxtjs/color-mode', '@nuxt/image', '@vueuse/nuxt', '@vite-pwa/nuxt'],

  image: {
    quality: 1,
    format: ['webp'],
  },
  colorMode: {
    classSuffix: '',
  },
  devtools: {
    enabled: false,
  },

  // pwa: {
  //   registerType: 'autoUpdate',
  //   manifest: {
  //     name: 'insta',
  //     short_name: 'insta',
  //     theme_color: '#FFF',
  //     background_color: '#FFF',
  //     icons: [
  //       {
  //         src: 'pwa-64x64.png',
  //         sizes: '64x64',
  //         type: 'image/png',
  //       },
  //       {
  //         src: 'pwa-192x192.png',
  //         sizes: '192x192',
  //         type: 'image/png',
  //       },
  //       {
  //         src: 'pwa-512x512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //       },
  //     ],
  //   },
  //   devOptions: {
  //     enabled: true,
  //     type: 'module',
  //   },
  // },
});
