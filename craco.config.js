module.exports = {
    babel: {
        presets: [['@babel/preset-react', {"runtime": "automatic"}]],
        loaderOptions: (babelLoaderOptions, {env, paths}) => {
            return babelLoaderOptions;
        },
    },
    style: {
        css: {
            loaderOptions: () => {
                return {url: false}
            }
        }
    },
    devServer: {
        proxy: {
            '/region': {
                target: 'https://11o06niujd.execute-api.eu-west-1.amazonaws.com/dev',
                changeOrigin: true,
            },
            '/route': {
                target: 'https://11o06niujd.execute-api.eu-west-1.amazonaws.com/dev',
                changeOrigin: true,
            },
            '/health/check': {
                target: 'https://11o06niujd.execute-api.eu-west-1.amazonaws.com/dev',
                changeOrigin: true,
            },
        },
    }
}

