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
        publicPath: "http://localhost:3002/",
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
            name: "core",
            filename: "remoteEntry.js",
            remotes: {},
            exposes: {
                "./Core": "./src/index",
            },
            shared: {
                ...deps,
            },
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3002,
    },
};
