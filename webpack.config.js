const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new WorkboxWebpackPlugin.InjectManifest({
            swSrc: './src/sw.js',
            swDest: 'sw.js'
        })
        // new ServiceWorkerWebpackPlugin({
        //     entry: path.join(__dirname, 'src/sw.js'),
        //   }),
    ]
};