define("common/fix/fix",["require","exports","module"],function(e,t,n){return console.log("fix"),function(e){console.log(e)}}),define("common/common",["require","exports","module"],function(e,t,n){return console.log("common"),function(){console.log("common")}}),define("modules/page1/js/a",["require","exports","module"],function(e,t,n){return{name:"a",log:function(){console.log("a")}}}),define("normalize",{}),define("css",[],function(){if(typeof window=="undefined")return{load:function(e,t,n){n()}};var e=document.getElementsByTagName("head")[0],t=window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/)||0,n=!1,r=!0;t[1]||t[7]?n=parseInt(t[1])<6||parseInt(t[7])<=9:t[2]||t[8]?r=!1:t[4]&&(n=parseInt(t[4])<18);var i={};i.pluginBuilder="./css-builder";var s,o,u=function(){s=document.createElement("style"),e.appendChild(s),o=s.styleSheet||s.sheet},a=0,f=[],l,c=function(e){o.addImport(e),s.onload=function(){h()},a++,a==31&&(u(),a=0)},h=function(){l();var e=f.shift();if(!e){l=null;return}l=e[1],c(e[0])},p=function(e,t){(!o||!o.addImport)&&u();if(o&&o.addImport)l?f.push([e,t]):(c(e),l=t);else{s.textContent='@import "'+e+'";';var n=setInterval(function(){try{s.sheet.cssRules,clearInterval(n),t()}catch(e){}},10)}},d=function(t,n){var i=document.createElement("link");i.type="text/css",i.rel="stylesheet";if(r)i.onload=function(){i.onload=function(){},setTimeout(n,7)};else var s=setInterval(function(){for(var e=0;e<document.styleSheets.length;e++){var t=document.styleSheets[e];if(t.href==i.href)return clearInterval(s),n()}},10);i.href=t,e.appendChild(i)};return i.normalize=function(e,t){return e.substr(e.length-4,4)==".css"&&(e=e.substr(0,e.length-4)),t(e)},i.load=function(e,t,r,i){(n?p:d)(t.toUrl(e+".css"),r)},i}),define("css!modules/page1/css/test",[],function(){}),define("modules/page1/js/b",["require","exports","module","./a","css!./../css/test"],function(e,t,n){var r=e("./a"),r=e("css!./../css/test");return{name:"b",log:function(){console.log.apply(console,Array.prototype.slice.call(arguments))}}}),define("text",{load:function(e){throw new Error("Dynamic load not allowed: "+e)}}),define("text!modules/page1/tpl/dialog-login.html",[],function(){return'<div id="main">\n    test\n    <p>sdfdsfjdsjfj</p>\n</div>\n'}),define("modules/page1/init",["require","exports","module","./../../common/fix/fix","./../../common/common","./js/b","text!./tpl/dialog-login.html"],function(e,t,n){e("./../../common/fix/fix"),e("./../../common/common");var r=e("./js/b"),i=e("text!./tpl/dialog-login.html");return function(e){console.log(r,i),$("body").append(i),console.log("-------------------init-------------------")}}),require.config({baseUrl:"/project/m-test/1.x","modules/page1/init":"modules/page1/init.js"}),require(["modules/page1/init"],function(e){e()}),define("config",function(){}),function(e){var t=document,n="appendChild",r="styleSheet",i=t.createElement("style");i.type="text/css",t.getElementsByTagName("head")[0][n](i),i[r]?i[r].cssText=e:i[n](t.createTextNode(e))}("#main{font-size:25px;height:200px;background:#ccc}#main p{color:red}");