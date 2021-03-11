import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";

const files = ['index'];

module.exports = {
    entry: Object.fromEntries(files.map(file => [file, `./src/js/${file}.js`])),

    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/[name].bundle.js'
    },

    plugins: [
        ... files.map(file => new HtmlWebpackPlugin({
            filename: `${file}.html`,
            title: file.toUpperCase(),
            template: path.resolve(__dirname, `./src/${file}.html`),
            chunks: [file]
        }))
    ],

    devtool: 'source-map',
    mode: 'development',

    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        port: 3000,
        open: true
    }
};
