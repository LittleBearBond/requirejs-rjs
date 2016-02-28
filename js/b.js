/* @grunt-build */
define(['require', 'a', 'c'], function(require, a, c) {
    // var d = require('./d.js');
    // console.log(jquery)
    return {
        name: 'b',
        log: function() {
            console.log.apply(console, Array.prototype.slice.call(arguments))
        }
    }
});
