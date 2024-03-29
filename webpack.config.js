//Все правила прописывают в конфигурационном файле «Вебпака»: webpack.config.js:
const path = require('path'); // подключаем path к конфигу вебпак, ссылка на текущую папку __dirname и относительный путь к точке выхода
//path: './dist/',
const HtmlWebpackPlugin = require('html-webpack-plugin'); // плагин HtmlWebpackPlugin, обработка HTML
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // плагин CleanWebpackPlugin, удаляет содержимое папки dist при новой сборке. 
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // mini-css-extract-plugin научите «Вебпак» обрабатывать css-файлы
const WebpackNotifierPlugin = require('webpack-notifier');
// module.exports — это синтаксис экспорта в Node.js 
module.exports = {
  entry: {
    main: './src/pages/index.js' // указали первое место, куда заглянет webpack, — файл index.js в папке src
  },
  output: { // указали в какой файл будет собираться весь js и дали ему имя 
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
    strictModuleExceptionHandling: true
  },
  mode: 'development', // добавили режим разработчика
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [ // rules —  правила для обработки js, html и других файлов
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      // добавили правило для обработки файлов - шрифты
      {
				test: /\.(woff|woff2|eot|tf|otf)$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name].[hash][ext]'
				}
			},
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource', //позволяет переносить исходные файлы в конечную сборку в том же формате
        generator: {
					filename: 'images/[name].[hash][ext]'
				}
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          // добавьте объект options
          options: { importLoaders: 1 }
        },
          // Добавьте postcss-loader
          'postcss-loader']
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // использовали плагин CleanWebpackPlugin
    new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
    new WebpackNotifierPlugin(),
  ],
};