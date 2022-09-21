const path = require('path');
const webpack = require('webpack');

const ROOT = path.resolve("./" );
const SRC = path.resolve( ROOT + "/src" );
const DIST = path.resolve( ROOT + "/dist" );
const PUBLIC = path.resolve( ROOT + "/public" );
const NODE_MODULES = path.resolve( ROOT + "/node_modules" );

const mode = process.env.MODE ? process.env.MODE : "development";

console.log("ROOT : " + ROOT);
console.log("SRC : " + SRC);
console.log("DIST : " + DIST);

module.exports = {
    context: ROOT,
    mode,
    entry: {
        "index": path.resolve(SRC,'index.ts'),
        "mvc": path.resolve(SRC,'mvc.ts'),
        "cq": path.resolve(SRC,'cq.ts'),
        "diInject": path.resolve(SRC,'diInject.ts'),
        "diMap": path.resolve(SRC,'diMap.ts'),
        "phaser": path.resolve(SRC,'phaser.ts'),
    },
    output: {
        filename: '[name].bundle.js',
        path: DIST
    },
    devServer: {
        watchFiles: {
            paths: [SRC + '/**/*.ts', PUBLIC + '/**/*'],
            options: {
                usePolling: false,
            }
        },
        port: 8082
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    externals: {
        
    },
    module: {
        rules: [
            /****************
            * PRE-LOADERS
            *****************/
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },
            {
                enforce: 'pre',
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'tslint-loader'
            },

            /****************
            * LOADERS
            *****************/
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __MODE__: mode
        })
    ],
    devtool: 'cheap-module-source-map',
};

