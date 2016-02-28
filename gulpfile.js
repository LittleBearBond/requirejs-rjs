/* @grunt-build */
/**
 * author           xj
 * @date            2016-01-18 15:41:30
 * @email           568915669@qq.com
 * @description
 * https://github.com/phated/requirejs-example-gulpfile
 */
var gulp = require("gulp");
var rjs = require('requirejs');

gulp.task('build', function(cb) {
    rjs.optimize({
        //appDir: './js',
        dir: './dist/js',
        baseUrl: 'js',
        paths: {
            'jquery': '../lib/jquery-2.1.4',
            'a': 'a',
            'b': 'b',
            'c': 'c'
        },
        modules: [
            //First set up the common build layer.
            {
                //module names are relative to baseUrl
                name: 'common',
                //List common dependencies here. Only need to list
                //top level dependencies, "include" will find
                //nested dependencies.
                include: [
                    'jquery'
                ]
            },
            //Now set up a build layer for each page, but exclude
            //the common one. "exclude" will exclude nested
            //the nested, built dependencies from "common". Any
            //"exclude" that includes built modules should be
            //listed before the build layer that wants to exclude it.
            //"include" the appropriate "app/main*" module since by default
            //it will not get added to the build since it is loaded by a nested
            //require in the page*.js files.
            {
                //module names are relative to baseUrl/paths config
                name: 'page1/page',
                include: ['a', 'c']/*,
                exclude: ['common']*/
            },

            {
                //module names are relative to baseUrl
                name: 'page2/page',
                include: ['b']/*,
                exclude: ['common']*/
            }

        ]
    }, function(buildResponse) {
        // console.log('build response', buildResponse);
        cb();
    }, cb);
});

gulp.task('default', ['build']);
