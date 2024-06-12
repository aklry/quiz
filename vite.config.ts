import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import ViteCompression from "vite-plugin-compression";
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import { vitePluginForArco } from '@arco-plugins/vite-vue'
import { createHtmlPlugin } from 'vite-plugin-html'


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
    }),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'Quiz'
        }
      }
    }),
    ViteCompression({
      threshold: 50 * 1024, // 超过50kb进行压缩
      algorithm: "brotliCompress",
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL("./index.html", import.meta.url)),
      },
      experimentalLogSideEffects: true,
      treeshake: {
        preset: "recommended",
      },
      output: {
        experimentalMinChunkSize: 20 * 1024,
        // format: "esm",
        chunkFileNames: "static/js/chunk-[hash].js", // 代码分割后文件名
        entryFileNames: "static/js/entry-[hash:6].js", // 入口文件名
        assetFileNames: "static/[ext]/[name]-[hash].[ext]", // 静态资源文件名
        manualChunks: (id: string) => {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      }
    }
  }
})
