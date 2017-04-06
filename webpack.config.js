//引入需要的模块

const webpack = require('webpack');
const path = require('path');
const config = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.json$/,
                use: [
                    "json-loader"
                ]
            }, 
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                query: {
                    name: 'static/img/[name]-[hash:8].[ext]'
                }
            }
        ]
    }
}
module.exports = config;