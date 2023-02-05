import '@/main.js'

/**
import '@/main.js'
console.log('this is main.js')
此时浏览器读到的是 @/main.js ，因为不认识，所以不会再读取 src/main.js
所以必须要手写 alias 原理就是字符串替换，首先读取 vite.config.js 找到配置
{
  alias: {
    '@': path.resolve(__dirname, './src)
  }
}
然后将 @ 替换为配置文件的 path.resolve(__dirname, './src)
 */
