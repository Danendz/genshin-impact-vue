const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve("src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(glb)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(gltf)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(bin)$/i,
          type: "asset/resource",
        },
      ],
    },
  },
});
