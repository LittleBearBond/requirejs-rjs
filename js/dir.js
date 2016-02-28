/* @grunt-build */
define(function(require, exports, module) {
    console.log('require', 'exports', 'module')
    console.dir(require);
    console.dir(exports);
    console.dir(module);

    exports.name = 123;
    console.log(module.exports === exports); //true

    module.exports = {
        name: 'export'
    };

    console.log(module.exports === exports); //false

    return {
        name: 'exports'
    }
});
