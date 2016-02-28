/* @grunt-build */
/**
 * author           xj
 * @date            2016-01-18 16:23:02
 * @email           568915669@qq.com
 * @description
 */
define((require, exports, module) => {
    var a = require('a');
    var b = require('b');
    console.log(a, b)
    return function(args) {
        console.log(args)
    };
});
