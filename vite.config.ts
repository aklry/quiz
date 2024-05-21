import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import { vitePluginForArco } from '@arco-plugins/vite-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginForArco({
      style: 'css'
    }),
    AutoImport({
      eslintrc: {
        enabled: true
      },
      resolvers: [ArcoResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: fileURLToPath(new URL('./types/auto-imports.d.ts', import.meta.url)),
      dirs: ['src/components']
    }),
    Components({
      resolvers: [ArcoResolver()],
      dts: fileURLToPath(new URL('./types/components.d.ts', import.meta.url))
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
