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
                        layer.msg('��¼ʧЧ�������µ�¼');
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

    _formatToDate: function (t, s, o) {//���ڸ�ʽ��      �÷� $tool._formatToDate("2018-05-01 13:59:59","y-m-d") �� $tool._formatToDate(new Date(),"y-m-d")
        if (t == "0001-01-01T00:00:00+08:00")
            return "";
        var $t, $s = 'ymdhis';
        if (typeof o == "undefined") $o = true;//�Ƿ���Ҫ��0;[true��Ҫ,false����Ҫ]
        else $o = o;
        if (!s) s = "y-m-d h:i:s"; //���û�涨��ʽĬ�ϸ�ʽ
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
    _formatToStr: function () {//��ʽ���ַ���
        if (arguments.length == 0)
            return null;
        var result = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            result = result.replace(re, arguments[i]);
        }
        return result;
    },
    _formatToeEast8Date: function (date) { // �÷� $tool._formatToeEast8Date("2018-05-01 13:59:59")
        return this._formatToDate(date, "y-m-d") + "T00:00:00+08:00";  ////2018-05-01T00:00:00+08:00
    }
    ,
    _getCookie: function (k) {
        var cookie = JSON.parse($.cookie("MyBLCookie"));
        return cookie[k];
    },
    _yearSet: function (curObj) {//����4λ���  onkeyup="$tool._yearSet(this)" maxlength="4"
        curObj.value = curObj.value.replace(/[^0-9]/ig, "");
    },
    _toThousands: function (num) {//$tool._toThousands() ǧ�ַ�
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
    _toThousandsExp: function (num, n) {//��������ת����ǧ�ַ�,nС��λ����Ĭ�ϱ���2λ,��������
        return parseFloat(num).toFixed(n || 2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');//ʹ�������滻��ÿ����������һ��','
    }
};

//������֤:�㲻��Ϊ��λ
$(".vld_int").keyup(function () {debugger
    this.value = this.value.replace(/[^0-9]/g, '');  //ֻ��������
    if (this.value.indexOf(".") < 0 && this.value != "") {//�����Ѿ����ˣ��˴����Ƶ������û��С���㣬��λ����Ϊ������ 01��02�Ľ��
        this.value = parseFloat(this.value);
    } else if (this.value.indexOf(".") == 0) {
        this.value = this.value.replace(/[^0-9]/g, '')
    }
})
//������֤�������Ϊ��λ
$(".vld_int_FisrtZero").keyup(function () {
    this.value = this.value.replace(/[^0-9]/g, '');  //ֻ��������
    if (this.value.indexOf(".") == 0) {
        this.value = this.value.replace(/[^0-9]/g, '')
    }
})


//ճ���¼�
function checkNumPaste($this,e) {
    var clipboardData = e.clipboardData || window.clipboardData();
    var pastedData = clipboardData.getData("text").toUpperCase();
    var re = /^[1-9]+[0-9]*]*$/;
    if (!re.test(pastedData)) {
        layer.msg('������������Ϊ��������', { icon: 0, offset: "100px" });
        setTimeout(function () {//����¼������������֧�֣����������ǵ��¼�����ʱ��input��ʵ��û��change��Ҳ�����޷���ʱ��ȡ���������ݡ�
            $this.val("");
        }, 200);
    }
}

