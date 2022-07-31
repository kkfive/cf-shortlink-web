import { defineConfig } from 'vite'
import { join } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import commpressPlugin from 'vite-plugin-compression'
// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    pure: ['console.log']
  },
  build: {
    minify: true
  },

  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    commpressPlugin({
      verbose: true, // 默认即可
      disable: false, //开启压缩(不禁用)，默认即可
      deleteOriginFile: false, //删除源文件
      threshold: 10240, //压缩前最小文件大小
      algorithm: 'gzip', //压缩算法
      ext: '.gz' //文件类型
    })
  ],
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  }
})
