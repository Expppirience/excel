// Env
const path = require("path");

// Plugins
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = (process.env.NODE_ENV = "production");
const isDev = !isProd;

// Functions

const filename = (ext) =>
  isDev ? `bundle.${ext}` : `bundle.[fullhash].${ext}`;

const jsLoaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  ];
  isDev ? loaders.push("eslint-loader") : "";
};

// Exports
module.exports = {
  context: path.resolve(__dirname, "src"), // Чтобы не перемешивать файлы проекта и файлы конфигурации создается поле context, куда передается путь до папки и исходниками. __dirname - абсолютный путь до папки проекта, "src" - папка с исходниками внутри проекта. То есть далее можно не указывать поля source для плагинов, так как все будет выполняться в этом контексте
  mode: "development", // Режим проекта
  entry: ["@babel/polyfill", "./index.js"], // Файл, с которого все начинается
  output: {
    // То куда, будет возвращаен сбилженый результат работы
    filename: "bundle.[fullhash].js", // [hash] добавляется для того, чтобы избежать проблемы с кешированием
    path: path.resolve(__dirname, "dist"), // path.resolve() - возвращает строчку с абсолютным путем
  },
  resolve: {
    extensions: [".js"], // Позволяет не писать .js в импорте после названия файла
    // import '../../../../core/Components => import @core/Component
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@core": path.resolve(__dirname, "src/core"),
    },
  },
  devtool: isDev ? "source-map" : false, // В девтулзах будет отображаться scss, вместо css
  devServer: {
    port: 4200,
    hot: isDev,
  },
  plugins: [
    // Массив для плагинов
    new CleanWebpackPlugin(), // Плагин, очищающий папку dist, чтобы там всегда была актуальная версия файла
    new HTMLWebpackPlugin({
      template: "index.html", // Шаблон для генерации HTML
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin(
      // Используется для переноса favicon
      {
        patterns: [
          {
            from: path.resolve(__dirname, "src/favicon.ico"),
            to: path.resolve(__dirname, "dist"),
          },
        ],
      }
    ),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ],
  module: {
    // Для корректной работы sass/scss необходимо добавить лоадеры, через которые будет пропущен код
    rules: [
      {
        test: /\.s[ac]ss$/i, // sass/scss
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"], // Код пропускается справа налево, sass-loader => css-loader => MiniCssExtractPlugin.loader
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
};
