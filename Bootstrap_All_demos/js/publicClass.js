/**
 * Created by Administrator on 2017/6/15.
 * 日期时间基于bootstrap-datetimepicker.js
 * 提示错误基于layer.js
 * 元素查找基于jquery-1.11.3.js
 */
//JS使用正则表达式验证身份证号码
$(".IDNumber").blur(function () {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(!reg.test($.trim($(this).val()))){
        //alert("此字段为必填项，不能为空！");
        var $this = $(this);
        layer.tips('身份证输入不合法！', $($this), {
            tips: 2, //1:上,2:右,3:下,4:左  默认是在右
        });
        return false;
    }
})

//JS使用正则表达式验证身份证号码 含掩码的验证： 如 4206211989****101X  13050367****001
$(".IDNumberMask").blur(function () {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{8}[*]{4}\d{3}$)|(^\d{10}[*]{4}\d{4}$)|(^\d{10}[*]{4}\d{3}(\d|X|x)$)|(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(!reg.test($.trim($(this).val()))){
        //alert("此字段为必填项，不能为空！");
        var $this = $(this);
        layer.tips('身份证输入不合法！', $($this), {
            tips: 2, //1:上,2:右,3:下,4:左  默认是在右
        });
        return false;
    }
})

//JS使用正则表达式验证身份证号码
function isCardNo(card)
{
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(reg.test(card) === false)
    {
        alert("身份证输入不合法");
        return false;
    }
}


    //验证两次密码是否一致
$(".vld_pwdSecond").blur(function () {
    var pwd1 = $(".vld_pwdFirst").val();
    var pwd2 = $(".vld_pwdSecond").val();
    if (pwd1 != pwd2) {
        //alert('两次密码不一致');
        var $this = $(this);
        layer.tips('两次密码不一致', $($this), {
            tips: 2 //1:上,2:右,3:下,4:左  默认是在右边
        });
        $(this).val("");
        return false;
    } else if (pwd1 == pwd2 && pwd1 == "" && pwd2 == "") {
        //alert('密码不能为空');
        var $this = $(this);
        layer.tips('密码不能为空', $($this), {
            tips: 2 //1:上,2:右,3:下,4:左  默认是在右边
        });
        $(this).val("");
        return false;
    }
})

//只能输入中文
$(".vld_chinese").blur(function () {
    var reg = /^[\u0391-\uFFE5]+$/;
    if (!reg.test(this.value)) {
        //alert('必须输入中文！');
        var $this = $(this);
        layer.tips('必须输入中文！', $($this), {
            tips: 2 //1:上,2:右,3:下,4:左  默认是在右边
        });
        $(this).val("");
        return false;
    }
})

//验证最大值、最小值
$(".vld_minMax").blur(function () {//需要配合data-min ，data-max这两个自定义属性一起使用，如果不填，默认data-min=0;data-max=9999
    var min = parseInt($(this).attr("data-min")) || 0;
    var max = parseInt($(this).attr("data-max")) || 9999;
    var val = parseInt($(this).val());
    if (!(val >= min && val <= max)) {
        //alert("此字段输入的范围为："+min+"到"+max);
        var $this = $(this);
        layer.tips('此字段输入的范围为：' + min + '到' + max + "之间的整数（含" + min + "和" + max + "）", $($this), {
            tips: 2 //1:上,2:右,3:下,4:左  默认是在右边
        });
        $(this).val("");
        return false;
    }
})

//验证只能是英文
$(".vld_English").keyup(function () {
    this.value = this.value.replace(/[^a-zA-Z]*/g, '');
})

//验证只能是字母和数字
$(".vld_decimalDigit").keyup(function () {
    this.value = this.value.replace(/[^0-9a-zA-Z]*/g, '');
})

//验证邮政编码
$(".vld_postalcode").blur(function () {
    var reg = /^\d{6}$/;
    if (!reg.test(this.value)) {
        // alert('邮政编码格式输入错误！');
        var $this = $(this);
        layer.tips('邮政编码格式输入错误！', $($this), {
            tips: 2, //1:上,2:右,3:下,4:左  默认是在右
        });
        $(this).val("");
        return false;
    }
})

