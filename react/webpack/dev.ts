export default function devTools() {
  return {
    config: {
      devtool: "cheap-module-source-map",
      devServer: {
        historyApiFallback: true,
        port: 8080,
      },
      watch: true,
      mode: "development",
    },
    plugins: [],
  }
}
