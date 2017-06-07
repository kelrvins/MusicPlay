const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, './docs'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
                test: /template\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        } //这里可以简单理解为，如果css文件中有import 进来的文件也进行处理
                    }, {
                        loader: 'postcss-loader',
                        options: { // 如果没有options这个选项将会报错 No PostCSS Config found
                            plugins: function (loader) {
                                [
                                    // require('postcss-import')({root: loader.resourcePath}),
                                    require('autoprefixer')() //CSS浏览器兼容
                                    // require('cssnano')()  //压缩css
                                ]
                            }
                        }
                    }]
                })
            }
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            filename: "./index.html",
            template: "./src/template.html",
            inject: 'body' //将js文件插入body文件内
        }),
        new ExtractTextPlugin('[name].css'),
        new CleanWebpackPlugin(
            ['docs'], {
                root: __dirname,
                verbose: true,
                dry: false,
                watch: true
            }
        )
    ]
}