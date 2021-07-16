import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import pkg from '../../package.json';

const srcDirectory = path.resolve(__dirname, '../../src');
const distDirectory = path.resolve(__dirname, '../..', pkg.distDir);
const projectDirectory = path.resolve(__dirname, '../..');

export default {
    entry: {
        polyfill: path.resolve(srcDirectory, 'polyfill.ts'),
        'content-script': path.resolve(srcDirectory, 'content-script/index.ts'),
        background: path.resolve(srcDirectory, 'background/index.ts'),
        options: path.resolve(srcDirectory, 'options/index.ts'),
        popup: path.resolve(srcDirectory, 'popup/index.ts')
    },
    output: {
        filename: '[name]/index.js',
        path: distDirectory
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(srcDirectory, 'manifest.json'),
                    to: distDirectory,
                    force: true
                },
                {
                    from: path.resolve(srcDirectory, 'assets'),
                    to: path.resolve(distDirectory, 'assets'),
                    force: true
                },
                {
                    from: path.resolve(srcDirectory, '_locales'),
                    to: path.resolve(distDirectory, '_locales'),
                    force: true
                },
                {
                    from: path.resolve(
                        projectDirectory,
                        './node_modules/webextension-polyfill/dist/browser-polyfill.min.js'
                    ),
                    to: distDirectory,
                    force: true
                }
            ]
        }),
        new CleanWebpackPlugin({ verbose: true }),
        new HtmlWebpackPlugin({
            template: path.resolve(srcDirectory, 'options/index.html'),
            filename: 'options/index.html',
            chunks: ['polyfill', 'options']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(srcDirectory, 'popup/index.html'),
            filename: 'popup/index.html',
            chunks: ['polyfill', 'popup']
        })
    ]
} as webpack.Configuration;
