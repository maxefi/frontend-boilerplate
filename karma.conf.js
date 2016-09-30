var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var styleBundleName = 'style.css';

const htmlPluginConfig = {
    // filename: './src/index.html',
    // inject: false,
};

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: ['src/specs.ts'],
        preprocessors: {
            'src/spec/main.spec.ts': ['webpack', 'sourcemap'],
        },
        webpack: {
            resolve: {
                extensions: ['', '.js', '.ts', '.tsx']
            },
            module: {
                loaders: [
                    {test: /\.tsx?$/, loader: 'ts-loader'},
                    {
                        test: /\.scss/,
                        loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap&modules&&localIdentName=[local]-[hash:base64:2]!sass?sourceMap'),
                    }
                ]
            },
            stats: {
                colors: true,
                modules: true,
                reasons: true,
                errorDetails: true
            },
            plugins: [
                new ExtractTextPlugin(styleBundleName),
                new HtmlWebpackPlugin(htmlPluginConfig),
            ],
            devtool: 'inline-source-map',
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [],
        singleRun: false,
        concurrency: Infinity
    })
}
