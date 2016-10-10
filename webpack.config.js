const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

var styleBundleName = 'style.css';

const htmlPluginConfig = {
    // filename: './src/index.html',
    // inject: false,
};

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: "bundle.js",
    },

    context: __dirname,

    // Enable sourcemaps for debugging webpack's output.
    devtool: "#source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: "autocss!ts-loader"
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!sass?sourceMap'),
            },
            {
                test: /\.(png|svg|gif|woff2|woff|ttf)$/, loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/, loader: "file-loader"
            },
        ],


        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            // { test: /\.js$/, loader: "source-map-loader" }
        ],
    },

    postcss: function () {
        return autoprefixer;
    },

    autoCssLoader: {
        syntax: 'scss',
        excludes: [
            require('autocss-loader/bootstrap-classnames')
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