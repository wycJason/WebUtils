/**
 * Created by jason on 2019/8/6.
 */
var dateStr = {
    _format: function (t, s, o) { //日期格式化
        var $t, $s = 'ymdhis';
        if (typeof o == "undefined") $o = true; //是否需要补0;[true需要,false不需要]
        else $o = o;
        if (!s) s = "y-m-d h:i:s"; //如果没规定格式默认格式
        if (t) $t = new Date(t);
        else $t = new Date();
        var $y = [$t.getFullYear(), $t.getMonth() + 1, $t.getDate(), $t.getHours(), $t.getMinutes(), $t.getSeconds(), " 00:00:00"]
        for (var i = 0; i < $y.length - 1; i++) {
            if ($o)
                s = s.toLowerCase().replace($s.charAt(i), ($y[i].toString().length == 1 ? "0" + $y[i].toString() : $y[i]));
            else
                s = s.toLowerCase().replace($s.charAt(i), $y[i]);
        }
        return s;
    },
    _diff: function (t1, t2, s) { //返回时间差
        var $r = "NotT1",
            $t = new Date();
        if (!t1) return $r;
        if (t2) $t = new Date(t2);
        var $s1 = new Date(t1).getTime();
        var $s2 = new Date($t).getTime();
        var $v = Math.abs(parseInt($s1) - parseInt($s2));
        if (!s) s = "d";
        switch (s.toLowerCase()) {
            case "d": //返回天
                $r = Math.floor($v / 24 / 60 / 60 / 1000)
                break;
            case "h": //返回小时
                $r = Math.floor($v / 60 / 60 / 1000)
                break;
            case "i": //返回分钟
                $r = Math.floor($v / 60 / 1000)
            case "s": //返回秒
                $r = Math.floor($v / 1000)
                break;
            default: //返回毫秒
                $r = Math.floor($v)
                break;
        }
        return parseInt($s1) > parseInt($s2) ? $r : -$r;
    },
    _toStr: function (t, p) { //时间描述  兼容IE和Chrome
        t = this._format(t, "y-m-d h:i:s", false).replace(/-/ig, "/");//兼容IE处理，如果不兼容删除即可

        var str = "NotT";
        if (!t) return str;
        var $s1 = new Date(t);
        var $s2 = new Date(this._increase(new Date(), p || localStorage.getItem("Time"), "s").replace(/-/ig,"/"));//.replace(/-/ig,"/") 兼容IE处理 如果不兼容删除即可
        var $s = parseInt($s2.getTime() - $s1.getTime());
        if ($s > 0) { //系统时间早于参数日期
            if ($s < (1000 * 3)) str = "刚刚";
            else if ($s >= (1000 * 3) && $s < (1000 * 60)) str = Math.floor($s / 1000) + "秒前";
            else if ($s >= (1000 * 60) && $s < (1000 * 60 * 60)) str = Math.floor($s / 60 / 1000) + "分钟前";
            else if ($s >= (1000 * 60 * 60) && $s < (1000 * 60 * 60 * 24)) str = Math.floor($s / 60 / 60 / 1000) + "小时前";
            else if ($s >= (1000 * 60 * 60 * 24) && $s < (1000 * 60 * 60 * 24 * 2)) str = "昨天(" + ($s1.getHours() < 10 ? ("0" + $s1.getHours()) : $s1.getHours()) + ":" + ($s1.getMinutes() < 10 ? ("0" + $s1.getMinutes()) : $s1.getMinutes()) + ")";
            else if ($s >= (1000 * 60 * 60 * 24 * 2) && $s < (1000 * 60 * 60 * 24 * 3)) str = "前天(" + ($s1.getHours() < 10 ? ("0" + $s1.getHours()) : $s1.getHours()) + ":" + ($s1.getMinutes() < 10 ? ("0" + $s1.getMinutes()) : $s1.getMinutes()) + ")";
            else str = this._format(t, "y-m-d h:i:s", false)//else str = this._format(t, "y年m月d日  h小时i分钟s秒", false)

        } else { //系统时间晚于参数时间
            var $s = parseInt($s1.getTime() - new Date($s2.getFullYear(), $s2.getMonth(), $s2.getDate(), 0, 0, 0));
            if ($s >= (1000 * 60 * 60) && $s < (1000 * 60 * 60 * 24)) str = "今天(" + ($s1.getHours() < 10 ? ("0" + $s1.getHours()) : $s1.getHours()) + ":" + ($s1.getMinutes() < 10 ? ("0" + $s1.getMinutes()) : $s1.getMinutes()) + ")";
            else if ($s >= (1000 * 60 * 60 * 24) && $s < (1000 * 60 * 60 * 24 * 2)) str = "明天(" + ($s1.getHours() < 10 ? ("0" + $s1.getHours()) : $s1.getHours()) + ":" + ($s1.getMinutes() < 10 ? ("0" + $s1.getMinutes()) : $s1.getMinutes()) + ")";
            else if ($s >= (1000 * 60 * 60 * 24 * 2) && $s < (1000 * 60 * 60 * 24 * 3)) str = "后天(" + ($s1.getHours() < 10 ? ("0" + $s1.getHours()) : $s1.getHours()) + ":" + ($s1.getMinutes() < 10 ? ("0" + $s1.getMinutes()) : $s1.getMinutes()) + ")";
            else str = this._format(t,  "y-m-d h:i:s", false)//else str = this._format(t, "y年m月d日  h小时i分钟s秒", false)
        }
        return str
    },
    _to8Data: function (t, s) {//东八区时间
        var $t, $s = 'ymdhis';
        if (!s) s = "y-m-dTh:i:s.0487789+08:00"; //如果没规定格式默认格式
        if (t) $t = new Date(t);
        else $t = new Date();
        var $y = [$t.getFullYear(), $t.getMonth() + 1, $t.getDate(), $t.getHours(), $t.getMinutes(), $t.getSeconds(), " 00:00:00"]
        for (var i = 0; i < $y.length - 1; i++) {
            s = s.replace($s.charAt(i), ($y[i].toString().length == 1 ? "0" + $y[i].toString() : $y[i]));
        }
        return s;
    },
    _to_empty_Data: function (t, s) {
        var $t, $s = 'ymdhis';
        if (!s) s = "y-m-dTh:i:s.0487789+08:00"; //如果没规定格式默认格式
        if (t) {
            $t = new Date(t);
            var $y = [$t.getFullYear(), $t.getMonth() + 1, $t.getDate(), $t.getHours(), $t.getMinutes(), $t.getSeconds(), " 00:00:00"]
            for (var i = 0; i < $y.length - 1; i++) {
                s = s.replace($s.charAt(i), ($y[i].toString().length == 1 ? "0" + $y[i].toString() : $y[i]));
            }
        }
        else s = "";
        return s;
    },
    _compare: function (t1, t2) { //时间比较大小
        var $t2 = new Date();
        if (t2) $t2 = new Date(t2);
        if (!t1) return false;
        else $t1 = new Date(t1)
        return $t1.getTime() - $t2.getTime() == 0 ? 0 : $t1.getTime() - $t2.getTime() > 0 ? 1 : -1;
    },
    _increase: function (t, i, s) { //时间新增函数
        var $i = 0,
            $s = "d",
            $t = new Date(),
            $r;
        if (i) $i = parseInt(i);
        if (s) $s = s;
        if (t) $t = new Date(t);
        switch (s.toLowerCase()) {
            case "y":
                $r = new Date(($t.getFullYear() + $i), $t.getMonth(), $t.getDate(), $t.getHours(), $t.getMinutes(), $t.getSeconds())
                break;
            case "m":
                $r = new Date($t.getFullYear(), ($t.getMonth() + $i), $t.getDate(), $t.getHours(), $t.getMinutes(), $t.getSeconds())
                break;
            case "d":
                $r = new Date($t.getTime() + ((1000 * 60 * 60 * 24) * $i))
                break;
            case "h":
                $r = new Date($t.getTime() + ((1000 * 60 * 60) * $i))
                break;
            case "i":
                $r = new Date($t.getTime() + ((1000 * 60) * $i))
                break;
            case "s":
                $r = new Date($t.getTime() + ((1000) * $i))
                break;

        }
        return this._format($r);
    },
    _formatP: function () {
        if (arguments.length == 0)
            return null;
        var result = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            result = result.replace(re, arguments[i]);
        }
        return result;
    },
    _toMData: function (t, fmt) {
        var o = {
            "M+": t.getMonth() + 1, //月份
            "d+": t.getDate(), //日
            "h+": t.getHours(), //小时
            "m+": t.getMinutes(), //分
            "s+": t.getSeconds(), //秒
            "q+": Math.floor((t.getMonth() + 3) / 3), //季度
            "S": t.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
}