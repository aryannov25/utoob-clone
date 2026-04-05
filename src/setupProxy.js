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
    }),
  );
};
