/* @grunt-build */
define('a',[],function() {
    return {
        name: 'a',
        log: function() {
            console.log('a');
        }
    }
});

/* @grunt-build */
define('c',['require','exports','module'],function(require, exports, module) {
    return {
        add: function() {
            return Array.prototype.slice.call(arguments).reduce(function(start, curr) {
                return curr + start;
            }, 0);
        },
        'name':'c'
    }
});

/* @grunt-build */
define('b',['require', 'a', 'c'], function(require, a, c) {
    // var d = require('./d.js');
    // console.log(jquery)
    return {
        name: 'b',
        log: function() {
            console.log.apply(console, Array.prototype.slice.call(arguments))
        }
    }
});

/* @grunt-build */
/**
 * author           xj
 * @date            2016-01-18 16:23:02
 * @email           568915669@qq.com
 * @description
 */
define('page1/page',['require','exports','module','a','b'],(require, exports, module) => {
    var a = require('a');
    var b = require('b');
    console.log(a, b)
    return function(args) {
        console.log(args)
    };
});

