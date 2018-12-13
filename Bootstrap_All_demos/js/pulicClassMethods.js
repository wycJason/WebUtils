/**
 * Created by Administrator on 2017/10/31.
 */
//1：日期            (按系统的日期格式显示,弹出的键盘需要做处理)  UTC
//2：数量            (按系统的数量格式显示,弹出的键盘需要做处理)
//3：单价            (按系统的单价格式显示 ,弹出的键盘需要做处理)
//4：时间            (按时间格式显示 ,弹出的对话框需要做处理) HH:mm
//5：汇总金额        (按系统的汇总金额格式显示 ,弹出的键盘需要做处理)
//6：汇率            (按系统的汇率格式显示 ,弹出的键盘需要做处理)
//7：百分比         (按系统的百分比式显示 ,弹出的键盘需要做处理)
//8：字符
//9:图像
//10:整形           (弹出的键盘需要做处理)
//11:长整形          (弹出的键盘需要做处理)
//12:带百分符的百分比
//13:日期时间         (按系统的数量格式显示,弹出的键盘需要做处理)  UTC
//14:短整形          (弹出的键盘需要做处理)
//15:地址           (点击跳到地图，判断手机上有哪些地图软件，让用户选择)
//16:网址           (点击打开网页)
//17:邮箱           (点击打开邮箱软件发送邮件，以后100%目标软件做了邮箱管理后跳到100%目标的发送邮件界面)
//18:移动电话         (点击弹出，发短信 和打电话的选项 )
//19:固定电话         (点击弹出，打电话的选项)

