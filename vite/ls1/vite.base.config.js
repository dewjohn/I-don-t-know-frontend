import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    exclude: [] // 排除依赖预构建
  }
})