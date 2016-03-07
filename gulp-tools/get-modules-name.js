"use strict";
/**
 * author           xj
 * @date            2016-02-28 17:30:03
 * @email           littlebearbond@qq.com
 * @description
 */
let fs = require('fs');
let path = require('path');
let crypto = require('crypto');
let getfiles = require("./scan-files");
// let cacheVersion = require("./cacheVersion");
const REG_JS = /\.js$/;

function md5ify(data, len) {
    return crypto.createHash("md5").update(data).digest("hex").slice(0, len || 8);
}

module.exports = (projectName, isCheck) => {
    let regProjectName = new RegExp('project\/' + projectName + "\/");
    let projectPath = "./project/" + projectName;
    // let versionsMap = cacheVersion.getVersionMap(projectPath)

    let files = getfiles(projectPath, fullPath => {
        try {
            if (path.extname(fullPath) !== '.js') {
                return false;
            }
            return true;
            /*if (isCheck === false) {
                return true;
            }*/
            /*let md5Str = md5ify(fs.readFileSync(fullPath));
            //检查是否发生变化
            if (versionsMap[fullPath] === md5Str) {
                return false;
            }
            //加入缓存
            versionsMap[fullPath] = md5Str
            return true;*/

        } catch (err) {
            return false;
        }

    });
    // cacheVersion.setVersionMap(projectPath, versionsMap);
    return files.map(val => {
        return {
            name: val.fullPath.replace(REG_JS, '').replace(regProjectName, ''), //.replace(/^project\//, '')//.replace(regProjectName, '')
            exclude: ['common/test-module-name'],
            // excludeShallow: ['test-module-name']
        };
    });
};
