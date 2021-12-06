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
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "service-worker.js",
      // ...other Workbox options...
      exclude: [/_redirects/],
    },
  },
};
