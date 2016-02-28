/**
 * author           xj
 * @date            2016-02-28 15:06:31
 * @email           littlebearbond@qq.com
 * @description
 */
"use strict";
var path = require('path');
var fs = require('fs');
var files = [];
var readDir = (dir, filter, done) => {
    var readFiles = [];
    fs.readdir(dir, function(err, list) {
        if (err) {
            return done(null, readFiles);
        }
        var index = 0;

        list = list.map(function(val) {
            return path.join(dir, val);
        });

        (function next() {
            var fullPath = list[index++];
            if (!fullPath) {
                return done(null, readFiles);
            }

            fs.stat(fullPath, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    readDir(fullPath, filter, function(err, res) {
                        readFiles = readFiles.concat(res);
                        next();
                    });
                    return;
                }
                var fileInfo = {
                    fullPath: fullPath,
                    fileName: path.basename(fullPath),
                    size: stat.size
                };
                if (typeof filter === 'function' && filter(fullPath) === true) {
                    readFiles.push(fileInfo);
                } else {
                    path.extname(fullPath) === '.js' && readFiles.push(fileInfo);
                }
                next();
            });
        }());
    });
}


module.exports = function(dir, filter) {
    return new Promise(function(resolve, reject) {
        readDir(dir, filter, function(err, result) {
            err ? reject(err) : resolve(result);
        });
    });
};
