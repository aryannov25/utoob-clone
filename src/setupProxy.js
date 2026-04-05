const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/youtube",
    createProxyMiddleware({
      target: "https://youtube.googleapis.com",
      changeOrigin: true,
      pathRewrite: { "^/api/youtube": "/youtube/v3" },
      onProxyReq: (proxyReq) => {
        const sep = proxyReq.path.includes("?") ? "&" : "?";
        proxyReq.path += `${sep}key=${process.env.YOUTUBE_API_KEY}`;
      },
    })
  );

  app.use(
    "/api/suggestions",
    createProxyMiddleware({
      target: "https://clients1.google.com",
      changeOrigin: true,
      pathRewrite: { "^/api/suggestions": "/complete/search" },
      onProxyReq: (proxyReq) => {
        const sep = proxyReq.path.includes("?") ? "&" : "?";
        proxyReq.path += `${sep}client=firefox&ds=yt`;
      },
    })
  );
};
