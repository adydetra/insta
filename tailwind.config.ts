import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  darkMode: "class",
  content: ["./components/**/*.{vue,js}", "./layouts/**/*.vue", "./pages/**/*.vue", "./nuxt.config.{js,ts}", "./app.vue"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Dancing Script", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
