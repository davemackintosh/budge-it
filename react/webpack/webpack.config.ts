import { DefinePlugin, NamedModulesPlugin } from "webpack"

import { resolve } from "path"
import production from "./build"
import dev from "./dev"

const src = resolve(__dirname, "../", "src")
const extraConfig = process.env.NODE_ENV === "production" ? production() : dev()

const alias = {
  "@translations": resolve(src + "/translations"),
  "@src": resolve(src + "/"),
  "@components": resolve(src + "/shared/components"),
  "@lib": resolve(src + "/shared/lib"),
  "@styled": resolve(src + "/shared/theme"),
  "@config": resolve(process.cwd(), "./config.ts"),
  "react-dom": "@hot-loader/react-dom",
}

const webpackConfig = {
  ...extraConfig.config,
  context: src,
  entry: [resolve(src, "index.tsx")],
  output: {
    path: resolve(__dirname, "../dist/"),
    filename: "budge-it.js",
  },
  resolve: {
    alias,
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    modules: [resolve(__dirname, "../", "src"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: "pre",
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg|woff|otf)$/,
        loaders: ["file-loader"],
      },
    ],
  },
  plugins: [
    new NamedModulesPlugin(),
    new DefinePlugin({
      "process.platform": JSON.stringify(process.platform),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.GRAPHS_TOTAL_FF": true,
      "process.env.MONTHLY_BREAKDOWN_FF": true,
    }),
    ...extraConfig.plugins,
  ],
}

module.exports = webpackConfig
