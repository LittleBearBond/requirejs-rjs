'use strict';
/**
 * author           xj
 * @date            2016-03-03 10:11:55
 * @email           littlebearbond@qq.com
 * @description
 */
module.exports = () => {
    // 引入 gulp及组件
    let gulpLoadPlugins = require('./load-gulp-plugins')();
    let gutil = gulpLoadPlugins.gutil;

    let handleError = err => {
        let colors = gutil.colors;
        console.log('\n')
        gutil.log(colors.red('Error!'))
        gutil.log('fileName: ' + colors.red(err.fileName))
        gutil.log('lineNumber: ' + colors.red(err.lineNumber))
        gutil.log('message: ' + err.message)
        gutil.log('plugin: ' + colors.yellow(err.plugin))
    };

    return {
        handleError: handleError
    };
};
