(function(e,t){"use strict";typeof define=="function"&&define.amd?define(t):e.slidePage=t(e.$)})(window,function(e){function t(t,n){return n=e.extend({},r,n||{}),this.opts=n,this.wrapEl=t.get(0),this.$el=e(a(t.get(0))[0]),this.el=this.$el.get(0),this.els=a(this.$el.get(0)),n.round&&(this.$el.append(this.els[0].cloneNode(!0)).prepend(this.els[this.els.length-1].cloneNode(!0)),this.els=a(this.$el.get(0))),this.elCount=this.els.length,this.wh=this.getWidthOrHeight(),this.elCount<=1?null:(this.disX=0,this.px=0,this.py=0,this.allowMoveDown=!0,this.dis=n.dis,this.moving=!1,this.timmer=null,this.init().initEvent().initsetTimeout())}var n=function(){},r={touchTarget:"",time:3e3,sepTime:500,dis:30,current:0,transitionEnd:n,isAutoPlay:!1,round:!0,horizontal:!0,endCallBack:n,startCallBack:n,beforeInit:n,isStartRebound:!1,isEndRebound:!1,lastPageCallBack:n,totalPage:100,inClass:"in"},i=function(e,t,n){if(e==null)return;var r=Array.prototype.forEach;if(r&&e.forEach===r)e.forEach(t,n);else if(e.length===+e.length)for(var i=0,s=e.length;i<s;i++)if(t.call(n,e[i],i,e)===!1)break},s=function(){var e=document.createElement("div"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var n in t)if(e.style[n]!==undefined)return e=null,t[n]}(),o=function(e,t,n){var r=e.style;r.webkitTransform="translate3d("+t+"px,0,0)",r.msTransform=r.MozTransform=r.OTransform="translateX("+t+"px)"},u=function(e,t,n){var r=e.style;r.webkitTransform="translate3d(0,"+t+"px,0)",r.msTransform=r.MozTransform=r.OTransform="translateY("+t+"px)"},a=function(e){var t=[],n=e.firstElementChild,r=n&&n.nextElementSibling;n.nodeType===1&&n.nodeName==="DIV"&&t.push(n);while(r)r.nodeType===1&&r.nodeName==="DIV"&&t.push(r),r=r.nextElementSibling;return t},f=function(){var e=arguments,t=e[0],n=e.length,r;for(var i=1;i<n;i++){r=e[i];for(var s in r)r.hasOwnProperty(s)&&(t[s]=r[s])}return t};return f(t.prototype,{constructor:t,init:function(){var t=this.opts;return t.beforeInit&&t.beforeInit.call(this),i(this.els,function(e,n){e.index=n,e.style.position="relative",t.horizontal===!0&&(e.style["float"]="left")}),this.resize(),this.el.style.webkitTransform="translate3d(0,0,0)",e(this.els).eq(t.current).addClass(t.inClass),this},resize:function(){var e=this;this.els=a(this.$el.get(0)),this.elCount=this.els.length,i(this.els,function(t,n){e.opts.horizontal?t.style.width=e.wh+"px":t.style.height=e.wh+"px"}),this.el.style[e.opts.horizontal?"width":"height"]=this.els.length*this.wh+"px";var t=this.getCurrentIndex();return t&&(this.translate(this.el,-this.wh*t,0),this.setData(-this.wh*t)),this},initEvent:function(){var e=this,t=this.opts.current,n=-this.wh*(t|0),r=this.opts.touchTarget||e.el;return"resize orientationchange".split(" ").forEach(function(t){window.addEventListener(t,function(){e.wh=e.getWidthOrHeight(),e.resize()})}),this.opts.round&&(n-=this.wh),this.translate(this.el,n,0),this.setData(n),"touchstart touchmove touchend touchcancel".split(" ").forEach(function(t){r.addEventListener(t,e[t].bind(e),!1)}),this},touchstart:function(e){if(this.moving)return this.startMoving=!0,this;this.startMoving=!1;var t=e.touches[0];return this.px=t.pageX,this.py=t.pageY,this},touchmove:function(e){e.preventDefault(),e.stopPropagation();if(this.moving||this.startMoving)return this;clearTimeout(this.timmer);var t=e.touches[0],n=t.pageX,r=t.pageY,i,s=this.getData(),o=this.getCurrentIndex();i=this.opts.horizontal?n-this.px:r-this.py,this.disX=i;var u,a=this.opts.totalPage===this.elCount&&i<0,f=o===this.elCount-1&&i<0;if(!this.opts.isStartRebound&&o===0&&i>0)return;if(!this.opts.isEndRebound&&a&&f){this.opts.lastPageCallBack&&this.opts.lastPageCallBack.call(this);return}return this.el.classList.add("moving"),u=i+s,this.translate(this.el,u,0),f&&this.opts.endCallBack.call(this,i),this},touchend:function(e){if(this.startMoving||this.moving)return this.startMoving=!1,this;clearTimeout(this.timmer);var t=this.disX,n=this.getCurrentIndex(),r=this.opts.totalPage===this.elCount&&t<0,i=n===this.elCount-1&&t<0;if(!this.opts.isStartRebound&&n===0&&t>0)return;if(!this.opts.isEndRebound&&r&&i)return;return this.el.classList.remove("moving"),this.moving=!0,this.move(),this},touchcancel:function(){return this.moving=!0,this.move(),this},initsetTimeout:function(){var e=this;return e.opts.isAutoPlay!==!0?e:(clearTimeout(this.timmer),e.timmer=setTimeout(function(){e.moving||e.setTimeoutMove()},e.opts.time),e)},setTimeoutMove:function(){var e=this;this.moving=!0,setTimeout(function(){var t=e.getCurrentIndex(),n=-(t+=1)*e.wh;n=!e.opts.round&&t===e.elCount?0:n,e.setData(n),e.setTransform(e.el,n)},0)},move:function(){clearTimeout(this.timmer);var e=this.getData(),t=this.getCurrentIndex();if(Math.abs(this.disX)>10){var n=this;this.el.classList.add("touchmovend"),setTimeout(function(){n.el.classList.remove("touchmovend")},300)}return Math.abs(this.disX)<this.opts.dis?(this.resetLastPos(),this):!this.opts.round&&this.disX>0&&t==0?(this.resetLastPos(),this):!this.opts.round&&this.disX<0&&t==this.elCount-1?(this.resetLastPos(),this):(e=(e/this.wh|0)*this.wh,e=this.disX>0?e+this.wh:e-this.wh,this.setData(e),this.setTransform(this.el,e),this.disX=0,this)},moveEnd:function(){this.moving=!1,this.opts.transitionEnd.call(this),this.initsetTimeout(),this.resetPos(),this.handleClass()},setTransform:function(e,t,n){n=typeof n=="undefined"?this.opts.sepTime:0,this.translate(e,t,n);var r=this,i=!1,o=s,u=function(e){if(typeof e!="undefined"){if(e.target!==e.currentTarget)return;e.target.removeEventListener(o,u)}else this.removeEventListener(o,u);i=!0,r.moveEnd&&r.moveEnd.call(r)};return n>0&&(e.addEventListener(o,u,!1),setTimeout(function(){if(i)return;u.call(e)},n+25)),e},setData:function(e){this.$el.data({translate:e,currIndex:Math.abs(e/this.wh)})},getData:function(e){return this.$el.data(e||"translate")},getCurrentIndex:function(){return Math.floor(Math.abs(this.getData()/this.wh))},resetPos:function(){var e=this.getCurrentIndex(),t;this.opts.round?e==0?(t=-this.wh*(this.elCount-2),this.translate(this.el,t,0),this.setData(t)):e==this.elCount-1&&(this.translate(this.el,-this.wh,0),this.setData(-this.wh)):e==0?this.setData(0):e==this.elCount-1&&this.setData(-this.wh*(this.elCount-1))},resetLastPos:function(){var e=this.getData();this.setTransform(this.el,e),this.initsetTimeout(),this.moving=!1,this.getCurrentIndex()===this.elCount-1&&this.opts.endCallBack.call(this,0,!0)},handleClass:function(){var e=this.opts.inClass,t=this.getCurrentIndex();i(this.els,function(t){t.classList.remove(e)}),this.els[t]&&this.els[t].classList.add(e)},next:function(){this.disX=-(this.opts.dis+10),this.move()},pre:function(){this.disX=this.opts.dis+10,this.move()},translate:function(e,t,n){var r=e&&e.style;if(!r)return;r.webkitTransitionDuration=r.MozTransitionDuration=r.msTransitionDuration=r.OTransitionDuration=r.transitionDuration=n+"ms",this.opts.horizontal?o(e,t,n):u(e,t,n)},getWidthOrHeight:function(){return this.opts.horizontal?this.wrapEl.getBoundingClientRect().width||this.wrapEl.offsetWidth||window.innerWidth:this.wrapEl.getBoundingClientRect().height||this.wrapEl.offsetHeight||window.innerHeight}}),t});