/* @grunt-build */
define('test-module-name', function(require, exports, module) {
    return {
        log: function() {
            console.log(arguments)
        }
    }
});
