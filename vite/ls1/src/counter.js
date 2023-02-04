import _ from "lodash";
// 在处理过程中，如果遇到有非绝对路径或者相对路径的引用，会开启路径补全
let counter = 123

// 在生产环境中，vite会交给rollup去打包

/**
 * 依赖预构建
 * commonjs 规范的导出 module.exports
 * 首先 vite 会找到对应依赖，然后调用esbuild将其他规范的代码转换成esmodule规范 .vite/deps
 * 格式化不同第三方包的导出格式
 * 对路径的处理可以直接使用.vite/deps，方便路径重写
 * 网络多包传输的性能问题,有了依赖于预构建，无论包里有多少个export import ，vite都会将他们集中打包到一个或者几个模块中
 */

export default counter