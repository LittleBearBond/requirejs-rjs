/* @grunt-build */

/**
 * tab切换
 */

define(function(require, exports, module) {
	var emptyFunc = function() {},
		defaults = {
			tabs: '.jp-tabs', //tab标签的ul
			content: '.jp-tab-content', //内容容器
			currClassName: 'curr',
			currContentCls: '', //当前你内容的class
			toggle: false, //点击当前tab是否收起内容
			beforeSwitch: emptyFunc,
			afterSwitch: emptyFunc,
			delegate: false
		};

	var tabSwitch = function(opt) {
		var options = $.extend({}, defaults, opt);

		var $tabsWrap = $(options.tabs),
			$tabs = $tabsWrap.find('li'),
			$contents = $(options.content),
			switchFn = function() {
				var $this = $(this),
					idx = $tabs.index($this),
					beforeIdx = $tabsWrap.find('.' + options.currClassName).index();

				if (idx === beforeIdx) {
					if (options.toggle) {
						$this.removeClass(options.currClassName);
						$contents.hide();
						options.afterSwitch(beforeIdx, idx, $contents.eq(idx));
					}
					return;
				}

				if (options.beforeSwitch(beforeIdx, idx, $contents.eq(idx)) === false) {
					return;
				}

				$tabs.removeClass(options.currClassName);
				$this.addClass(options.currClassName);
				$contents.removeClass(options.currContentCls).hide().eq(idx).show().addClass(options.currContentCls);

				options.afterSwitch(beforeIdx, idx, $contents.eq(idx));
			};

		options.delegate ?
			$tabsWrap.on('click', 'li', switchFn) : //事件代理
			$tabs.on('click', switchFn);
	};

	return tabSwitch;
});
