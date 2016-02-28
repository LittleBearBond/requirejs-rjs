/**
 * config require
 */
require.config({
    baseUrl: "/project/m-test/1.x",
    waitSeconds: 30,
    paths: {
        "text": "/lib/requirejs/require-text-2.0.14",
        "css-builder": "/lib/requirejs/css-builder",
        "normalize": "/lib/requirejs/normalize",
        "css": "/lib/requirejs/require-css-0.18"
    },
    shim: {

    },
    config: {

    }
});
require(['modules/page1/init'], function(init) {
    init();
})
