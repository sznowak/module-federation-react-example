const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');

const deps = require("./package.json").dependencies;
module.exports = {
    entry: "./src/index.js",
    cache: false,
    mode: "development",
    devtool: "source-map",
    optimization: {
        minimize: false,
    },
    output: {
        publicPath: "http://localhost:3003/",
    },
    resolve: {
        extensions: [".jsx", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.jsx?$/,
                loader: require.resolve("babel-loader"),
                options: {
                    presets: [require.resolve("@babel/preset-react")],
                },
            },
        ],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "main-app",
            filename: "remoteEntry.js",
            remotes: {
                core: "core@http://localhost:3002/remoteEntry.js",
                plugin: "plugin@http://localhost:3001/remoteEntry.js",
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3003,
    },
};
