/**
 * Created by igor on 19.02.17.
 */

const path = require('path');
const webpack = require('webpack');

const config = {
    //entry: path.resolve(__dirname, "client", 'index.js'), // string | object | array
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080/',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, "client", 'index.js')
    ],
    // Here the application starts executing
    // and webpack starts bundling

    output: {
        // options related to how webpack emits results

        path: path.resolve(__dirname, "src", "assets"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)

        filename: "bundle.js" // string
        // the filename template for entry chunks

    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        hot: true,
        proxy: {
            '*': 'http://0.0.0.0:' + (process.env.PORT || 3000)
        },
        host: '0.0.0.0'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true,
            options: {
                configuration: {
                    devtool: 'inline-source-map'
                },
                eslint: {
                    configFile: path.join(__dirname, '.eslintrc')
                }
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                exclude: /node_modules/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'eslint-loader'
                    }
                ]
            },
            {
                test: /\.js?$/,
                include: [
                    path.join(__dirname, 'client'),
                    path.join(__dirname, 'routes'),
                    path.join(__dirname, 'store'),
                    path.join(__dirname, 'view')
                ],
                exclude: /node_modules/,
                loaders: ['react-hot-loader', 'jsx-loader', 'babel-loader']
            }
        ]
    }
};

module.exports = config;
