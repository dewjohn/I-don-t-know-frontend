import { defineConfig } from 'vite';
const path = require('path');

export default defineConfig({
  optimizeDeps: {
    exclude: [], // 排除依赖预构建
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      // 对css模块化默认行为进行覆盖，最终传给postcss
      localsConvention: 'camelCase', // 修改生成的配置对象的key的展示形式（驼峰还是中划线）
      scopeBehaviour: 'local', // 配置当前模块化行为是模块化还是全局化
      // generateScopedName: "[name]_[local]_[hash:5]" // 展示格式
      generateScopedName: (name, filename, css) => {
        // name --> css文件中的类名
        // filename --> 当前css文件的绝对路径
        // css --> 当前样式
        return `${name}_${filename}`;
      },
      hashPrefix: 'test', // 生成hash会根据你的类名 + 随机字符串去生成（hash: 只要你的字符串有一个字不一样，那么生成的hash就会完全不一样，只要你的字符串完全一样，生成的hash就会完全一样）
      globalModulePaths: [], // 你不想参与到css模块化的路径
    },
    preprocessorOptions: {},
    devSourcemap: true, // 找到错误所在位置
  },
});
