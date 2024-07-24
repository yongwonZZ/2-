const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api1",
    createProxyMiddleware({
      target: "https://www.koreaexim.go.kr",
      changeOrigin: true,
      pathRewrite: {
        "^/api1": "", // '/api1'을 빈 문자열로 대체
      },
    })
  );

  app.use(
    "/api2",
    createProxyMiddleware({
      target: "https://apis.data.go.kr",
      changeOrigin: true,
      pathRewrite: {
        "^/api2": "", // '/api2'을 빈 문자열로 대체
      },
    })
  );
};
