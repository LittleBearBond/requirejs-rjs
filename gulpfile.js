"use strict";
/**
 * author           xj
 * @date            2016-01-18 15:41:30
 * @email           littlebearbond@qq.com
 * @description
 * https://github.com/phated/requirejs-example-gulpfile
 * http://www.cnblogs.com/lhb25/p/requirejs-ptimizer-using.html
 * http://nomospace.com/posts/r.js-example.build.js.html
 */
const PROJECT_SRC = "project/";

let gulp = require("gulp");
// let rjs = require('requirejs');
let rjs = require('./gulp-tools/r');
let getModulesName = require("./gulp-tools/get-modules-name");

let projectName = 'm-test';
let version = 1;
let versionPath = '/' + version + '.x';
let distPath = 'dist/project/' + projectName + versionPath;
let projectPath = PROJECT_SRC + projectName + versionPath;

let modulesName = getModulesName(projectName + versionPath, false);
console.log(modulesName)
gulp.task('build', function(cb) {
    if (!modulesName || !modulesName.length) {
        console.log('modules is null');
        return;
    }
    let startTime = +new Date;
    rjs.optimize({
        //"appDir": projectPath,
        "baseUrl": projectPath, // projectPath, // 基础路径
        "dir": distPath, // 目标路径
        "optimize": "uglify", // js优化方式
        "optimizeCss": "standard", // CSS优化方式
        "modules": modulesName,
        "stubModules": ["text", "normalize"], // 不需要引入的插件文件
        "mainConfigFile": "./framework/requirejs-config.js", // 主配置文件
        "preserveLicenseComments": false, // 是否删除源文件的注释，默认为保留
        // 在 RequireJS 2.0.2 中，输出目录的所有资源会在 build 前被删除
        // 值为 true 时 rebuild 更快，但某些特殊情景下可能会出现无法预料的异常
        // "keepBuildDir": true,
        "removeCombined": true, // 删除之前压缩合并的文件，默认不删除
        // 忽略所有readme以及h5文件夹下所有资源
        //
        "fileExclusionRegExp": /^\.|readme|node_modules|gulpfile|^common|^lib|^dist|^gulp|^framework|^demos/i,
        onBuildRead: function(moduleName, path, contents) {
            // console.log(moduleName)
            return contents;
        },
        /*// 在每个文件模块被写入时的操作函数
        onBuildWrite: function(moduleName, path, contents) {
            return contents.replace(/bar/g, 'foo');
        },*/
    }, function(buildResponse) {
        console.log('------------------build responseEnd--------------------');
        console.log('耗时：' + (+new Date - startTime));
        cb();
    }, function(err) {
        console.error(err)
        cb();
    });
});

gulp.task('default', ['build']);
