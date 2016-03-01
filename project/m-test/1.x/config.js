/**
 * config require
 */
require.config({
    baseUrl: "/project/m-test/1.x",
    'modules/page1/init': "modules/page1/init.js"
});

require(['modules/page1/init'], function(init) {
    init();
});
