var $tool = {
    _ajax: function (url, type, data, successback, errorback, async) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            dataType: 'json',
            async: async || true,
            success: function (result) {
                if (result.Code == 0) {
                    successback(result);
                } else {
                    if (result.Msg == -1) {
                        layer.msg('登录失效，请重新登录');
                        window.location.href = "/admin/login";
                    } else {
                        errorback(result.Msg);
                    }
                }
            },
            error: function (request) {
                errorback(request.responseText);
            }
        });
    },

    _formatToDate: function (t, s, o) {//日期格式化      用法 $tool._formatToDate("2018-05-01 13:59:59","y-m-d") 或 $tool._formatToDate(new Date(),"y-m-d")
        if (t == "0001-01-01T00:00:00+08:00")
            return "";
        var $t, $s = 'ymdhis';
        if (typeof o == "undefined") $o = true;//是否需要补0;[true需要,false不需要]
        else $o = o;
        if (!s) s = "y-m-d h:i:s"; //如果没规定格式默认格式
        if (t) $t = new Date(t);
        else $t = new Date();
        var $y = [$t.getFullYear(), $t.getMonth() + 1, $t.getDate(), $t.getHours(), $t.getMinutes(), $t.getSeconds(), " 00:00:00"];
        s = s.toLowerCase().replace("yyyy", "y").replace("mm", "m").replace("dd", "d");
        for (var i = 0; i < $y.length - 1; i++) {
            if ($o)
                s = s.toLowerCase().replace($s.charAt(i), ($y[i].toString().length == 1 ? "0" + $y[i].toString() : $y[i]));
            else
                s = s.toLowerCase().replace($s.charAt(i), $y[i]);
        }
        return s;
    },
    _formatToStr: function () {//格式化字符串
        if (arguments.length == 0)
            return null;
        var result = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            result = result.replace(re, arguments[i]);
        }
        return result;
    },
    _formatToeEast8Date: function (date) { // 用法 $tool._formatToeEast8Date("2018-05-01 13:59:59")
        return this._formatToDate(date, "y-m-d") + "T00:00:00+08:00";  ////2018-05-01T00:00:00+08:00
    }
    ,
    _getCookie: function (k) {
        var cookie = JSON.parse($.cookie("MyBLCookie"));
        return cookie[k];
    },
    _yearSet: function (curObj) {//输入4位年份  onkeyup="$tool._yearSet(this)" maxlength="4"
        curObj.value = curObj.value.replace(/[^0-9]/ig, "");
    },
    _toThousands: function (num) {//$tool._toThousands() 千分符
        var decimal = "";
        if (num.toString().indexOf(".") > 0) {
            decimal = num.toString().slice(num.toString().indexOf("."));
            var num = parseInt((num || 0)).toString(), result = '';
            while (num.length > 3) {
                result = ',' + num.slice(-3) + result;
                num = num.slice(0, num.length - 3);
            }
            if (num) { result = num + result; }
            return result + decimal;
        } else {
            var num = parseInt((num || 0)).toString(), result = '';
            while (num.length > 3) {
                result = ',' + num.slice(-3) + result;
                num = num.slice(0, num.length - 3);
            }
            if (num) { result = num + result; }
            return result;
        }
    },
    _toThousandsExp: function (num, n) {//正则：数字转换成千分符,n小数位数，默认保留2位,四舍五入
        return parseFloat(num).toFixed(n || 2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');//使用正则替换，每隔三个数加一个','
    }
};

//整数验证:零不能为首位
$(".vld_int").keyup(function () {debugger
    this.value = this.value.replace(/[^0-9]/g, '');  //只能输数字
    if (this.value.indexOf(".") < 0 && this.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        this.value = parseFloat(this.value);
    } else if (this.value.indexOf(".") == 0) {
        this.value = this.value.replace(/[^0-9]/g, '')
    }
})
//整数验证：零可以为首位
$(".vld_int_FisrtZero").keyup(function () {
    this.value = this.value.replace(/[^0-9]/g, '');  //只能输数字
    if (this.value.indexOf(".") == 0) {
        this.value = this.value.replace(/[^0-9]/g, '')
    }
})


//粘贴事件
function checkNumPaste($this,e) {
    var clipboardData = e.clipboardData || window.clipboardData();
    var pastedData = clipboardData.getData("text").toUpperCase();
    var re = /^[1-9]+[0-9]*]*$/;
    if (!re.test(pastedData)) {
        layer.msg('请输入数字且为正整数！', { icon: 0, offset: "100px" });
        setTimeout(function () {//这个事件所有浏览器都支持，但是问题是当事件触发时，input事实上没有change，也就是无法即时获取输入框的内容。
            $this.val("");
        }, 200);
    }
}

