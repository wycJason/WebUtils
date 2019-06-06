function Scroll(){}
Scroll.prototype.upScroll=function(dom,_h,interval){var dom=document.getElementById(dom);var timer=setTimeout(function(){var _field=dom.firstElementChild;_field.style.marginTop=_h;clearTimeout(timer);},1000)
setInterval(function(){var _field=dom.firstElementChild;_field.style.marginTop="0px";dom.appendChild(_field);var _field=dom.firstElementChild
_field.style.marginTop=_h;},interval)}
var myScroll=new Scroll();