var webpack = require('webpack')
var path = require('path')

module.exports = {
  context: __dirname,
  entry:{
    hot:[
  	'webpack-dev-server/client?http://localhost:9090',
  	'webpack/hot/only-dev-server'
  	],
    demo:'./demos/demo.jsx'
  },
  output:{
    path:'dist/',
    filename:'[name].js',
    publicPath:'assets/'
  },
  module:{
    preLoaders: [{
      test: /\.jsx$/,
      exclude: [/node_modules/],
      loader: 'eslint',
    }],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exculde:[/node_modules/],
        loader: 'babel-loader'
      },
      {
          test: /\.css$/,
          loader: 'style!css'
      },
      {
        test: /\.json$/,
        exculde:[/node_modules/],
        loader:'json'
      }
    ]
  },
  devServer:{
      contentBase: '',
      devtool: 'eval',
      hot: true,        //自动刷新
      inline: true,
      port: 8090
  },
  resolve: {
    root: [__dirname, path.resolve(__dirname, "node_modules")],
    extensions: ['', '.js', '.jsx'],
    alias:{
      SvgIcon: 'src/SvgIcon/SvgIcon.jsx',
      MDEditor: 'src/MDEditor/MDEditor.jsx',
    }
  },
  plugins:[
    // react热启动插件
    new webpack.HotModuleReplacementPlugin(),
    // webpack-dev-server插件，可以将错误以在console中输出而不改变页面报错
    new webpack.NoErrorsPlugin()
 ]
}
