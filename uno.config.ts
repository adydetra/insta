import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts } from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'Dancing Script',
      },
    }),
  ],
  shortcuts: {
    button: 'bg-transparent border-none p-0 cursor-pointer',
    icon: 'w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5 mt-2',
    link: 'text-gray-400 no-underline border-b-solid b-b border-gray-200 hover:border-gray-400 dark:hover:border-gray-600 dark:border-gray-800 pb-0.5',
  },
  transformers: [
    transformerDirectives(),
  ],
});
