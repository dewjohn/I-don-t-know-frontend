const Koa = require('koa');
const fs = require('fs');
const path = require('path');

// 读取配置文件
const viteConf = require('./vite.config')
// 手写的alias函数
const aliasResolver = require('./pathResolve')

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
  if (ctx.request.url.endsWith(".js")) {
    const JSContent = await fs.promises.readFile(path.resolve(__dirname, "." + ctx.request.url)); // 在服务端一般不会这么用
    console.log("JSContent", JSContent);
    // 直接进行alias的替换
    const lastResult = aliasResolver(viteConf.resolve.alias, JSContent.toString());
    ctx.response.body = lastResult; // 作为响应体发给对应的请求的人
    ctx.response.set("Content-Type", "text/javascript");
}
});

app.listen(2333, () => {
  console.log('vite server listen on 2333');
});
