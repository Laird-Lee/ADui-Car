import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

// https://vitejs.dev/config/

export default defineConfig({
  css: {
    // CSS 预处理器
    preprocessorOptions: {
      //define global scss variable
      less: {
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ],
      dts: 'src/types/components.d.ts'
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ],
      dts: 'src/types/auto-imports.d.ts'
    }),
    VueI18nPlugin({})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  server: {
    port: 8887,
    cors: true
  }
});
