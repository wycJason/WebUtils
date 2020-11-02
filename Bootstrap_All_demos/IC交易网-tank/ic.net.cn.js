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

function changeRndCode() {
    $('#imgPnCode').attr('src', Asy_Path + '/global/verficationCode.php?a=' + Math.random());
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
    console.log("Cookie", escape(B))
}

function setCollectPartNo(_0x597bx2f) {
    //加密一
    var __Ox3075a = ["", "\x6C\x65\x6E\x67\x74\x68", "\x63\x6F\x6E\x63\x61\x74", "\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74", "\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65", "\x76\x61\x6C", "\x23\x68\x69\x64\x5F\x73\x74\x72\x6B", "\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x41\x42\x43\x44\x45\x46", "\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", "\x63\x68\x61\x72\x41\x74", "\x72\x65\x70\x6C\x61\x63\x65", "\x73\x75\x62\x73\x74\x72\x69\x6E\x67", "\x7A\x67\x66\x64\x6E", "\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2B\x2F"];
    var hexcase = 0;
    var b64pad = __Ox3075a[0x0];
    var chrsz = 8;

    function hex_1(_0x8758x5) {
        return binl2hex(core_md5(str2binl(_0x8758x5), _0x8758x5[__Ox3075a[0x1]] * chrsz))
    }

    function b64_md5(_0x8758x5) {
        return binl2b64(core_md5(str2binl(_0x8758x5), _0x8758x5[__Ox3075a[0x1]] * chrsz))
    }

    function str_md5(_0x8758x5) {
        return binl2str(core_md5(str2binl(_0x8758x5), _0x8758x5[__Ox3075a[0x1]] * chrsz))
    }

    function hex_hmac_md5(_0x8758x9, _0x8758xa) {
        return binl2hex(core_hmac_md5(_0x8758x9, _0x8758xa))
    }

    function b64_hmac_md5(_0x8758x9, _0x8758xa) {
        return binl2b64(core_hmac_md5(_0x8758x9, _0x8758xa))
    }

    function str_hmac_md5(_0x8758x9, _0x8758xa) {
        return binl2str(core_hmac_md5(_0x8758x9, _0x8758xa))
    }

    function core_md5(_0x8758xe, _0x8758xf) {
        _0x8758xe[_0x8758xf >> 5] |= 0x80 << ((_0x8758xf) % 32);
        _0x8758xe[(((_0x8758xf + 64) >>> 9) << 4) + 14] = _0x8758xf;
        var _0x8758x10 = 1732584193;
        var _0x8758x11 = -271733879;
        var _0x8758x12 = -1732584194;
        var _0x8758x13 = 271733878;
        for (var _0x8758x14 = 0; _0x8758x14 < _0x8758xe[__Ox3075a[0x1]]; _0x8758x14 += 16) {
            var _0x8758x15 = _0x8758x10;
            var _0x8758x16 = _0x8758x11;
            var _0x8758x17 = _0x8758x12;
            var _0x8758x18 = _0x8758x13;
            _0x8758x10 = md5_ff(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 0], 7, -680876936);
            _0x8758x13 = md5_ff(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 1], 12, -389564586);
            _0x8758x12 = md5_ff(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 2], 17, 606105819);
            _0x8758x11 = md5_ff(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 3], 22, -1044525330);
            _0x8758x10 = md5_ff(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 4], 7, -176418897);
            _0x8758x13 = md5_ff(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 5], 12, 1200080426);
            _0x8758x12 = md5_ff(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 6], 17, -1473231341);
            _0x8758x11 = md5_ff(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 7], 22, -45705983);
            _0x8758x10 = md5_ff(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 8], 7, 1770035416);
            _0x8758x13 = md5_ff(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 9], 12, -1958414417);
            _0x8758x12 = md5_ff(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 10], 17, -42063);
            _0x8758x11 = md5_ff(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 11], 22, -1990404162);
            _0x8758x10 = md5_ff(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 12], 7, 1804603682);
            _0x8758x13 = md5_ff(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 13], 12, -40341101);
            _0x8758x12 = md5_ff(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 14], 17, -1502002290);
            _0x8758x11 = md5_ff(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 15], 22, 1236535329);
            _0x8758x10 = md5_gg(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 1], 5, -165796510);
            _0x8758x13 = md5_gg(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 6], 9, -1069501632);
            _0x8758x12 = md5_gg(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 11], 14, 643717713);
            _0x8758x11 = md5_gg(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 0], 20, -373897302);
            _0x8758x10 = md5_gg(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 5], 5, -701558691);
            _0x8758x13 = md5_gg(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 10], 9, 38016083);
            _0x8758x12 = md5_gg(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 15], 14, -660478335);
            _0x8758x11 = md5_gg(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 4], 20, -405537848);
            _0x8758x10 = md5_gg(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 9], 5, 568446438);
            _0x8758x13 = md5_gg(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 14], 9, -1019803690);
            _0x8758x12 = md5_gg(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 3], 14, -187363961);
            _0x8758x11 = md5_gg(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 8], 20, 1163531501);
            _0x8758x10 = md5_gg(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 13], 5, -1444681467);
            _0x8758x13 = md5_gg(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 2], 9, -51403784);
            _0x8758x12 = md5_gg(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 7], 14, 1735328473);
            _0x8758x11 = md5_gg(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 12], 20, -1926607734);
            _0x8758x10 = md5_hh(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 5], 4, -378558);
            _0x8758x13 = md5_hh(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 8], 11, -2022574463);
            _0x8758x12 = md5_hh(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 11], 16, 1839030562);
            _0x8758x11 = md5_hh(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 14], 23, -35309556);
            _0x8758x10 = md5_hh(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 1], 4, -1530992060);
            _0x8758x13 = md5_hh(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 4], 11, 1272893353);
            _0x8758x12 = md5_hh(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 7], 16, -155497632);
            _0x8758x11 = md5_hh(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 10], 23, -1094730640);
            _0x8758x10 = md5_hh(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 13], 4, 681279174);
            _0x8758x13 = md5_hh(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 0], 11, -358537222);
            _0x8758x12 = md5_hh(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 3], 16, -722521979);
            _0x8758x11 = md5_hh(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 6], 23, 76029189);
            _0x8758x10 = md5_hh(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 9], 4, -640364487);
            _0x8758x13 = md5_hh(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 12], 11, -421815835);
            _0x8758x12 = md5_hh(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 15], 16, 530742520);
            _0x8758x11 = md5_hh(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 2], 23, -995338651);
            _0x8758x10 = md5_ii(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 0], 6, -198630844);
            _0x8758x13 = md5_ii(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 7], 10, 1126891415);
            _0x8758x12 = md5_ii(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 14], 15, -1416354905);
            _0x8758x11 = md5_ii(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 5], 21, -57434055);
            _0x8758x10 = md5_ii(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 12], 6, 1700485571);
            _0x8758x13 = md5_ii(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 3], 10, -1894986606);
            _0x8758x12 = md5_ii(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 10], 15, -1051523);
            _0x8758x11 = md5_ii(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 1], 21, -2054922799);
            _0x8758x10 = md5_ii(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 8], 6, 1873313359);
            _0x8758x13 = md5_ii(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 15], 10, -30611744);
            _0x8758x12 = md5_ii(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 6], 15, -1560198380);
            _0x8758x11 = md5_ii(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 13], 21, 1309151649);
            _0x8758x10 = md5_ii(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe[_0x8758x14 + 4], 6, -145523070);
            _0x8758x13 = md5_ii(_0x8758x13, _0x8758x10, _0x8758x11, _0x8758x12, _0x8758xe[_0x8758x14 + 11], 10, -1120210379);
            _0x8758x12 = md5_ii(_0x8758x12, _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe[_0x8758x14 + 2], 15, 718787259);
            _0x8758x11 = md5_ii(_0x8758x11, _0x8758x12, _0x8758x13, _0x8758x10, _0x8758xe[_0x8758x14 + 9], 21, -343485551);
            _0x8758x10 = safe_add(_0x8758x10, _0x8758x15);
            _0x8758x11 = safe_add(_0x8758x11, _0x8758x16);
            _0x8758x12 = safe_add(_0x8758x12, _0x8758x17);
            _0x8758x13 = safe_add(_0x8758x13, _0x8758x18)
        };
        return Array(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13)
    }

    function md5_cmn(_0x8758x1a, _0x8758x10, _0x8758x11, _0x8758xe, _0x8758x5, _0x8758x1b) {
        return safe_add(bit_rol(safe_add(safe_add(_0x8758x10, _0x8758x1a), safe_add(_0x8758xe, _0x8758x1b)), _0x8758x5), _0x8758x11)
    }

    function md5_ff(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe, _0x8758x5, _0x8758x1b) {
        return md5_cmn((_0x8758x11 & _0x8758x12) | ((~_0x8758x11) & _0x8758x13), _0x8758x10, _0x8758x11, _0x8758xe, _0x8758x5, _0x8758x1b)
    }

    function md5_gg(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe, _0x8758x5, _0x8758x1b) {
        return md5_cmn((_0x8758x11 & _0x8758x13) | (_0x8758x12 & (~_0x8758x13)), _0x8758x10, _0x8758x11, _0x8758xe, _0x8758x5, _0x8758x1b)
    }

    function md5_hh(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe, _0x8758x5, _0x8758x1b) {
        return md5_cmn(_0x8758x11 ^ _0x8758x12 ^ _0x8758x13, _0x8758x10, _0x8758x11, _0x8758xe, _0x8758x5, _0x8758x1b)
    }

    function md5_ii(_0x8758x10, _0x8758x11, _0x8758x12, _0x8758x13, _0x8758xe, _0x8758x5, _0x8758x1b) {
        return md5_cmn(_0x8758x12 ^ (_0x8758x11 | (~_0x8758x13)), _0x8758x10, _0x8758x11, _0x8758xe, _0x8758x5, _0x8758x1b)
    }

    function core_hmac_md5(_0x8758x9, _0x8758xa) {
        var _0x8758x21 = str2binl(_0x8758x9);
        if (_0x8758x21[__Ox3075a[0x1]] > 16) {
            _0x8758x21 = core_md5(_0x8758x21, _0x8758x9[__Ox3075a[0x1]] * chrsz)
        };
        var _0x8758x22 = Array(16),
            _0x8758x23 = Array(16);
        for (var _0x8758x14 = 0; _0x8758x14 < 16; _0x8758x14++) {
            _0x8758x22[_0x8758x14] = _0x8758x21[_0x8758x14] ^ 0x36363636;
            _0x8758x23[_0x8758x14] = _0x8758x21[_0x8758x14] ^ 0x5C5C5C5C
        };
        var _0x8758x24 = core_md5(_0x8758x22[__Ox3075a[0x2]](str2binl(_0x8758xa)), 512 + _0x8758xa[__Ox3075a[0x1]] * chrsz);
        return core_md5(_0x8758x23[__Ox3075a[0x2]](_0x8758x24), 512 + 128)
    }

    function safe_add(_0x8758xe, _0x8758x26) {
        var _0x8758x27 = (_0x8758xe & 0xFFFF) + (_0x8758x26 & 0xFFFF);
        var _0x8758x28 = (_0x8758xe >> 16) + (_0x8758x26 >> 16) + (_0x8758x27 >> 16);
        return (_0x8758x28 << 16) | (_0x8758x27 & 0xFFFF)
    }

    function bit_rol(_0x8758x2a, _0x8758x2b) {
        return (_0x8758x2a << _0x8758x2b) | (_0x8758x2a >>> (32 - _0x8758x2b))
    }

    function str2binl(_0x8758x2d) {
        var _0x8758x2e = Array();
        var _0x8758x2f = (1 << chrsz) - 1;
        for (var _0x8758x14 = 0; _0x8758x14 < _0x8758x2d[__Ox3075a[0x1]] * chrsz; _0x8758x14 += chrsz) {
            _0x8758x2e[_0x8758x14 >> 5] |= (_0x8758x2d[__Ox3075a[0x3]](_0x8758x14 / chrsz) & _0x8758x2f) << (_0x8758x14 % 32)
        };
        return _0x8758x2e
    }

    function binl2str(_0x8758x2e) {
        var _0x8758x2d = __Ox3075a[0x0];
        var _0x8758x2f = (1 << chrsz) - 1;
        for (var _0x8758x14 = 0; _0x8758x14 < _0x8758x2e[__Ox3075a[0x1]] * 32; _0x8758x14 += chrsz) {
            _0x8758x2d += String[__Ox3075a[0x4]]((_0x8758x2e[_0x8758x14 >> 5] >>> (_0x8758x14 % 32)) & _0x8758x2f)
        };
        return _0x8758x2d
    }

    function binl2hex(_0x8758x32) {
        $rnns = $(__Ox3075a[0x6])[__Ox3075a[0x5]]();
        var _0x8758x33 = hexcase ? __Ox3075a[0x7] : __Ox3075a[0x8];
        var _0x8758x2d = __Ox3075a[0x0];
        for (var _0x8758x14 = 0; _0x8758x14 < _0x8758x32[__Ox3075a[0x1]] * 4; _0x8758x14++) {
            _0x8758x2d += _0x8758x33[__Ox3075a[0x9]]((_0x8758x32[_0x8758x14 >> 2] >> ((_0x8758x14 % 4) * 8 + 4)) & 0xF) + _0x8758x33[__Ox3075a[0x9]]((_0x8758x32[_0x8758x14 >> 2] >> ((_0x8758x14 % 4) * 8)) & 0xF)
        };
        _0x8758x2d = _0x8758x2d[__Ox3075a[0xa]](/0/g, 1);
        _0x8758x2d = (_0x8758x2d[__Ox3075a[0xb]](0, 5) + __Ox3075a[0xc] + _0x8758x2d[__Ox3075a[0xb]](10));
        _0x8758x2d = (_0x8758x2d[__Ox3075a[0xb]](0, (8 + parseInt($rnns))) + $rnns + _0x8758x2d[__Ox3075a[0xb]](15));
        return _0x8758x2d
    }

    function binl2b64(_0x8758x32) {
        var _0x8758x35 = __Ox3075a[0xd];
        var _0x8758x2d = __Ox3075a[0x0];
        for (var _0x8758x14 = 0; _0x8758x14 < _0x8758x32[__Ox3075a[0x1]] * 4; _0x8758x14 += 3) {
            var _0x8758x36 = (((_0x8758x32[_0x8758x14 >> 2] >> 8 * (_0x8758x14 % 4)) & 0xFF) << 16) | (((_0x8758x32[_0x8758x14 + 1 >> 2] >> 8 * ((_0x8758x14 + 1) % 4)) & 0xFF) << 8) | ((_0x8758x32[_0x8758x14 + 2 >> 2] >> 8 * ((_0x8758x14 + 2) % 4)) & 0xFF);
            for (var _0x8758x37 = 0; _0x8758x37 < 4; _0x8758x37++) {
                if (_0x8758x14 * 8 + _0x8758x37 * 6 > _0x8758x32[__Ox3075a[0x1]] * 32) {
                    _0x8758x2d += b64pad
                } else {
                    _0x8758x2d += _0x8758x35[__Ox3075a[0x9]]((_0x8758x36 >> 6 * (3 - _0x8758x37)) & 0x3F)
                }
            }
        };
        return _0x8758x2d
    }

    //加密码二
    var __Ox310f8 = ["", "\x6C\x65\x6E\x67\x74\x68", "\x63\x6F\x6E\x63\x61\x74", "\x73\x63\x74", "\x74\x6F\x4C\x6F\x77\x65\x72\x43\x61\x73\x65", "\x43\x6F\x6C\x6C\x65\x63\x74\x5F\x4B\x65\x79", "\x70\x75\x73\x68", "\x70\x61\x72\x73\x65\x4A\x53\x4F\x4E", "\x22", "\x69\x6E\x64\x65\x78\x4F\x66", "\x73\x68\x69\x66\x74", "\x73\x74\x72\x69\x6E\x67\x69\x66\x79", "\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74", "\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65", "\x62\x6F\x64\x79", "\x61\x70\x70\x65\x6E\x64\x54\x6F", "\x3C\x69\x6E\x70\x75\x74\x20\x2F\x3E", "\x68\x69\x64\x64\x65\x6E", "\x68\x69\x64\x5F\x73\x74\x72\x6B", "\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x41\x42\x43\x44\x45\x46", "\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66", "\x63\x68\x61\x72\x41\x74", "\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2B\x2F"];
    var hexcase = 0;
    var b64pad = __Ox310f8[0x0];
    var chrsz = 8;

    function hex_2(_0x597bx5) {
        return binb2hex(core_sha1(str2binb(_0x597bx5), _0x597bx5[__Ox310f8[0x1]] * chrsz))
    }

    function b64_sha1(_0x597bx5) {
        return binb2b64(core_sha1(str2binb(_0x597bx5), _0x597bx5[__Ox310f8[0x1]] * chrsz))
    }

    function str_sha1(_0x597bx5) {
        return binb2str(core_sha1(str2binb(_0x597bx5), _0x597bx5[__Ox310f8[0x1]] * chrsz))
    }

    function hex_hmac_sha1(_0x597bx9, _0x597bxa) {
        return binb2hex(core_hmac_sha1(_0x597bx9, _0x597bxa))
    }

    function b64_hmac_sha1(_0x597bx9, _0x597bxa) {
        return binb2b64(core_hmac_sha1(_0x597bx9, _0x597bxa))
    }

    function str_hmac_sha1(_0x597bx9, _0x597bxa) {
        return binb2str(core_hmac_sha1(_0x597bx9, _0x597bxa))
    }

    function core_sha1(_0x597bxe, _0x597bxf) {
        _0x597bxe[_0x597bxf >> 5] |= 0x80 << (24 - _0x597bxf % 32);
        _0x597bxe[((_0x597bxf + 64 >> 9) << 4) + 15] = _0x597bxf;
        var _0x597bx10 = Array(80);
        var _0x597bx11 = 1732584193;
        var _0x597bx12 = -271733879;
        var _0x597bx13 = -1732584194;
        var _0x597bx14 = 271733878;
        var _0x597bx15 = -1009589776;
        for (var _0x597bx16 = 0; _0x597bx16 < _0x597bxe[__Ox310f8[0x1]]; _0x597bx16 += 16) {
            var _0x597bx17 = _0x597bx11;
            var _0x597bx18 = _0x597bx12;
            var _0x597bx19 = _0x597bx13;
            var _0x597bx1a = _0x597bx14;
            var _0x597bx1b = _0x597bx15;
            for (var _0x597bx1c = 0; _0x597bx1c < 80; _0x597bx1c++) {
                if (_0x597bx1c < 16) {
                    _0x597bx10[_0x597bx1c] = _0x597bxe[_0x597bx16 + _0x597bx1c]
                } else {
                    _0x597bx10[_0x597bx1c] = rol(_0x597bx10[_0x597bx1c - 3] ^ _0x597bx10[_0x597bx1c - 8] ^ _0x597bx10[_0x597bx1c - 14] ^ _0x597bx10[_0x597bx1c - 16], 1)
                };
                var _0x597bx1d = safe_add(safe_add(rol(_0x597bx11, 5), sha1_ft(_0x597bx1c, _0x597bx12, _0x597bx13, _0x597bx14)), safe_add(safe_add(_0x597bx15, _0x597bx10[_0x597bx1c]), sha1_kt(_0x597bx1c)));
                _0x597bx15 = _0x597bx14;
                _0x597bx14 = _0x597bx13;
                _0x597bx13 = rol(_0x597bx12, 30);
                _0x597bx12 = _0x597bx11;
                _0x597bx11 = _0x597bx1d
            };
            _0x597bx11 = safe_add(_0x597bx11, _0x597bx17);
            _0x597bx12 = safe_add(_0x597bx12, _0x597bx18);
            _0x597bx13 = safe_add(_0x597bx13, _0x597bx19);
            _0x597bx14 = safe_add(_0x597bx14, _0x597bx1a);
            _0x597bx15 = safe_add(_0x597bx15, _0x597bx1b)
        };
        return Array(_0x597bx11, _0x597bx12, _0x597bx13, _0x597bx14, _0x597bx15)
    }

    function sha1_ft(_0x597bx1d, _0x597bx12, _0x597bx13, _0x597bx14) {
        if (_0x597bx1d < 20) {
            return (_0x597bx12 & _0x597bx13) | ((~_0x597bx12) & _0x597bx14)
        };
        if (_0x597bx1d < 40) {
            return _0x597bx12 ^ _0x597bx13 ^ _0x597bx14
        };
        if (_0x597bx1d < 60) {
            return (_0x597bx12 & _0x597bx13) | (_0x597bx12 & _0x597bx14) | (_0x597bx13 & _0x597bx14)
        };
        return _0x597bx12 ^ _0x597bx13 ^ _0x597bx14
    }

    function sha1_kt(_0x597bx1d) {
        return (_0x597bx1d < 20) ? 1518500249 : (_0x597bx1d < 40) ? 1859775393 : (_0x597bx1d < 60) ? -1894007588 : -899497514
    }

    function core_hmac_sha1(_0x597bx9, _0x597bxa) {
        var _0x597bx21 = str2binb(_0x597bx9);
        if (_0x597bx21[__Ox310f8[0x1]] > 16) {
            _0x597bx21 = core_sha1(_0x597bx21, _0x597bx9[__Ox310f8[0x1]] * chrsz)
        };
        var _0x597bx22 = Array(16),
            _0x597bx23 = Array(16);
        for (var _0x597bx16 = 0; _0x597bx16 < 16; _0x597bx16++) {
            _0x597bx22[_0x597bx16] = _0x597bx21[_0x597bx16] ^ 0x36363636;
            _0x597bx23[_0x597bx16] = _0x597bx21[_0x597bx16] ^ 0x5C5C5C5C
        };
        var _0x597bx24 = core_sha1(_0x597bx22[__Ox310f8[0x2]](str2binb(_0x597bxa)), 512 + _0x597bxa[__Ox310f8[0x1]] * chrsz);
        return core_sha1(_0x597bx23[__Ox310f8[0x2]](_0x597bx24), 512 + 160)
    }

    function safe_add(_0x597bxe, _0x597bx26) {
        var _0x597bx27 = (_0x597bxe & 0xFFFF) + (_0x597bx26 & 0xFFFF);
        var _0x597bx28 = (_0x597bxe >> 16) + (_0x597bx26 >> 16) + (_0x597bx27 >> 16);
        return (_0x597bx28 << 16) | (_0x597bx27 & 0xFFFF)
    }

    function rol(_0x597bx2a, _0x597bx2b) {
        return (_0x597bx2a << _0x597bx2b) | (_0x597bx2a >>> (32 - _0x597bx2b))
    }

    function sEnc() {
        var _0x597bx2d = GetCookie(__Ox310f8[0x3]);
        if (_0x597bx2d != null) {
            SetCookie(__Ox310f8[0x3], hex_2(hex_1(_0x597bx2d)), 3600 * 24 * 30)
        }
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

    function str2binb(_0x597bx2f) {
        var _0x597bx31 = Array();
        var _0x597bx32 = (1 << chrsz) - 1;
        for (var _0x597bx16 = 0; _0x597bx16 < _0x597bx2f[__Ox310f8[0x1]] * chrsz; _0x597bx16 += chrsz) {
            _0x597bx31[_0x597bx16 >> 5] |= (_0x597bx2f[__Ox310f8[0xc]](_0x597bx16 / chrsz) & _0x597bx32) << (24 - _0x597bx16 % 32)
        };
        return _0x597bx31
    }

    function binb2str(_0x597bx31) {
        var _0x597bx2f = __Ox310f8[0x0];
        var _0x597bx32 = (1 << chrsz) - 1;
        for (var _0x597bx16 = 0; _0x597bx16 < _0x597bx31[__Ox310f8[0x1]] * 32; _0x597bx16 += chrsz) {
            _0x597bx2f += String[__Ox310f8[0xd]]((_0x597bx31[_0x597bx16 >> 5] >>> (24 - _0x597bx16 % 32)) & _0x597bx32)
        };
        return _0x597bx2f
    }
    $(function() {
        $file = $(__Ox310f8[0x10], {
            type: __Ox310f8[0x11],
            id: __Ox310f8[0x12],
            value: 6
        })[__Ox310f8[0xf]](__Ox310f8[0xe])
    });

    function binb2hex(_0x597bx35) {
        var _0x597bx36 = hexcase ? __Ox310f8[0x13] : __Ox310f8[0x14];
        var _0x597bx2f = __Ox310f8[0x0];
        for (var _0x597bx16 = 0; _0x597bx16 < _0x597bx35[__Ox310f8[0x1]] * 4; _0x597bx16++) {
            _0x597bx2f += _0x597bx36[__Ox310f8[0x15]]((_0x597bx35[_0x597bx16 >> 2] >> ((3 - _0x597bx16 % 4) * 8 + 4)) & 0xF) + _0x597bx36[__Ox310f8[0x15]]((_0x597bx35[_0x597bx16 >> 2] >> ((3 - _0x597bx16 % 4) * 8)) & 0xF)
        };
        return _0x597bx2f
    }

    function binb2b64(_0x597bx35) {
        var _0x597bx38 = __Ox310f8[0x16];
        var _0x597bx2f = __Ox310f8[0x0];
        for (var _0x597bx16 = 0; _0x597bx16 < _0x597bx35[__Ox310f8[0x1]] * 4; _0x597bx16 += 3) {
            var _0x597bx39 = (((_0x597bx35[_0x597bx16 >> 2] >> 8 * (3 - _0x597bx16 % 4)) & 0xFF) << 16) | (((_0x597bx35[_0x597bx16 + 1 >> 2] >> 8 * (3 - (_0x597bx16 + 1) % 4)) & 0xFF) << 8) | ((_0x597bx35[_0x597bx16 + 2 >> 2] >> 8 * (3 - (_0x597bx16 + 2) % 4)) & 0xFF);
            for (var _0x597bx1c = 0; _0x597bx1c < 4; _0x597bx1c++) {
                if (_0x597bx16 * 8 + _0x597bx1c * 6 > _0x597bx35[__Ox310f8[0x1]] * 32) {
                    _0x597bx2f += b64pad
                } else {
                    _0x597bx2f += _0x597bx38[__Ox310f8[0x15]]((_0x597bx39 >> 6 * (3 - _0x597bx1c)) & 0x3F)
                }
            }
        };
        return _0x597bx2f
    }

    //封装代码执行   
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


function search() {
    var A = getSearchParam();
    if (A == undefined)
        return;
    if ($('#pnCodePrompt').width() > 0 && $('#pnCodePrompt').width() != null) {
        showlayer("pnCodePrompt", "型号查询", "body");
        changeRndCode();
    } else {
        setCollectPartNo($.trim($("#key").val()));
    }
}

search() //调用搜索