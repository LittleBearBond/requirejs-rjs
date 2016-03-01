define(function(require, exports, module) {
    //绝对路径
    //绝对路径要加上.js
    require('common/tab-switch/tab-switch');

    //相对于baseurl
    require('./../../common/fix/fix');
    require('./../../common/common');

    //相对当前目录
    var b = require('./js/b');
    var tpl = require('text!./tpl/dialog-login.html');
    return function(arg) {
        console.log(b, tpl)
        $('body').append(tpl)
        console.log('--------------------init--------------------')
    }
});
