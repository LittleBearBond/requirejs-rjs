/**
 * config require
 */
require.config({
    baseUrl: "./"
});
require(['project/m-test/1.x/modules/page1/init'], function(init) {
    init();
});
