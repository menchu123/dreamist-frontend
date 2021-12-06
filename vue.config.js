module.exports = {
  lintOnSave: false,
  pages: {
    index: {
      entry: "src/main.ts",
      title: "Dreamist - Dream Journal",
    },
  },
  pwa: {
    name: "Dreamist",
    short_name: "Dreamist",
    themeColor: "#031138",
    msTileColor: "#031138",
    appleMobileWebAppCapable: "yes",

    manifestOptions: {
      name: "Dreamist",
      short_name: "Dreamist",
      display: "standalone",
      background_color: "#031138",
      theme_color: "#031138",
    },
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: new RegExp(process.env.VUE_APP_API_URL),
          handler: "networkFirst",
          options: {
            networkTimeoutSeconds: 20,
            cacheName: "api-cache",
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
      exclude: [/_redirects/],
    },
  },
};
