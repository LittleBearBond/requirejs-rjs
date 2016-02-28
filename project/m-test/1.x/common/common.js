//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
/* @grunt-build */
define(function(require, exports, module) {
    console.log('common');

    return function() {
        console.log('common');
    }
});
