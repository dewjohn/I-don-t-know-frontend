// module.exports = function (aliasConf, jsContent) {
//   const entries = Object.entries(aliasConf);
//   entries.forEach((entrie) => {
//     const [alias, path] = entrie;
//     console.log(path)
//     const srcLastIndex = path.indexOf('\src')
//     console.log(srcLastIndex)
//     const realPath = path.slice(srcLastIndex)
//     console.log(realPath)
//     lastContent = jsContent.replace(alias, realPath)
//     console.log(lastContent)
//     return lastContent
//   });
// };


module.exports = function(aliasConf, JSContent) {
  const entires = Object.entries(aliasConf);
  console.log("entires", entires, JSContent);
  let lastContent = JSContent;
  entires.forEach(entire => {
      const [alia, path] = entire;
      // 会做path的相对路径的处理
      // 如果我用官方的方式去找相对路径的话
      const srcIndex = path.indexOf("\src");
      // alias别名最终做的事情就是一个字符串替换
      const realPath = path.slice(srcIndex, path.length);
      lastContent = JSContent.replace(alia, './' + realPath);

  })
  console.log("lastContent..........", lastContent);
  return lastContent;
}