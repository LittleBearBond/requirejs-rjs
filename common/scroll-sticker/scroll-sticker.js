/* @grunt-build */

/**
 * 滑动时固定元素
 */

define(function(require, exports, module){
	$.fn.scrollSticker = function(opt){
		var emptyFn = function(){};

		var defaults = {
				stickClass : 'sticked',  //固定后添加到元素上面的class
				triggerHeight : 100,  //滑动触发高度
				stopHeight : 1000000, //结束高度
				startCallback : emptyFn,  //固定开始时执行的回调
				endCallback: emptyFn  //回到初始位置时执行的回调
			},
			options = $.extend({}, defaults, opt),
			$this = this,
			$win = $(window);

		function scrollHandler(){
			var scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;

			if( scrollHeight >= options.triggerHeight && !$this.hasClass(options.stickClass) ){  //判断样式是为了避免多次执行startCallback
				$this.addClass(options.stickClass);
				options.startCallback();
			}

			if( (scrollHeight < options.triggerHeight || scrollHeight > options.stopHeight) && $this.hasClass(options.stickClass) ){
				$this.removeClass(options.stickClass);
				options.endCallback();
			}
		}

		scrollHandler();

		$win.on('scroll.scrollSticker', scrollHandler);

		return this;
	};
});