//手机号码验证
$(".vld_mobile").blur(function () {
    if (!(/^1[34578]\d{9}$/.test($.trim($(this).val())))) {
        var $this = $(this);
        layer.msg('手机号码格式有误，请重填！', { icon: 2, offset: "100px" });
        $(this).val("");
    }
})
//验证两次密码是否一致
$(".vld_pwdSecond").blur(function () {
    var pwd1 = $(".vld_pwdFirst").val();
    var pwd2 = $(".vld_pwdSecond").val();
    if (pwd1 != pwd2) {
        var $this = $(this);
        layer.msg('两次密码不一致');
        $(this).val("");
        return false;
    } else if (pwd1 == pwd2 && pwd1 == "" && pwd2 == "") {
        var $this = $(this);
        layer.msg('密码不能为空');
        $(this).val("");
        return false;
    }
})
//手机号码和座机同时验证
$(".vld_telephoneAndMobilePhone").blur(function () {
    var $this = $(this);
    var isPhone = /^([0-9]{3,4}-?)?[0-9]{7,8}$/;
    var isMob = /^((\+?86)|(\+86))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
    var value = this.value.trim();
    if (isMob.test(value) || isPhone.test(value)) {
    } else {
        layer.msg('电话号码格式有误！');
        $(this).val("");
        return false;
    }
})
function checkTel(self) {
    var isPhone = /^([0-9]{3,4}-?)?[0-9]{7,8}$/;
    var isMob = /^((\+?86)|(\+86))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
    var value = self.value.trim();
    if (isMob.test(value) || isPhone.test(value)) {
        return true;
    }
    else {
        return false;
    }
}
//小数验证及自定义小数位数 加属性自定义小数： data-decimalCount="1" 代表只能输入一位小数，只用改数字即可，是几就代表几位小数，如果不加属性默认为2位小数位数
$(document.body).on("keyup", ".vld_decimal", function () {
    var n = parseInt(this.dataset.decimalcount) || 2;
    var reg = new RegExp("^(\\-)*(\\d+)\\.(\\d{" + n + "}).*$");
    this.value = this.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    this.value = this.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    this.value = this.value.replace(reg, '$1$2.$3');//只能输入两个小数 加个\d输入三位小数   不限制小数，注释这条即可
    if (this.value.indexOf(".") < 0 && this.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        this.value = parseFloat(this.value);  //不能以0开头
    } else if (this.value.indexOf(".") == 0) {
        this.value = this.value.replace(/[^0-9]/g, '')//不能以小数点.开头
    }
})

function parseStrObjByRegExp(strDes) {//字符串转化为对象（正则表达式方式）parseStrObjByRegExp("name=jack;age=20;love=lily");
    var obj = {};
    strDes.replace(/(\w+)(?:=([^;]*))?/g, function (str, key, value) {
        obj[key] = value;
    });
    return obj;
}
//制保留2位小数，如：2，会在2后面补上00.即2.00    
function toDecimal2(x) {
    debugger;
    if (x=="") {
        return "0.00";
    } else {
        x=x.replace(/,/ig, "");
        var f = parseFloat(x);
        if (isNaN(f)) {
            return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    }
}
// 方法四-纯千分符，不对小数做处理，原样输出
function toThousands(num) {
    var decimal = "";
    if (num==null) {
        return ""
    } else {
        if (num.toString().indexOf(".") > 0) {
            decimal = num.toString().slice(num.toString().indexOf("."));
            var num = parseInt((num || 0)).toString(), result = '';
            while (num.length > 3) {
                result = ',' + num.slice(-3) + result;
                num = num.slice(0, num.length - 3);
            }
            if (num) { result = num + result; }
            return result + decimal;
        } else {
            var num = parseInt((num || 0)).toString(), result = '';
            while (num.length > 3) {
                result = ',' + num.slice(-3) + result;
                num = num.slice(0, num.length - 3);
            }
            if (num) { result = num + result; }
            return result;
        }
    }
}
//正则：数字转换成千分符，默认并保留两个小数点
function toThousandsExp(num, n) {//num数字，n小数位数，默认保留2位,四舍五入
    return parseFloat(num).toFixed(n || 2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');//使用正则替换，每隔三个数加一个','
}

//判断是不是苹果移动端
function CheckIsIOS() {
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
            };
        }(),
    }
    if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
        return true;

        return false;
    }
}
//判断是不是安卓移动端
function CheckIsAndroid() {
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
            };
        }(),
    }
    //if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
    //    return false;
    //}
    if (browser.versions.android)
        return true;
    return false;
}

//将字符串解析为对象 var data = parseStrObjByRegExpKV(decodeURIComponent($this.serialize(), true));
function parseStrObjByRegExpKV(strDes) {//字符串转化为对象（正则表达式方式）parseStrObjByRegExpKV("name=jack&age=20&love=lily");
    var obj = {};
    strDes.replace(/(\w+)(?:=([^&]*))?/g, function (str, key, value) {
        obj[key] = value;
    });
    return obj;
}

//js中获取URL中指定的查询字符串
function getSearchString(key) {
    // 获取URL中?之后的字符
    var str = location.search;
    str = str.substring(1, str.length);

    // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
    var arr = str.split("&");
    var obj = new Object();

    // 将每一个数组元素以=分隔并赋给obj对象
    for (var i = 0; i < arr.length; i++) {
        var tmp_arr = arr[i].split("=");
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
    }
    return obj[key];
}