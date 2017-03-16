var webpack = require('webpack');
var path = require("path");
module.exports = {
    entry: [ // for hot loader: WebpackDevServer host and port
        "webpack-dev-server/client?http://localhost:8080",
        // for hot loader: "only" prevents reload on syntax errors
        "webpack/hot/only-dev-server",
        // our appʼs entry point
        "./src/client/index.js"
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, "src"),
                exclude: /node_modules/,
                use: ["react-hot-loader", "babel-loader"]
            }
        ]
    },
    // resolve: {     extensions: ["", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "/public/build"),
        filename: "boundle.js",
        publicPath: "http://localhost:8080/build"
    },
    devServer: {
        contentBase: "./public",
        hot: true,
        host: "localhost",
        proxy: {
            "*": "http://localhost:" + 3000
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}