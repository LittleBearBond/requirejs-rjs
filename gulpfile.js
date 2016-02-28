"use strict";
/**
 * author           xj
 * @date            2016-01-18 15:41:30
 * @email           littlebearbond@qq.com
 * @description
 * https://github.com/phated/requirejs-example-gulpfile
 * http://www.cnblogs.com/lhb25/p/requirejs-ptimizer-using.html
 */
const PROJECT_SRC = "./project/";

let gulp = require("gulp");
let rjs = require('requirejs');
let getModulesName = require("./gulp-tools/get-modules-name");

let projectName = 'm-test';
let version = 1;
let versionPath = '/' + version + '.x';
let distPath = 'dist/' + projectName + versionPath;
let projectPath = PROJECT_SRC + projectName + versionPath;

gulp.task('build', function(cb) {
    rjs.optimize({
        "baseUrl": projectPath, // 基础路径
        "dir": distPath, // 目标路径
        "optimize": "uglify", // js优化方式
        //"optimize": "none", // js优化方式
        "optimizeCss": "standard", // CSS优化方式
        "modules": getModulesName(projectName),
        "stubModules": ["text", "normalize"], // 不需要引入的插件文件
        "mainConfigFile": "./framework/requirejs-config.js", // 主配置文件
        "preserveLicenseComments": false, // 是否删除源文件的注释，默认为保留
        "removeCombined": true, // 删除之前压缩合并的文件，默认不删除
        "fileExclusionRegExp": /.*readme/i // 忽略所有readme以及h5文件夹下所有资源
    }, function(buildResponse) {
        // console.log('build response', buildResponse);
        cb();
    }, cb);
});

gulp.task('default', ['build']);
