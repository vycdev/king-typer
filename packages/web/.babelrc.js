// @ts-check
const production = process.env.NODE_ENV === "production"

/** @type {import('@babel/core').TransformOptions} */
const config = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript"
    ],
    plugins: [
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
        [
            "emotion",
            {
                sourceMap: !production
            }
        ]
    ]
}

module.exports = config
