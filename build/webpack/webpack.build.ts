import baseConfig from './webpack.base';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';

export default webpackMerge(baseConfig, {
    mode: 'production',
    devtool: false
} as webpack.Configuration);
