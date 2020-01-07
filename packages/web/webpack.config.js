const webpackMerge = require("webpack-merge")
const { resolve } = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

const projectRoot = resolve(__dirname)
const sourceDirectory = resolve(projectRoot, "src")
const publicDirectory = resolve(projectRoot, "public")
const outputDirectory = resolve(projectRoot, "dist")
const htmlTemplateFile = resolve(publicDirectory, "index.html")
const tsconfigPath = resolve(projectRoot, "tsconfig.json")

const babelRule = {
    test: /\.(js|tsx?)$/,
    use: "babel-loader?compact=false"
}

/** @type {import('webpack').Configuration} */
const baseConfig = {
    mode: "none",

    entry: ["babel-polyfill", resolve(sourceDirectory, "index.tsx")],
    output: {
        filename: "js/[name].js",
        path: outputDirectory,
        publicPath: "/"
    },

    module: {
        rules: [babelRule]
    },

    resolve: {
        extensions: [".js", ".ts", ".tsx", ".css"]
    },

    plugins: [
        new CopyWebpackPlugin([
            {
                from: publicDirectory,
                ignore: [htmlTemplateFile]
            }
        ]),
        new CleanWebpackPlugin({
            verbose: false
        }),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: tsconfigPath
        })
    ],

    stats: {
        children: false,
        entrypoints: false,
        modules: false
    }
}

/** @type {import('webpack').Configuration} */
const devConfig = {
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            template: htmlTemplateFile,
            chunksSortMode: "dependency"
        })
    ],
    devtool: "inline-source-map",

    // @ts-ignore idk how to fix this...
    devServer: {
        hot: false,
        historyApiFallback: true
    }
}

/** @type {import('webpack').Configuration} */
const prodConfig = {
    mode: "production",

    optimization: {
        minimize: true,
        nodeEnv: "production"
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: htmlTemplateFile,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true
        }),
        new HtmlWebpackInlineSourcePlugin()
    ],

    performance: {
        maxAssetSize: 1000 * 500, // 500KB
        // we only care about the size of compressed files
        assetFilter: filename => filename.endsWith(".br")
    },

    devtool: "source-map"
}

function getFinalConfig() {
    if (process.env.CI) {
        console.info("Running CI config")
        return baseConfig
    }

    if (process.env.NODE_ENV === "production") {
        console.info("Running production config")
        return webpackMerge(baseConfig, prodConfig)
    }

    console.info("Running development config")
    return webpackMerge(baseConfig, devConfig)
}

console.log("running webpack")

module.exports = getFinalConfig()
