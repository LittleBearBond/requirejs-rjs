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
    var list = fs.readdirSync(dir);
    var index = 0;

    list = list.map(function(val) {
        return path.join(dir, val);
    });

    (function next() {
        var fullPath = list[index++];
        if (!fullPath) {
            return readFiles;
        }

        var stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            readFiles = readFiles.concat(readDir(fullPath, filter));
            next();
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
    }());
    return readFiles;
}
module.exports = readDir;
