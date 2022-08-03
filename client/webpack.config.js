const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
            {
                test: [/\.(js)$/, /\.(jsx)$/],
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.scss'],
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js',
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, './public/index.html')
        }),
    ],
};