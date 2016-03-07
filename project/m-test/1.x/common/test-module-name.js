/* @grunt-build */
define(function(require, exports, module) {
    console.log('test-moduleName')
    return {
        log: function() {
            console.log(arguments)
        }
    }
});
