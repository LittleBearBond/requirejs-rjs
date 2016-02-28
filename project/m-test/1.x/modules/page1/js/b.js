/* @grunt-build */
define(function(require, exports, module) {
    var a = require('./a');
    var a = require('css!./../css/test');
    return {
        name: 'b',
        log: function() {
            console.log.apply(console, Array.prototype.slice.call(arguments))
        }
    }
});