/*
format:                  value
MAX 最大值               {format:"MIN",value: 1 }
MIN 最小值               {format:"MAX",value: 8 }
[MIN-MAX] 区间           [1,9]
+ 正数                   {format:"+",value: "" }
- 负数                   {format:"-",value: "" }
f 小数                   {format:"f",value: 8 }或{format:"",value: 8 }
MAXLEN 最大长度          {format:"MAXLEN",value: 8 }
MINLEN 最小长度          {format:"MINLEN",value: 1 }
[MINLEN-MAXLEN] 区间     [1,9]

URL 链接
Email 邮箱
ZIP 邮编
Mobile 国内手机
TEL 座机
DATE 日期
*/
/*
var vldObj={
    value:"12.25",//值
    fieldType:2,//类型  如：2、数量
    formatter:[{format:"f",value: "3" }] //格式
};
*/
var formatFactory = {
    "msg": function (code, value) {//获取错误消息    code 错误码  value为 formatter:[{format:"f",value: "3" }] 里的格式化的值
        var _msg = {
            "0": "",
            "213": "请输入小于" + value + "的数",
            "212": "请输入大于" + value + "的数",
            "214": "请输入" + value[0] + "至" + value[1] + "之间的数字",
            "215": "请输入小于0的负数",
            "216": "请输入大于0的正数",
            "205": "最少" + value + "个字符",
            "206": "最多" + value + "个字符",
            "217": "字符长度" + value[0] + "-" + value[1] + "之间",
            "211": "请输入正确的小数",
            "210": "请输入" + value + "位小数",
        };
        return _msg[code.toString()];
    },

    "code": function (code, vulue) {//获取错误消息
        return {
            Code: code,
            Msg: formatFactory.msg(code, vulue)
        }
    },
    "typeValidation": function (vldObj,callBack) {
        var $this = this;
        var isNull=vldObj.isNull||false;
        var msgs = [];
        msgs.push($this.exp($this.reg(vldObj.fieldType), vldObj.value,isNull));
        if (msgs[0] == undefined&&vldObj.formatter!=undefined) {
            $.each(vldObj.formatter, function (i, v) {
                $this[v.format.toLowerCase()](vldObj, v.value, function (result) {
                    if (result.Code != 0) {
                        msgs.push(result);
                    }
                })
                if (msgs.length==2) {
                    return false;
                }
            })

           if(msgs.length==1){
               /*return console.log({
                   Code: 0,
                   Msg: ""
               })*/
               callBack({
                   Code: 0,
                   Msg: ""
               })
           }else{
               //return console.log(msgs[1])
                callBack(msgs[1])
           }
        }else if($this.exp($this.reg(vldObj.fieldType), vldObj.value,isNull)==undefined) {
            callBack({
                Code: 0,
                Msg: ""
            });
        }else {
            //console.log($this.exp($this.reg(vldObj.fieldType), vldObj.value))
            callBack($this.exp($this.reg(vldObj.fieldType), vldObj.value,isNull));
        }
    },

    "exp": function(reg, v, isNull) { //验证正则  reg是一个对象 如：{exp:/^[1-9]?\d*\.\d+$/,code:100,msg:"请输入整数"}
	/* if (!(reg.exp.test($.trim(v)))) {
	     return {"Code": reg.code, "Msg": reg.msg};//返回错误消息
	 }*/
	if(isNull) { //为空
		if($.trim(v) == "") {
			return {
				"Code": 0,
				"Msg": ""
			};
		} else if(!(reg.exp.test($.trim(v)))) {
			return {
				"Code": reg.code,
				"Msg": reg.msg
			}; //返回错误消息
		}
	} else if(!(reg.exp.test($.trim(v)))) {
		return {
			"Code": reg.code,
			"Msg": reg.msg
		}; //返回错误消息
	}
},
    "reg": function (t) {//选择正则----->类型判断    返回对象
        var _reg = {
            /*
             最强验证日期的正则表达式,添加了闰年的验证
             这个日期正则表达式支持
             YYYY-MM-DD
             YYYY/MM/DD
             YYYY_MM_DD
             YYYY.MM.DD的形式
             */
            "1": {
                exp: /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/,
                code: 101,
                msg: "日期格式不正确，正确格式为：yyyy-MM-dd"
            },//日期
            "2": {exp: /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/, code: 102, msg: "请输入整数"},//数量
            "3": {exp: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, code: 103, msg: "请输入正确的单价"},//单价   最多2位小数
            "4": {exp: /^(20|21|22|23|[0-1]\d):[0-5]\d(:[0-5]\d)?$/, code: 104, msg: "时间格式不正确，正确格式为：HH:mm:ss或HH:mm"},//时间
            "5": {exp: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, code: 105, msg: "请输入正确的汇总金额"},//汇总金额  最多2位小数
            "6": {exp: /(^[1-9]([0-9]+)?(\.[0-9]*)?$)/, code: 106, msg: "请输入正确的汇率"},//汇率/小数或整数
            "7": {exp: /^[-1-9]?\d*\.\d+$/, code: 107, msg: "请输入正确的百分比（不带%号）"},//百分比/小数 不限小数位数
            "8": {exp: /^.+$/, code: 108, msg: "请输入字符，不能为空"},//字符  不能为空
            "9": {exp: /(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png)$/, code: 109, msg: "请输入正确的图像地址"},//字符  不能为空  或/\.(jpg|jpeg|png|bmp)$/ 或者 /^[a-zA-Z]:(\\.+)(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png)$/
            "10": {exp: /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/, code: 110, msg: "请输入整数"},//整形
            "11": {exp: /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/, code: 111, msg: "请输入整数"},//长整形
            "12": {exp: /^([1-9]{1}[0-9]{0,1}|0|100)(.\d{1,2}){0,1}%$/, code: 112, msg: "请输入正确的百分比（带%号）"},//带百分符的百分比     最多小数点后保留2位，例如97.51%/98.32%。
            "13": {
                exp: /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s((([0-1][0-9])|(2?[0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/,
                code: 113,
                msg: "日期时间格式不正确，正确格式为：yyyy-MM-dd HH:mm:ss "
            },//日期时间
            "14": {exp: /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/, code: 114, msg: "请输入整数"},//短整形
            "15": {exp: /^[\u4E00-\u9FA5A-Za-z\d\-\_]+$/, code: 115, msg: "请输入正确的地址"},//地址
            "16": {
                exp: /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/,
                code: 116,
                msg: "网址错误：请以http://或https://开头输入正确网址"
            },//网址
            "17": {exp: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, code: 117, msg: "邮箱地址错误"},//邮箱
            "18": {exp: /^1[34578]\d{9}$/, code: 118, msg: "请输入正确的11位手机号码"},//移动电话
            /*
             座机:验证固定电话号码
             0\d{2,3}   代表区号
             [0\+]\d{2,3}   代表国际区号
             \d{7,8} 代表7－8位数字(表示电话号码)
             正确格式：区号-电话号码-分机号(全写|只写电话号码)
             */
            "19": {exp: /^(([0\+]\d{2,3}-)?(0\d{2,3})-?)?(\d{7,8})(-(\d{3,}))?$/, code: 119, msg: "座机号码格式有误"},//座机-固定电话

            //拓展
            "20": {exp: /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/, code: 120, msg: "请输入整数"},//整数
            "21": {exp: /^[-1-9]?\d*\.\d+$/, code: 121, msg: "请输入小数"},//小数
            "22": {exp: /^[1-9][0-9]{5}$/, code: 122, msg: "邮编错误"},//邮编   邮政编码的验证（开头不能为0，共6位）
        };
        return _reg[t.toString()];
    },
    "max": function (vldObj, value, callBack) {
        if (parseInt(vldObj.value) <= parseInt(value)) {
            callBack(this.code(0, value));
        } else {
            callBack(this.code(213, value));
        }

    },
    "min": function (vldObj, value, callBack) {
        if (parseInt(vldObj.value) >= parseInt(value)) {
            callBack(this.code(0, value));
        } else {
            callBack(this.code(212, value));
        }
    },
    /*"null": function (vldObj, value, callBack) {
        if (value.toLowerCase().toString() == "null") {
            callBack(this.code(0, value));
        }
    },*/
    "[min-max]": function (vldObj, value, callBack) {
        if (parseInt(vldObj.value) >= parseInt(value[0]) && parseInt(vldObj.value) <= parseInt(value[1])) {
            callBack(this.code(0, value));
        } else {
            callBack(this.code(214, value));
        }
    },
    "-": function (vldObj, value, callBack) {
        if (parseInt(vldObj.value) < 0) {
            callBack(this.code(0, value));
        } else {
            callBack(this.code(215, value));
        }
    },
    "+": function (vldObj, value, callBack) {
        if (parseInt(vldObj.value) > 0) {
            callBack(this.code(0, value));
        } else {
            callBack(this.code(216, value));
        }
    },
    "minlen": function (vldObj, value, callBack) {
        if ($.trim(vldObj.value).length >= parseInt(value)) {
            callBack(this.code(0, value));
        } else {
            callBack(this.code(205, value));
        }
    },
    "maxlen": function (vldObj, value, callBack) {
        if ($.trim(vldObj.value).length <= parseInt(value)) {
            callBack(this.code(0, value));
        } else {
            callBack(this.code(206, value));
        }
    },
    "[minlen-maxlen]": function (vldObj, value, callBack) {
        if ($.trim(vldObj.value).length >= parseInt(value[0]) && $.trim(vldObj.value).length <= parseInt(value[1])) {
            callBack(this.code(0, value));
        } else {
            callBack(this.code(217, value));
        }
    },
    "f": function (vldObj, value, callBack) {
        var floatBit = (vldObj.value).toString().split(".")[1].length;
        var floatBitBefore = (vldObj.value).toString().split(".")[0];
        if (floatBitBefore.length >= 2 && parseInt(floatBitBefore[0]) == 0) {
            callBack(this.code(211, value));
        } else {
            if (floatBit == parseInt(value)) {
                callBack(this.code(0, value));
            } else {
                callBack(this.code(210, value));
            }
        }
    },
}

$(function () {
    formatFactory.typeValidation({
        value:"55.555",//值
        fieldType:21,//类型  如：21、小数
        isNull:true,//是否允许为空，默认false
        formatter:[{format:"f",value: 3 }] //格式  小数三位验证
    },function(res){
        if(res.Code==0){
            console.log('OK');
        }else{
            console.log(res.Msg);
        }
    });
});

