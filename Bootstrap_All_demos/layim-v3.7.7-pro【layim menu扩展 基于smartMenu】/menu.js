'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 基于smartMenu.js 智能上下文菜单插件
 * 2011-05-26 v1.0	编写
 * 2011-06-03 v1.1	修复func中this失准问题
 * 2011-10-10 v1.2  修复脚本放在<head>标签中层无法隐藏的问题
 * 2011-10-30 v1.3  修复IE6~7下二级菜单移到第二项隐藏的问题
 * 2016-12-16 v1.4  for layim 修改成为符合Layui插件格式
 * 2018-07-03 v1.5  优化调整,修复bug,新增功能,基于事件委托保证菜单元素运行
 * 
 *
 */
(function (layui, window, factory) {
	if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
		// 支持 CommonJS
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		// 支持 AMD
		define(factory);
	} else if (window.layui && layui.define) {
		//layui加载
		layui.define(['jquery'], function (exports) {
			exports('menu', factory());
		}).link('menu.css');
	} else {
		window.menu = factory();
	}
})(typeof layui == 'undefined' ? null : layui, window, function () {
	var v = '1.5',
		clKey = "smart_menu_",
	    data = {},
		$ = window.$ || window.layui && window.layui.jquery,
		items = { menu: [] },
		menuData = [],
		menucall = {},
		Method = {};
	
	var smartMenu = function (data, options) {//改造数据
		var defaults = {
			rootele:"body",
			ele:"",
			name: "",
			offsetX: 2,
			offsetY: 2,
			textLimit: 6,
			before: $.noop,
			after: $.noop
		};
		var params = $.extend(defaults, options || {});

		var htmlCreateMenu = function (othis,datum) {
			var dataMenu = datum || data, nameMenu = datum ? Math.random().toString() : params.name, htmlMenu = "", htmlCorner = "",isHide="";
			if ($.isArray(dataMenu) && dataMenu.length) {
				htmlMenu = '<div id="smartMenu_' + nameMenu + '" class="' + clKey + 'box">' +
								'<div class="' + clKey + 'body">' +
									'<ul class="' + clKey + 'ul">';

				$.each(dataMenu, function (i, arr) {
					if (i) {
						htmlMenu = htmlMenu + '<li class="' + clKey + 'li_separate">&nbsp;</li>';
					}
					if ($.isArray(arr)) {
						$.each(arr, function (j, obj) {
							var text = obj.text,menuId = obj.menuId , name = obj.name, icon = obj.icon || '', show = obj.show , htmlMenuLi = "", strTitle = "", rand = Math.random().toString().replace(".", ""),hideClass = "";
							if (icon) {
								icon = icon.trim();
							}
							if (text) {
								if (text.length > params.textLimit) {
									text = text.slice(0, params.textLimit) + "…";
									strTitle = ' title="' + obj.text + '"';
								}
								if(!isMenuCondition(othis,show)){//显示条件 
									hideClass = "layui-hide";
								}
								if ($.isArray(obj.child) && obj.child.length) {
									htmlMenuLi = '<li class="layui-icon ' + hideClass + ' ' + clKey + 'li" data-hover="true">' + htmlCreateMenu(null,obj.child) +
										'<a href="javascript:" class="' + clKey + 'a"' + strTitle + ' data-name="' + name + '" menu-id="' + menuId + '"><i class="' + clKey + 'triangle"></i>' + (icon?'<i class="layui-icon '+icon+'" style="font-size: 12px;"></i>':'') + text + '</a>' +
									'</li>';
								} else {
									htmlMenuLi = '<li class="layui-icon ' + hideClass + ' '  + clKey + 'li">' +
										'<a href="javascript:" class="' + clKey + 'a"' + strTitle + ' data-name="' + name + '" menu-id="' + menuId + '">' + (icon?'<i class="layui-icon '+icon+'" style="font-size: 12px;"></i>':'') + text + '</a>' +
									'</li>';
								}

								htmlMenu += htmlMenuLi;

							}
						});
					}
				});

				htmlMenu = htmlMenu + '</ul>' +
									'</div>' +
								'</div>';
			}
			return htmlMenu;
		}, funSmartMenu = function (othis) {
			var idKey = "#smartMenu_", clKey = "smart_menu_", jqueryMenu = $(idKey + params.name);
			if (!jqueryMenu.size()) {
				$("body").append(htmlCreateMenu(othis));
			}else{
				jqueryMenu.replaceWith(htmlCreateMenu(othis));
			}
			return $(idKey + params.name);
		};
		$(params.rootele).on('contextmenu',params.ele,function(e){
			//回调
			if ($.isFunction(params.before)) {
				params.before.call(this);
			}
			e = e || window.event;
			//阻止冒泡
			e.cancelBubble = true;
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			//隐藏当前上下文菜单，确保页面上一次只有一个上下文菜单
			menu_hide();
			var st = $(document).scrollTop();
			var jqueryMenu = funSmartMenu($(e.currentTarget));
			if (jqueryMenu) {
				/*
				*根据触发事件的位置，自适应方向弹出
				*/
				var innerWidth = e.view.innerWidth
				,innerHeight = e.view.innerHeight
				,clientX = e.clientX
				,clientY = e.clientY
				,width = 0
				,height = 0
				,menuwidth = jqueryMenu.width()
				,menuheight = jqueryMenu.height();//屏幕宽高 右键坐标点 x,y
				if(innerWidth - clientX < menuwidth){
					width = - menuwidth - 5;
				}
				if(innerHeight - clientY < menuheight){
					height = - menuheight -5;
				}
				jqueryMenu.css({
					display: "block",
					left: e.clientX + params.offsetX + width,
					top: e.clientY + st + params.offsetY + height
				});
				Method["target"] = jqueryMenu;
				Method["trigger"] = this;
				//回调
				if ($.isFunction(params.after)) {
					params.after.call(this);
				}
				return false;
			}
		});

	}
	//菜单显隐条件判断
	function isMenuCondition(othis,data){
		//条件判断  属性 array :atts[属性] hasClasss[class] 字典:attr[属性:值]
		if(data && $.type(data) === "object" && (data.atts || data.attr || data.hasClasss)){
			var atts = true,attr = true,has = true;
			if(data.atts && $.type(data.atts) === "array"){//是否有属性判断
				$.each(data.atts,function (i,o) {
					atts = atts ? (undefined != $(othis).attr(o)):true;
				});				
			}
			if(data.attr && $.type(data.attr) === "object"){//属性和值的判断
				$.each(data.attr,function (n,v) {
					attr = attr ? (v == $(othis).attr(n)):true;
				});	
			}
			if(data.hasClasss && $.type(data.hasClasss) === "array"){//class 列表判断
				$.each(data.hasClasss,function (i,o) {
					has = has ? $(othis).hasClass(o):true;
				});	
			}
			return atts && attr && has;
		}
		return true;
	}
	//隐藏
	function menu_hide(){
		$('.'+clKey+'box').hide();
	}
	//菜单
	var menu = function () {
        $(document).on('click', function () {
			menu_hide();
        });
		//单击事件
		$('body').on('click','.'+clKey+'box a',function(){
			var menuId = $(this).attr('menu-id'), name = $(this).attr('data-name');
			if (menuId && $.isFunction(menuclick_callback)) {
				menuclick_callback(menuId,name, Method["trigger"]);
			}
			menu_hide();
		});
		//子菜单 事件
		$('body').on('mouseenter','.'+clKey+'box li',function(){
			var isHover = $(this).attr("data-hover"), clHover = clKey + "li_hover";
			var jqueryHover = $(this).siblings("." + clHover);
			jqueryHover.removeClass(clHover).children("." + clKey + "box").hide();
			jqueryHover.children("." + clKey + "a").removeClass(clKey + "a_hover");
			if (isHover) {
				$(this).addClass(clHover).children("." + clKey + "box").show();
				$(this).children("." + clKey + "a").addClass(clKey + "a_hover");
			}
		});
		//子菜单 事件
		$('body').on('mouseout','.'+clKey+'box li',function(){
			var isHover = $(this).attr("data-hover"), clHover = clKey + "li_hover";
			var jqueryHover = $(this).siblings("." + clHover);
			jqueryHover.removeClass(clHover).children("." + clKey + "box").hide();
			jqueryHover.children("." + clKey + "a").removeClass(clKey + "a_hover");
			if (isHover) {
				$(this).addClass(clHover).children("." + clKey + "box").show();
				$(this).children("." + clKey + "a").addClass(clKey + "a_hover");
			}
		});
    }
	//初始化
    menu.prototype.init = function (menuId,options) {
        config(menuId,options);
        layui.each(menuData, function (i) {
			smartMenu(menuData[i].data, {
				rootele:menuData[i].rootele
				,ele:menuData[i].ele
                ,name:menuData[i].id
            });
        });
    }
	menu.prototype.hide = function () {
		menu_hide();
    }
	menu.prototype.remove = function (id) {
		if(id){
			$('#'+id).remove();
		}else{
			$('.'+clKey+'box').remove();
		}
		
    }
    //监听菜单点击回调
    menu.prototype.on = function (menuId, callback) {
        if (typeof callback === 'function') {
            menucall[menuId] = callback;
        }
        return this;
    };
    //点击菜单回调
    function menuclick_callback(menuId,name, othis) {
        menucall[menuId] ? menucall[menuId](name, othis) : '';
    }
    //配置
    function config(menuId,options) {
        $.extend(items, options);
        if (items && items.menu.length) {
            layui.each(items.menu, function (i) {
                init(menuId,items.menu[i]);
            });
        }
    }

    //处理数据格式
    function init(menuId,item) {
        var data = [];
        var groups = [];
        var prapare = {};
        layui.each(item.items, function (i) {
            //item.items[i].func = menuclick_callback;
            var g = item.items[i].group || 'default';
            if (!prapare[g]) {
                prapare[g] = [];
                groups.push(g);
            }
            //处理子菜单
            if (item.items[i].child) {
                var cgroups = [];
                var cprapare = [];
                var cdata = [];
                layui.each(item.items[i].child, function (c) {
                    var ch = item.items[i].child[c];
                    //console.log(ch);
                    ch['menuId'] = menuId;
                    var cg = ch.group || 'cdefault';
                    if (!cprapare[cg]) {
                        cprapare[cg] = [];
                        cgroups.push(cg);
                    }
                    cprapare[cg].push(ch);
                });
                if (cgroups.length) {
                    layui.each(cgroups, function (g) {
                        cdata.push(cprapare[cgroups[g]]);
                    });
                }
                item.items[i].child = cdata;
            }
			item.items[i]['menuId'] = menuId;
            prapare[g].push(item.items[i]);
        });

        if (groups.length) {
            layui.each(groups, function (i) {
                data.push(prapare[groups[i]]);
            });
        }
        menuData.push({
            id:item.id,
			rootele: item.rootele,
            ele: item.ele,
            data: data
        });

    }
	return new menu();
});