const fs = require("fs");
const path = require("path");

export default (options) => {
  return {
    configureServer(server) {
      const mockStat = fs.statSync("mock");
      const isDiretory = mockStat.isDirectory();
      let mockResult = [];
      if (isDiretory) {
        mockResult = require(path.resolve(process.cwd(), "mock/index.js")); // process.cwd() 获取执行目录
      }

      server.middlewares.use((req, res, next) => {
        console.log("req", req.url);
        // 自定义处理请求 ...
        const mathItem = mockResult.find(
          (mockDescriptor) => mockDescriptor.url === req.url
        );
        if (mathItem) {
          const resData = mathItem.response(req);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(resData));
        } else {
          next();
        }
      });
    },
  };
};