//必填
$(".vld_required").blur(function () {
    if (!$.trim($(this).val())) {
        //alert("此字段为必填项，不能为空！");
        var $this = $(this);
        layer.tips('此字段为必填项，不能为空！', $($this), {
            tips: 2, //1:上,2:右,3:下,4:左  默认是在右
        });
        return false;
    }
})

//验证邮箱1
$(".vld_email").blur(function () {
    var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/    ///^[[a-zA-Z0-9]+([._\\-]*[[a-zA-Z0-9])*@([[a-zA-Z0-9]+[[a-zA-Z0-9]*[[a-zA-Z0-9]+.){1,63}[[a-zA-Z0-9]+$/;
    var boolChk = emailReg.test(($.trim($(this).val())));
    if (!boolChk) {
        // alert("邮箱地址错误，请重填!");
        var $this = $(this);
        layer.tips('邮箱地址错误，请重填!', $($this), {
            tips: 2 //1:上,2:右,3:下,4:左  默认是在右边
        });
        $(this).val("");
        return false;
    }
})

//验证邮箱2
$(".vld_emailSecond").keyup(function () { //需要配合H5的属性maxlength="6"一起使用
    this.value = this.value.replace(/[^0-9]/g, '');  //只能输数字
})


//手机号码验证
$(".vld_mobile").blur(function () {
    if (!(/^1[34578]\d{9}$/.test($.trim($(this).val())))) {
        //alert("手机号码格式有误，请重填！");
        var $this = $(this);
        layer.tips('手机号码格式有误，请重填！', $($this), {
            tips: 2 //1:上,2:右,3:下,4:左  默认是在右边
        });
        $(this).val("");
        return false;
    }
})

/*验证固定电话号码
 0\d{2,3}   代表区号
 [0\+]\d{2,3}   代表国际区号
 \d{7,8} 代表7－8位数字(表示电话号码)
 正确格式：区号-电话号码-分机号(全写|只写电话号码)
 */
//固定电话号码
$(".vld_telephone").blur(function () {
    var reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
    if (!reg.test(this.value)) {
        // alert('电话号码格式输入错误！');
        var $this = $(this);
        layer.tips('电话号码格式输入错误！', $($this), {
            tips: 2 //1:上,2:右,3:下,4:左  默认是在右边
        });
        $(this).val("");
        return false;
    }
})

//传真验证
$(".vld_fax").blur(function () {
    var reg =  /^(\d{3,4}-)?\d{7,8}$/;
    if (!reg.test(this.value)) {
        var $this = $(this);
        layer.tips('传真格式输入错误！', $($this), {
            tips: 2 //1:上,2:右,3:下,4:左  默认是在右边
        });
        $(this).val("");
        return false;
    }
})

//固定电话号码0-9 -   如0755-82926736
$(".vld_fixed-lineTelephone").keyup(function () {
    this.value = this.value.replace(/[^0-9-]/g, '');  //只能输数字和短横线-
    if (this.value.indexOf(".") == 0||this.value.indexOf("-") == 0) {
        this.value = this.value.replace(/[^0-9]/g, '')
    }
})

//手机号码和座机同时验证
$(".vld_telephoneAndMobilePhone").blur(function () {
    var $this = $(this);
    var isMob=/(^(0[0-9]{2,3}-?)?([2-9][0-9]{6,7})+(-?[0-9]{1,4})?$)|(^0?[1][358][0-9]{9}$)/;
    var value=this.value.trim();
    if(!isMob.test(value)) {
        layer.tips('号码格式输入错误！', $($this), {
            tips: 2 //1:上,2:右,3:下,4:左  默认是在右边
        });
        $(this).val("");
        return false;
    }
})

//只能输入0.12……的小数
$(".vld_2decimal").blur(function () {
    var reg = /^0.\d{2}$/;
    if (!reg.test(this.value)) {
        // alert('小数输入有误，必须以0.开头的2位小数，如0.12');
        var $this = $(this);
        layer.tips('小数输入有误，必须以0.开头的2位小数，如0.12', $($this), {
            tips: 2 //1:上,2:右,3:下,4:左  默认是在右边
        });
        $(this).val("");
        return false;
    }

})

