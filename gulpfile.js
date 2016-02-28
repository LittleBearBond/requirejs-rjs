/* @grunt-build */
/**
 * author           xj
 * @date            2016-01-18 15:41:30
 * @email           568915669@qq.com
 * @description
 * https://github.com/phated/requirejs-example-gulpfile
 * http://www.cnblogs.com/lhb25/p/requirejs-ptimizer-using.html
 */
var gulp = require("gulp");
var rjs = require('requirejs');

const PROJECT_SRC = "./project/";
var projectName = 'm-test';
var version = '/' + '1.x';
var dist = 'dist/' + projectName + version;
var projectPath = PROJECT_SRC + projectName + version;

gulp.task('build', function(cb) {
    rjs.optimize({
        "baseUrl": projectPath, // 基础路径
        "dir": dist, // 目标路径
        "optimize": "uglify", // js优化方式
        //"optimize": "none", // js优化方式
        "optimizeCss": "standard", // CSS优化方式
        "modules": [{
            name: 'modules/page1/init'
        }],
        "stubModules": ["text", "normalize"], // 不需要引入的插件文件
        "mainConfigFile": projectPath + "/config.js", // 主配置文件
        "preserveLicenseComments": false, // 是否删除源文件的注释，默认为保留
        "removeCombined": true, // 删除之前压缩合并的文件，默认不删除
        "fileExclusionRegExp": /.*readme/i // 忽略所有readme以及h5文件夹下所有资源
    }, function(buildResponse) {
        // console.log('build response', buildResponse);
        cb();
    }, cb);
});

gulp.task('default', ['build']);
