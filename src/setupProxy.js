const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api1",
    createProxyMiddleware({
      target: "https://www.koreaexim.go.kr/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "site/program/financial/exchangeJSON", // '/api1'을 '/site/program/financial'로 대체
      },
    })
  );

  app.use(
    "/api2",
    createProxyMiddleware({
      target: "https://apis.data.go.kr",
      changeOrigin: true,
      pathRewrite: {
        "^/api2": "/B551177/StatusOfParking", // '/api2'을 '/B551177/StatusOfParking'로 대체
      },
    })
  );
};