//验证实数(支持正负实数,如正负整数与小数及零)
function validateRealNum(val) {
    var patten = /^[-+]?\d+(\.\d+)?$/;
    return patten.test(val);
}

//验证整数( 仅支持正负整数和零)
function validateInt(val) {
    var patten = /^[-+]?\d+$/;
    return patten.test(val);
}



//只能输入0-9的数字
$(".vld_number").keyup(function () {
    this.value = this.value.replace(/[^0-9]/g, '');  //只能输数字
    if (this.value.indexOf(".") == 0) {
        this.value = this.value.replace(/[^0-9]/g, '')
    }
})

//整数验证：零不能为首位
$(".vld_int").keyup(function () {
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

//整数范围验证
$(".vld_range_int").change(function () {
    var value=this.value;
    var min=10;
    var max=100;
    if(parseInt(value)<min||parseInt(value)>max){
        alert('输入错误,范围为10-100');
        this.value='';
    }
})

//小数验证及自定义小数位数 加属性自定义小数： data-decimalCount="1" 代表只能输入一位小数，只用改数字即可，是几就代表几位小数，如果不加属性默认为2位小数位数
$(".vld_decimal").keyup(function () {
    var n = parseInt(this.dataset.decimalcount)||2;
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

//十年验证
$('.vld_yyyy').datetimepicker({
    format: 'yyyy',
    autoclose: true,
    language: 'zh-CN',
    todayBtn: "linked",
    startView: 4,//默认值：2, 'month'
    minView: 4,
}).on("show", function () {
    $(".table-condensed th").css({"opacity": "1", "height": "auto", "float": "none"})
})

//年月验证
$('.vld_yyyy-mm').datetimepicker({
    format: 'yyyy-mm',
    autoclose: true,
    language: 'zh-CN',
    todayBtn: "linked",
    startView: 3,
    minView: 3,
}).on("show", function () {
    $(".table-condensed th").css({"opacity": "1", "height": "auto", "float": "none"})
})

//年月日验证
$('.vld_yyyy-mm-dd').datetimepicker({
    format: 'yyyy-mm-dd',
    autoclose: true,
    language: 'zh-CN',
    todayBtn: "linked",
    startView: 2,//默认值：2, 'month'
    minView: 2, //选择日期后，不会再跳转去选择时分秒*/
}).on("show", function () {
    $(".table-condensed th").css({"opacity": "1", "height": "auto", "float": "none"})
})

//小时分钟验证
$('.vld_hh-ii').datetimepicker({
    format: 'hh:ii',
    pickDate: false,
    pickerPosition: 'bottom-left',
    autoclose: true,
    language: 'zh-CN',
    todayBtn: "linked",
    startView: 1,//默认值：2, 'month'
    minView: 0,//默认值：0, 'hour'
    minuteStep: 5,//默认值: 5  此数值被当做步进值用于构建小时视图。对于每个 minuteStep 都会生成一组预设时间（分钟）用于选择
}).on("show", function () {
    $(".table-condensed th").css({"opacity": "0", "height": "0", "float": "left"})
});//.datetimepicker('update',new Date() );
//$('#datetimepicker').datetimepicker('update',new Date() );//设置当前时间

//年月日小时分钟验证
$('.vld_yyyy-mm-dd-hh-ii').datetimepicker({
    format: 'yyyy-mm-dd hh:ii',
    autoclose: true,
    language: 'zh-CN',
    todayBtn: "linked",
    startView: 2,//默认值：2, 'month'
    minView: 0,//默认值：0, 'hour'
    minuteStep: 5,//默认值: 5  此数值被当做步进值用于构建小时视图。对于每个 minuteStep 都会生成一组预设时间（分钟）用于选择*/
}).on("show", function () {
    $(".table-condensed th").css({"opacity": "1", "height": "auto", "float": "none"})
})

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

