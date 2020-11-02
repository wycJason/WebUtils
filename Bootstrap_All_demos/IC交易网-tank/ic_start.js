var thisUrl = window.location.href.toLowerCase();
var Asy_Path = Public_Path;
if (thisUrl.indexOf('member.') > 0) {
    Asy_Path = Main_Path;
}
var searchOption = {
    opt: "",
    index: 0
};
function searchSelect(A) {
    searchOption.opt = $(".his_list li");
    searchOption.opt.removeClass("selected");
    var B = A.keyCode;
    B = B.toString();
    switch (B) {
    case '40':
        if (searchOption.index < searchOption.opt.length) {
            searchOption.index++;
        }
        searchOption.opt.eq(searchOption.index - 1).addClass("selected");
        if ($('.his_list').css('display') != 'none') {
            $('#key').val(searchOption.opt.eq(searchOption.index - 1).find('span').html());
        }
        break;
    case '38':
        if (searchOption.index > 1) {
            searchOption.index--;
        }
        searchOption.opt.eq(searchOption.index - 1).addClass("selected");
        if ($('.his_list').css('display') != 'none') {
            $('#key').val(searchOption.opt.eq(searchOption.index - 1).find('span').html());
        }
        break;
    default:
        searchOption.opt = $(".his_list li");
        searchOption.index = 0;
    }
}
$(function() {
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
    $('#btn_searchAgain').click(function() {
        var C = $.trim($('#pnCode').val());
        if (C == '') {
            $('.vfc_error').show();
            $('.vfc_error').html('请输入验证码.');
            return;
        }
        var A = getSearchParam();
        $.ajax({
            type: 'get',
            url: Asy_Path + '/asyncCall/global.asy.php',
            data: 'IC_Method=checkpnrandcode&RndCode=' + C,
            dataType: 'text',
            timeout: 5000,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                setCollectPartNo($.trim($("#key").val()));
                sEnc();
                location.href = Public_Path + '/search.php?' + A;
            },
            success: function(E) {
                var E = $.trim(E.replace("\r", "").replace("\n", ""));
                if (E == '') {
                    $('.vfc_error').hide();
                    setCollectPartNo($.trim($("#key").val()));
                    sEnc();
                    location.href = Public_Path + '/search.php?' + A;
                } else {
                    $('.vfc_error').show();
                    $('.vfc_error').html('验证码错误, 请重新输入!');
                }
            }
        });
    });
    hotkey();
    $("#key").bind("blur", function() {
        searchOption.index = 0;
        if (searchOption.opt != '') {
            searchOption.opt.removeClass("selected");
        }
        $(document).unbind("keydown", searchSelect);
    });
    $(document).bind('click', function() {
        $(".his_list").hide();
    });
    $('.search').bind('click', function(event) {
        event.stopPropagation();
    });
    $("#key").bind("focus", function() {
        $(document).bind("keydown", searchSelect);
        var F = $.trim($(this).val());
        F = F.replace('找IC  搜一下', '');
        getSearchBarTips(F);
        $(".search").bind("mouseleave", function() {
            $(".his_list").hide();
        });
    });
    $(".his_list").bind("click", function(event) {
        if ($(event.target).hasClass("dele")) {
            var G = $(event.target).parents("li").find('span').html();
            var H = GetCookieIndex('SearchLog', G);
            DelCookieForArgs('SearchLog', H, '');
            $(event.target).parents("li").hide();
        }
    });
    $('#searchClose').click(function() {
        $('.his_list').hide();
    });
    $("#key").bind('keyup', function(event) {
        if (event.keyCode != 38 && event.keyCode != 40) {
            var F = $.trim($(this).val());
            getSearchBarTips(F);
        }
    });
});
function getSearchBarTips(A) {
    if (A != '')
        A = encodeURIComponent(A);
    var B;
    B = setTimeout(function() {
        $.ajax({
            type: 'get',
            url: Asy_Path + '/asyncCall/search.asy.php',
            data: 'IC_Method=getsearchlist&Key=' + A,
            dataType: 'json',
            C: function(XMLHttpRequest, textStatus, errorThrown) {},
            success: function(msg) {
                var C = msg.error;
                if ($.trim(C) == '') {
                    var D = msg.logList;
                    var E = msg.pnList;
                    if (D.length == 0 && E.length == 0) {
                        if ($(".his_list li").length == 0) {
                            $(".his_list").hide();
                        } else {
                            $(".his_list").show();
                        }
                    } else {
                        $(".his_list").show();
                        $('#historyUL').find('li').remove();
                        $('#searchUL').find('li').remove();
                        var F = '';
                        for (var G = 0; G < D.length; G++) {
                            var H = D[G];
                            var I = "showIC('" + H + "');";
                            F = F + '<li><span class="his_id" onclick="' + I + '">' + H + '</span><div class="history"><div class="record">历史记录</div><div class="dele">删除</div></div></li>';
                        }
                        $('#historyUL').append(F);
                        var J = '';
                        for (var G = 0; G < E.length; G++) {
                            var H = E[G].F_PartNo;
                            var M = E[G].F_Count;
                            var I = "showIC('" + H + "');";
                            var O = '<li onclick="' + I + '"><span class="his_id">' + H + '</span><div class="number"> 约' + M + '条 </div></li>';
                            J = J + O;
                        }
                        $('#searchUL').append(J);
                        if (D.length == 0) {
                            $('#historyUL').hide();
                        } else {
                            $('#historyUL').show();
                        }
                        if (E.length == 0) {
                            $('#searchUL').hide();
                        } else {
                            $('#searchUL').show();
                        }
                    }
                } else {}
            }
        });
    }, 50);
}
function showIC(A) {
    var B = $.trim(A);
    B = B.toUpperCase();
    $('#key').val(B);
    B = encodeURIComponent(B);
    setCollectPartNo(A);
    sEnc();
    var C = 'IC_Method=icsearch&key=' + B + '&isExact=0' + '&mfg=&pack=&dc=&qty=' + '&searchAreaCode=0' + '&stockDate=90&stockType=0';
    location.href = Public_Path + '/search.php?' + C;
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
$(document).keyup(function(A) {
    if ($('#pnCodePrompt').width() > 0 && $('#pnCodePrompt').width() != null && $('#pnCodePrompt').css('display') == 'block') {
        if (A.keyCode == 13) {
            $("#btn_searchAgain").trigger("click");
        }
    } else if (thisUrl.indexOf('search.php') > 0 || thisUrl.indexOf('searchnic.php') > 0) {
        if ($('#login_content').css('display') == 'none') {
            var B = $.trim($('#key').val());
            B = B.toUpperCase();
            if (B == '找IC  搜一下')
                B = '';
            if (A.keyCode == 13 && B != '') {
                $("#btn_topSearch").trigger("click");
            }
        } else if ($('#login_content').css('display') == 'block') {
            if (A.keyCode == 13) {
                userLogin();
            }
        } else {
            if (A.keyCode == 13) {
                return;
            }
        }
    } else {
        var B = $.trim($('#key').val());
        B = B.toUpperCase();
        if (B == '找IC  搜一下')
            B = '';
        if (A.keyCode == 13 && B != '') {
            $("#btn_topSearch").trigger("click");
        }
    }
});
var hotkey = function() {
    var A = 18;
    var B = 81;
    var C = false;
    $(document).bind("keydown", find_keydown);
    function find_keydown(e) {
        if (e.keyCode == A && C == false) {
            C = true;
            $(window).bind("keyup", find_keyup);
        }
        if (e.keyCode == B && C == true) {
            C = false;
            $(window).unbind("keyup");
            focus_search();
        }
    }
    function find_keyup(e) {
        if (e.keyCode == A && C) {
            C = false;
            $(window).unbind("keyup");
        }
    }
    function focus_search() {
        $(window).scrollTop(0);
        $("#key").focus();
        $("#key").select();
    }
};
function pageToAutoQuoteList(A) {
    setCollectPartNo(A);
    sEnc();
    window.open(AutoQuote_Path + '/autoQuote/autoQuote_resultList.php?partno=' + encodeURIComponent(A));
}
