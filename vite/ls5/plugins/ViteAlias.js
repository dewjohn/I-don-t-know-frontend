const fs = require('fs');
const path = require('path');

function diffDirAndFile(dirFilesArr = [], basePath = '') {
  const res = {
    dirs: [],
    files: [],
  };
  dirFilesArr.forEach((name) => {
    const currentFileStat = fs.statSync(
      path.resolve(__dirname, basePath + '/' + name)
    );
    const isDirectory = currentFileStat.isDirectory();
    if (isDirectory) {
      res.dirs.push(name);
    } else {
      res.files.push(name);
    }
  });
  return res;
}

function getTotalSrcDir(keyName) {
  const resultFile = fs.readdirSync(path.resolve(__dirname, '../src'));
  const diffRes = diffDirAndFile(resultFile, '../src');
  const resolveAliasObj = {};
  diffRes.dirs.forEach((dirName) => {
    const key = `${keyName}${dirName}`;
    const absPath = path.resolve(__dirname, '../src' + '/' + dirName);
    resolveAliasObj[key] = absPath;
  });
  return resolveAliasObj;
}

// vite插件必须给vite返回一个配置对象
module.exports = ({ keyName = '@' } = {}) => {
  return {
    config(config, env) {
      // console.log('config', config, env);
      // config: 目前一个配置对象
      // production: development serve build
      // env: mode:string, command: string
      // config函数可以返回一个对象，这个对象是部分的viteconfig配置
      const resolveAliasRes = getTotalSrcDir(keyName);
      return {
        resolve: {
          alias: resolveAliasRes,
        },
      };
    },
  };
};
