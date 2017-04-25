module.exports = {
    entry: {
        app: "./app/main.ts"
    },
    output: {
        filename: "./assets/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts"]
    }
};