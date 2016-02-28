/* @grunt-build */

/*
 * weixin 接口封装
 */

define(function(require, exports, module) {
	var wx = require('http://res.wx.qq.com/open/js/jweixin-1.0.0.js');
	var win = window,
		//简版浅拷贝
		extend = function() {
			var args = arguments,
				o = args[0],
				len = args.length,
				curr;
			for (var j = 1; j < len; j++) {
				curr = args[j];
				for (var i in curr) {
					o[i] = curr[i];
				}
			}
			return o;
		},
		func = 'trigger,cancel,fail,complete,success',
		config = {
			debug: false,
			// timestamp: +new Date(),
			jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
		};

	win.wx = wx;

	var Weixin = {
		myReady: function(r) {
			Weixin.pageOpts = r;

			var opts = extend(config, r.wxConfig || {});

			wx.config(opts);
			wx.ready(Weixin.init);
		}
	};

	extend(Weixin, {
		init: function() {
			try {
				//wo 去 这里是异步的，接口是否有相应都不清楚。
				wx.checkJsApi({
					jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'], // 需要检测的JS接口列表
					success: function(res) {
						// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
						res && res.checkResult && res.checkResult.onMenuShareTimeline && Weixin.initEvent();
					}
				});
			} catch (e) {
				// oldWeixin.initEvent();
			}
		},
		initEvent: function() {
			//初始化，处理页面相关配置项
			Weixin.handlePageSetting();
			Weixin.initShareEvent();
		},
		//初始化接口，传递相关数据
		//改变相关文案，需要从新初始化接口
		initShareEvent: function() {
			//注册相关事件
			'onMenuShareAppMessage,onMenuShareTimeline,onMenuShareQQ,onMenuShareWeibo'.split(',').forEach(function(item) {
				func.split(',').forEach(function(name) {
					Weixin.pageOpts[name] = Weixin.wrapReport(name, item.replace('onMenu', '').replace(/./, function($1) {
						return $1.toLowerCase();
					}));
				});
				//执行拷贝
				wx[item](extend({}, Weixin.pageOpts));
			});
		},
		handlePageSetting: function() {
			//批量隐藏菜单项、批量显示菜单项
			'hideMenuItems,showMenuItems'.split(',').forEach(function(item) {
				Weixin.pageOpts[item] && wx[item]({
					menuList: Weixin.pageOpts[item].menuList || [],
					success: function() {},
				});
			});
			//所有操作 必须按照标准接口名字配置；hideAllNonBaseMenuItem='true'、hideOptionMenu='xx'
			'hideAllNonBaseMenuItem,showAllNonBaseMenuItem,hideOptionMenu,showOptionMenu'.split(',').forEach(function(item) {
				Weixin.pageOpts[item] && typeof wx[item] === 'function' && wx[item]();
			});
		},
		wrapReport: function(name, shareType) {
			return function() {
				Weixin.report.apply(Weixin, [name, shareType].concat([].slice.call(arguments)));
			};
		},
		report: function(name, shareType, res) {
			var fnSuccess = Weixin.pageOpts.fnSuccess;
			if (name === 'success') {
				// Weixin.shareSuccess && Weixin.shareSuccess(shareType);
				fnSuccess && fnSuccess.length && fnSuccess.forEach(function(fn) {
					fn(shareType, name, res);
				});
			}

			'trigger,cancel,fail,complete'.split(',').forEach(function(item) {
				item && name === item && (item = item.replace(/./, function($1) {
					return $1.toUpperCase();
				}));
				typeof Weixin['my' + item] === 'function' && Weixin['my' + item](name, shareType, res);
			});
		},
		myTrigger: function(name, shareType, res) {

		},
		mySuccess: function(name, shareType, res) {

		},
		myCancel: function(name, shareType, res) {

		},
		myFail: function(name, shareType, res) {

		}
	}, window.wx);

	return Weixin;
});