const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
            {
                // Compile the js and jsx files with babel
                test: [/\.js$/, /\.jsx$/],
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                // Compile the scss and css files
                test: [/\.s[ac]ss$/, /\.css$/],
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ]
    },
    resolve: {
        // Extensions that can be accepted
        extensions: ['*', '.js', '.jsx', '.scss', 'css'],
    },
    output: {
        // Package the js into bundle.js in the public directory
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js',
    },
    devServer: {
        // Run the server on port 3000
        port: 3000,
        // Create a proxy for the api
        proxy: {
            '/api': 'http://cpu-service:8080'
        }
    },
    plugins: [
        // Plugin for the project
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, './public/index.html')
        }),
    ],
};