var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var wpConfig = require('./webpack.config');

var server = new WebpackDevServer(webpack(wpConfig), {
    publicPath: wpConfig.output.publicPath,
    hot: true,
    historyApiFallback: false,
    proxy: {
        "*": "http://localhost:3000/",
    },
    stats: {
        // minimal logging
        assets: false,
        colors: true,
        // version: false,
        // hash: false,
        // timings: false,
        chunks: false,
        chunkModules: false,
        children: false
    }
});
server.listen(8020);
