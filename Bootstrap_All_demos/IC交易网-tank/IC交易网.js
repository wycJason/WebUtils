$('#btn_topSearch').click(function() {
    $('#btn_topSearch').attr('disabled', 'disabled');
    var A = getSearchParam();
    if (A == undefined)
        return;
    if ($('#pnCodePrompt').width() > 0 && $('#pnCodePrompt').width() != null) {
        showlayer("pnCodePrompt", "型号查询", "body");
        changeRndCode();
    } else {
        setCollectPartNo($.trim($("#key").val()));
        sEnc();
        var B = GetCookie('Host');
        if ($.trim(B) == '' || B == undefined) {
            location.href = Public_Path + '/search.php?' + A;
        } else {
            location.href = B + '/search.php?' + A;
        }
    }
});


function changeRndCode() {
    $('#imgPnCode').attr('src', Asy_Path + '/global/verficationCode.php?a=' + Math.random());
}

function sEnc() {
    var _0x597bx2d = GetCookie(__Ox310f8[0x3]);
    if (_0x597bx2d != null) {
        SetCookie(__Ox310f8[0x3], hex_2(hex_1(_0x597bx2d)), 3600 * 24 * 30)
    }
}

function getSearchParam() {
    var A = $.trim($('#key').val());
    A = A.toUpperCase();
    if (A == '' || A == '找IC  搜一下')
        return;
    var B = 0;
    if ($('input[name="isExact"]').is(':checked')) {
        B = 1;
    }
    var C = $.trim($('input[name="searchAreaCode"]').val());
    var D = getSearchAreaCode(C);
    A = encodeURIComponent(A);
    B = encodeURIComponent(B);
    D = encodeURIComponent(D);
    var E = 'IC_Method=icsearch&key=' + A + '&isExact=' + B + '&mfg=&pack=&dc=&qty=' + '&searchAreaCode=' + D + '&stockDate=90&stockType=0';
    return E;
}

function getSearchAreaCode(A) {
    var B = 0;
    switch (A) {
        case '深圳':
            B = 1;
            break;
        case '北京':
            B = 2;
            break;
        case '上海':
            B = 3;
            break;
        case '汕头':
            B = 4;
            break;
        case '陕西':
            B = 5;
            break;
        case '四川':
            B = 6;
            break;
        case '江苏':
            B = 7;
            break;
        case '湖北':
            B = 8;
            break;
        case '浙江':
            B = 9;
            break;
        case '福建':
            B = 10;
            break;
        case '重庆':
            B = 11;
            break;
        case '河南':
            B = 12;
            break;
        case '河北':
            B = 13;
            break;
        case '其它':
            B = 14;
            break;
        default:
            B = 0;
    }
    return B;
}


function GetCookie(A) {
    var B = 'ICNet[' + A + ']';
    var C = document.cookie.split("; ");
    for (var D = 0; D < C.length; D++) {
        var E = C[D].split("=");
        if (E[0] == B)
            return unescape(E[1]);
    }
    return null;
}

function SetCookie(A, B, C) {
    var D = "ICNet[" + A + "]=" + escape(B);
    if (C > 0) {
        var E = new Date();
        var F = C * 1000;
        E.setTime(E.getTime() + F);
        D += "; expires=" + E.toGMTString();
        D += "; path=/";
        D += "; domain=" + Domain;
    }
    document.cookie = D;
}

function setCollectPartNo(_0x597bx2f) {
    $key = _0x597bx2f;
    $key = $key[__Ox310f8[0x4]]();
    $key = hex_2(hex_1($key));
    $strCollectPartNoJSON = GetCookie(__Ox310f8[0x5]);
    $args_CollectPartNo = new Array();
    if ($strCollectPartNoJSON == null) {
        $args_CollectPartNo[__Ox310f8[0x6]]($key)
    } else {
        $args_CollectPartNo = $[__Ox310f8[0x7]]($strCollectPartNoJSON);
        if ($strCollectPartNoJSON[__Ox310f8[0x9]](__Ox310f8[0x8] + $key + __Ox310f8[0x8]) < 0) {
            if ($args_CollectPartNo[__Ox310f8[0x1]] >= 20) {
                $args_CollectPartNo[__Ox310f8[0xa]]()
            };
            $args_CollectPartNo[__Ox310f8[0x6]]($key)
        }
    };
    $strCollectPartNoJSON = JSON[__Ox310f8[0xb]]($args_CollectPartNo);
    SetCookie(__Ox310f8[0x5], $strCollectPartNoJSON, 5 * 365 * 24 * 60 * 60)
}