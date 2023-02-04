const Koa = require('koa');
const fs = require('fs');
const path = require('path');

const app = new Koa();

app.use(async (ctx) => {
  if (ctx.request.url === '/') {
    const indexContent = await fs.promises.readFile(
      path.resolve(__dirname, './index.html')
    ); // 拿到绝对路径
    // 将页面送给客户端
    ctx.response.body = indexContent;
    ctx.response.set('Content-Type', 'text/html'); // 以什么格式返回给浏览器
  }
  if (ctx.request.url === '/src/main.js') {
    const mainJsContent = await fs.promises.readFile(
      path.resolve(__dirname, './src/main.js')
    );
    ctx.response.body = mainJsContent;
    ctx.response.set('Content-Type', 'text/javascript');
  }
  if (ctx.request.url === '/src/App.vue') {
    const AppVueContent = await fs.promises.readFile(
      path.resolve(__dirname, './src/App.vue')
    );
    ctx.response.body = AppVueContent;
    ctx.response.set('Content-Type', 'text/javascript');
  }
  console.log(ctx);
});

app.listen(2333, () => {
  console.log('vite server listen on 2333');
});
