"use strict";
var fs = require('fs');

function mkdirSync(url, mode, cb) {
    var arr = url.split("/");
    mode = mode || '0755';
    cb = cb || function() {};
    if (arr[0] === ".") { //处理 ./aaa
        arr.shift();
    }
    if (arr[0] == "..") { //处理 ../ddd/d
        arr.splice(0, 2, arr[0] + "/" + arr[1])
    }

    function inner(cur) {
        if (!fs.existsSync(cur)) { //不存在就创建一个
            fs.mkdirSync(cur, mode)
        }
        if (arr.length) {
            inner(cur + "/" + arr.shift());
        } else {
            cb();
        }
    }
    arr.length && inner(arr.shift());
}
let versionFileName = 'version.md5';
/**
 * Get version map
 */
function getVersionMap(path) {
    mkdirSync(path);
    let versionMapPath = path + '/' + versionFileName;
    // map file not exist
    if (!fs.existsSync(versionMapPath)) {
        // create version map file
        fs.openSync(versionMapPath, "w+", function(error, fd) {
            if (error) {
                throw error;
            };
            // close
            fs.closeSync(fd);
        });
        return {};
    } else {
        var content = fs.readFileSync(versionMapPath, "utf-8");
        try {
            return JSON.parse(content);
        } catch (error) {
            return {};
        }
    }
}

/**
 * Set version map
 *
 * @param {Object} content : version content
 */
function setVersionMap(path, content) {
    if (!content) {
        return;
    }
    mkdirSync(path);
    let versionMapPath = path + '/' + versionFileName;
    // update map
    try {
        fs.writeFileSync(versionMapPath, JSON.stringify(content));
    } catch (error) {
        throw error;
    }
}

/**
 * Get version map
 */
exports.getVersionMap = getVersionMap;

/**
 * Set version map
 */
exports.setVersionMap = setVersionMap;
