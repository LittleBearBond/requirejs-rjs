/**
 * config require
 */
require.config({
    baseUrl: "/project/m-test/1.x"
});

require(['modules/page1/init'], function(init) {
    init();
})