//�ֻ�������֤
$(".vld_mobile").blur(function () {
    if (!(/^1[34578]\d{9}$/.test($.trim($(this).val())))) {
        var $this = $(this);
        layer.msg('�ֻ������ʽ���������', { icon: 2, offset: "100px" });
        $(this).val("");
    }
})
//��֤���������Ƿ�һ��
$(".vld_pwdSecond").blur(function () {
    var pwd1 = $(".vld_pwdFirst").val();
    var pwd2 = $(".vld_pwdSecond").val();
    if (pwd1 != pwd2) {
        var $this = $(this);
        layer.msg('�������벻һ��');
        $(this).val("");
        return false;
    } else if (pwd1 == pwd2 && pwd1 == "" && pwd2 == "") {
        var $this = $(this);
        layer.msg('���벻��Ϊ��');
        $(this).val("");
        return false;
    }
})
//�ֻ����������ͬʱ��֤
$(".vld_telephoneAndMobilePhone").blur(function () {
    var $this = $(this);
    var isPhone = /^([0-9]{3,4}-?)?[0-9]{7,8}$/;
    var isMob = /^((\+?86)|(\+86))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
    var value = this.value.trim();
    if (isMob.test(value) || isPhone.test(value)) {
    } else {
        layer.msg('�绰�����ʽ����');
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
//С����֤���Զ���С��λ�� �������Զ���С���� data-decimalCount="1" ����ֻ������һλС����ֻ�ø����ּ��ɣ��Ǽ��ʹ���λС���������������Ĭ��Ϊ2λС��λ��
$(document.body).on("keyup", ".vld_decimal", function () {
    var n = parseInt(this.dataset.decimalcount) || 2;
    var reg = new RegExp("^(\\-)*(\\d+)\\.(\\d{" + n + "}).*$");
    this.value = this.value.replace(/[^\d.]/g, "");  //��������֡��͡�.��������ַ�
    this.value = this.value.replace(/\.{2,}/g, "."); //ֻ������һ��. ��������
    this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    this.value = this.value.replace(reg, '$1$2.$3');//ֻ����������С�� �Ӹ�\d������λС��   ������С����ע����������
    if (this.value.indexOf(".") < 0 && this.value != "") {//�����Ѿ����ˣ��˴����Ƶ������û��С���㣬��λ����Ϊ������ 01��02�Ľ��
        this.value = parseFloat(this.value);  //������0��ͷ
    } else if (this.value.indexOf(".") == 0) {
        this.value = this.value.replace(/[^0-9]/g, '')//������С����.��ͷ
    }
})

function parseStrObjByRegExp(strDes) {//�ַ���ת��Ϊ����������ʽ��ʽ��parseStrObjByRegExp("name=jack;age=20;love=lily");
    var obj = {};
    strDes.replace(/(\w+)(?:=([^;]*))?/g, function (str, key, value) {
        obj[key] = value;
    });
    return obj;
}
//�Ʊ���2λС�����磺2������2���油��00.��2.00    
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
// ������-��ǧ�ַ�������С��������ԭ�����
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
//��������ת����ǧ�ַ���Ĭ�ϲ���������С����
function toThousandsExp(num, n) {//num���֣�nС��λ����Ĭ�ϱ���2λ,��������
    return parseFloat(num).toFixed(n || 2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');//ʹ�������滻��ÿ����������һ��','
}

//�ж��ǲ���ƻ���ƶ���
function CheckIsIOS() {
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return { //�ƶ��ն�������汾��Ϣ
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios�ն�
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android�ն˻�uc�����
                iPhone: u.indexOf('iPhone') > -1, //�Ƿ�ΪiPhone����QQHD�����
                iPad: u.indexOf('iPad') > -1, //�Ƿ�iPad
            };
        }(),
    }
    if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
        return true;

        return false;
    }
}
//�ж��ǲ��ǰ�׿�ƶ���
function CheckIsAndroid() {
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return { //�ƶ��ն�������汾��Ϣ
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios�ն�
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android�ն˻�uc�����
                iPhone: u.indexOf('iPhone') > -1, //�Ƿ�ΪiPhone����QQHD�����
                iPad: u.indexOf('iPad') > -1, //�Ƿ�iPad
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

//���ַ�������Ϊ���� var data = parseStrObjByRegExpKV(decodeURIComponent($this.serialize(), true));
function parseStrObjByRegExpKV(strDes) {//�ַ���ת��Ϊ����������ʽ��ʽ��parseStrObjByRegExpKV("name=jack&age=20&love=lily");
    var obj = {};
    strDes.replace(/(\w+)(?:=([^&]*))?/g, function (str, key, value) {
        obj[key] = value;
    });
    return obj;
}

//js�л�ȡURL��ָ���Ĳ�ѯ�ַ���
function getSearchString(key) {
    // ��ȡURL��?֮����ַ�
    var str = location.search;
    str = str.substring(1, str.length);

    // ��&�ָ��ַ������������name=xiaoli������Ԫ������
    var arr = str.split("&");
    var obj = new Object();

    // ��ÿһ������Ԫ����=�ָ�������obj����
    for (var i = 0; i < arr.length; i++) {
        var tmp_arr = arr[i].split("=");
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
    }
    return obj[key];
}