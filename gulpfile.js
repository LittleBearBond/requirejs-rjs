"use strict";
/**
 * author           xj
 * @date            2016-01-18 15:41:30
 * @email           littlebearbond@qq.com
 * @description
 */
let gulp = require("gulp");
let gulpPublishProject = require('./gulp-tools/gulp-publish-project');
let fs = require('fs');
let path = require('path');

let proxyFn = fn => {
    return () => {
        let name = gulp.env.name;

        if (!name) {
            console.error('please input: gulp work --name XXX，XXX is projectname');
            return;
        }

        fs.stat(path.join(__dirname, "project/" + name), (err, stats) => {
            if (err) {
                console.error(err)
                return;
            }
            if (!stats.isDirectory()) {
                console.error(name + 'The project has not been created, please check the input');
                return;
            }
            fn(name);
        });
    };
};

gulp.task('publish', proxyFn(name => {
    //初始话
    gulpPublishProject(name);
    //运行发布
    gulp.run('publish-project');
}));
