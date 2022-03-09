module.exports = {
    assetsDir:        '',
    lintOnSave:       false,
    runtimeCompiler:  true,
    configureWebpack: {
        resolve: {
            symlinks: false,
        },
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: '@import "@/assets/scss/style.scss";'
            }
        }
    }
};
