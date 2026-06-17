/* eslint-disable */
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  corePlugins: {
    preflight: false, // 禁用默认预检,否则影响其他样式
  },
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/assets/css/**/*.css',
    './common-package/**/*',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '600px',
      'sm': '960px',
      'md': '1280px',
      'lg': '1920px',
      'xl': '2560px',
    },
    extend: {
      backgroundColor: () => ({
        'light-background': 'rgba(128, 131, 144, 0.08)',
      }),
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
    require('tailwind-scrollbar-hide'),
  ],
}
