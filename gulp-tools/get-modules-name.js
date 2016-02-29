"use strict";
/**
 * author           xj
 * @date            2016-02-28 17:30:03
 * @email           littlebearbond@qq.com
 * @description
 */

let getfiles = require("./scan-files");
const REG_JS = /\.js$/;

module.exports = projectName => {
    let reg = new RegExp('project\/' + projectName + '\/\\d\.x\/');
    return getfiles("./project/" + projectName).map(function(val) {
        return {
            name: val.fullPath.replace(REG_JS, '').replace(reg, '')
        };
    });
};
