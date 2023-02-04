import { defineConfig } from 'vite';
import viteBaseConfig from './vite.base.config';
import viteDevConfig from './vite.dev.config';
import viteProdConfig from './vite.prod.config';

const envResolver = {
  build: () => {
    console.log('生产环境');
    return Object.assign([], viteBaseConfig, viteProdConfig);
  },
  serve: () => {
    console.log('开发环境');
    return { ...viteBaseConfig, ...viteDevConfig };
  },
};

export default defineConfig((config) => {
  console.log(config.command);
  return envResolver[config.command]();
});
