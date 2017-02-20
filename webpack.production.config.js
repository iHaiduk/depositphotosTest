const path = require('path');
const webpack = require('webpack');

const config = {
    entry: path.resolve(__dirname, "client", 'index.js'), // string | object | array
    // Here the application starts executing
    // and webpack starts bundling

    output: {
        // options related to how webpack emits results

        path: path.resolve(__dirname, "src", "public", "assets"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)

        filename: "bundle.js", // string
        // the filename template for entry chunks
        sourceMapFilename: '[name].map'

    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                eslint: {
                    configFile: path.join(__dirname, '.eslintrc')
                }
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
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
