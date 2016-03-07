/* @grunt-build */
define(function(require, exports, module) {
    var a = require('./a');
    var asyncTest = require(['./async-c'], function() {
        console.log('asyncTest callback')
    });
    console.log(asyncTest)
    var css = require('css!./../css/test');
    return {
        name: 'b',
        log: function() {
            console.log.apply(console, Array.prototype.slice.call(arguments))
        }
    }
});
