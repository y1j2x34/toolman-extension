import path from 'path';
import baseConfig from './webpack.base';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import { IPluginOptions } from 'webpack-extension-reloader';
const ExtensionReloader = require('webpack-extension-reloader');
const srcDirectory = path.resolve(__dirname, '../../src');

export default webpackMerge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    watch: true,
    watchOptions: {
        ignored: ['node_modules/**']
    },
    plugins: [
        new ExtensionReloader({
            port: 9998,
            entries: {
                contentScript: 'content-script',
                background: 'background',
                options: 'options',
                popup: 'popup'
            },
            reloadPage: true,
            manifest: path.resolve(srcDirectory, 'manifest.json')
        } as IPluginOptions)
    ]
} as webpack.Configuration);
