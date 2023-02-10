import { defineConfig } from 'vite';
import ViteAlias from './plugins/ViteAlias';


export default defineConfig({
  optimizeDeps: {
    exclude: [], // 指定数组的依赖不进行依赖预构建
  },
  build: {
    rollupOptions: {
      // 生产环境下用rollup进行打包
      // 开发环境下使用es module
      output: {
        // 控制输出
        // 在 rollup 中 hash指的是将你的文件名和文件内容进行组合计算得出的结果
        assetFileNames: '[hash].[name].[ext]',
      },
    },
    assetsInlineLimit: 4096, // 4kb 小于4kb就转base64
    outDir: "build", // 配置输出文件名
    assetsDir: "static", // 配置输出的静态文件名
    emptyOutDir: true, // 每次打包前先清除输出目录
  },
  plugins: [
    ViteAlias()
  ]
});