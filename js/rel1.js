/* @grunt-build */
/**
 * author           xj
 * @date            2016-01-21 10:29:09
 * @email           littlebearbond@qq.com
 * @description
 */
define(function(require, exports, module) {
    var a = require('./a.js');
    a.log();
    return function(args) {
        console.log(args);
    }
});
