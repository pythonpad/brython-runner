const path = require('path');
const webpack = require('webpack');

module.exports = mode => ({
    cache: true,
    mode: 'development',
    entry: {
        'brython-runner.bundle': mode === 'development' ? ['babel-polyfill', './src/browser.js'] : ['./src/browser.js'],
        'core/brython-runner.worker': mode === 'development' ? ['babel-polyfill', './src/core/brython-runner.worker.js'] : ['./src/core/brython-runner.worker.js'],
    },
    output: {
        path: path.join(__dirname, 'lib'),
        publicPath: '/lib/',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [path.resolve(__dirname, 'src')],
                use: ['babel-loader'],
            }
        ],
    },
    plugins: mode === 'development' ? [
        new webpack.HotModuleReplacementPlugin(),
    ] : [],
    devServer: {
        hot: true,
        historyApiFallback: true,
        contentBase: '.',
        publicPath: '/lib/',
    },
});