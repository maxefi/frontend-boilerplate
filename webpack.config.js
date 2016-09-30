var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var styleBundleName = 'style.css';

const htmlPluginConfig = {
    // filename: './src/index.html',
    // inject: false,
};

module.exports = {
    entry: __dirname + "/src/index.tsx",
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap&modules&&localIdentName=[local]-[hash:base64:2]!sass?sourceMap'),
            }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            // { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        new ExtractTextPlugin(styleBundleName),
        new HtmlWebpackPlugin(htmlPluginConfig),
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
};