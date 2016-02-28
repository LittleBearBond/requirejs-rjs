/* @grunt-build */
/**
 * author           xj
 * @date            2016-01-21 10:20:21
 * @email           littlebearbond@qq.com
 * @description 相对路径测试
 */
/* @grunt-build */
define(function(require, exports, module) {
    var a = require('./a');
    a.log();
    return function(args) {
        console.log(args);
    }
});
