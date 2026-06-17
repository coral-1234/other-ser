import { fileURLToPath } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss' // 引入 Tailwind CSS 插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports, getPascalCaseRouteName } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import MetaLayouts from 'vite-plugin-vue-meta-layouts'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/member-select/document': {
        target: 'http://192.168.196.121:8086',
        changeOrigin: true,

        rewrite: path => path.replace(/^\/api/, ''),
      },

      '/api/fs': {
        target: 'https://oss-group1.dev.tanikawa.com',
        changeOrigin: true,

        rewrite: path => path.replace(/^\/api/, ''),
      },
      // ⚠️ Demo 模式下注释 `/api` 代理，让 /api/* 请求由浏览器 MSW Service Worker 拦截 mock。
      // 接入真实后端时取消注释（同时把 .env 的 VITE_API_BASE_URL 切回完整域名亦可）。
      // '/api': {
      //   target: 'https://tob-vvt-api.dev.tanikawa.com',
      //   changeOrigin: true,
      // },
    },

    // port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    cors: true, // 开启跨域
  },
  plugins: [
    // Docs: https://github.com/posva/unplugin-vue-router
    // ℹ️ This plugin should be placed before vue plugin
    VueRouter({
      getRouteName: routeNode => {
        // Convert pascal case to kebab case
        return getPascalCaseRouteName(routeNode)
          .replace(/([a-z\d])([A-Z])/g, '$1-$2')
          .toLowerCase()
      },
    }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'swiper-container' || tag === 'swiper-slide',
        },
      },
    }),
    tailwindcss(), // 添加 Tailwind CSS 插件
    VueDevTools(),
    vueJsx(),

    // Docs: https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin
    vuetify({
      styles: {
        configFile: 'src/assets/styles/variables/_vuetify.scss',
      },
    }),

    // Docs: https://github.com/dishait/vite-plugin-vue-meta-layouts?tab=readme-ov-file
    MetaLayouts({
      target: './src/layouts',
      defaultLayout: 'default',
    }),

    // Docs: https://github.com/antfu/unplugin-vue-components#unplugin-vue-components
    Components({
      dirs: ['common-package/@core/components', 'src/views/demos', 'src/views/examples', 'src/components', 'common-package/components'],
      dts: true,
      resolvers: [
        componentName => {
          // Auto import `VueApexCharts`
          if (componentName === 'VueApexCharts')
            return { name: 'default', from: 'vue3-apexcharts', as: 'VueApexCharts' }
        },
      ],
    }),

    // Docs: https://github.com/antfu/unplugin-auto-import#unplugin-auto-import
    AutoImport({
      imports: ['vue',
        VueRouterAutoImports,
        '@vueuse/core',
        '@vueuse/math',
        'vue-i18n',
        'pinia',
        {
          vuetify: ['useDate', 'useDisplay'],
        }],
      dirs: [
        './common-package/@core/utils',
        './common-package/@core/composable/',
        './common-package/composables/!(**/type.ts)', // 可组合项,但排除以 type.ts 文件
        './common-package/utils/', // 方法
        './common-package/plugins/*/composables/*',
        './src/utils/!(**/*.d.ts)', // 包含 utils 目录下的所有文件，但排除以 .d.ts 结尾的文件
        './src/composables/**',
      ],
      vueTemplate: true,

      // ℹ️ Disabled to avoid confusion & accidental usage
      ignore: ['useCookies', 'useStorage'],
    }),

    // Docs: https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n#intlifyunplugin-vue-i18n
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [
        fileURLToPath(new URL('./src/locales/**', import.meta.url)),
        fileURLToPath(new URL('./common-package/locales/**', import.meta.url)),
      ],
    }),
    svgLoader(),

  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
    devSourcemap: true,
  },
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@common-package': fileURLToPath(new URL('./common-package', import.meta.url)),
      '@themeConfig': fileURLToPath(new URL('./themeConfig.ts', import.meta.url)),
      '@core': fileURLToPath(new URL('./common-package/@core', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./common-package/@layouts', import.meta.url)),
      '@images': fileURLToPath(new URL('./src/assets/images/', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/assets/styles/', import.meta.url)),
      '@configured-variables': fileURLToPath(new URL('./src/assets/styles/variables/_template.scss', import.meta.url)),
      '@db': fileURLToPath(new URL('./src/fake-api/handlers/', import.meta.url)),
      '@api-utils': fileURLToPath(new URL('./src/fake-api/utils/', import.meta.url)),
      '@org-manage': fileURLToPath(new URL('./common-package/modules/org-manage', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,

    // rollupOptions: {
    //   output: {
    //     format: 'umd', // 输出 UMD 格式
    //     name: 'MyApp', // 子应用的全局变量名
    //   },
    // },
  },
  optimizeDeps: {
    exclude: ['vuetify', 'tailwindcss'],
    entries: [
      './src/**/*.vue',
    ],
  },
})
