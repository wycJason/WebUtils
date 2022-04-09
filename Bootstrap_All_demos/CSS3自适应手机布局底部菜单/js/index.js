var blo = '20%';
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        blo = '70%';
        $('#left_menu').css('width',blo);
    }
}
browserRedirect();


$('#footer ul li ').on('click',function(){

    $('#footer ul li ').removeClass('current');
    $(this).addClass('current');

    switch($(this).index())
    {
        case 0:
            $("#content_page div").removeClass('cur');
            $("#page1").addClass('cur');
            $("#content_page div").stop().animate({'margin-left': '0%'}, 500);
            break;
        case 1:
            $("#content div").removeClass('cur');
            $("#page2").addClass('cur');
            $("#content_page div").stop().animate({'margin-left': '-100%'}, 500);
            break;
        case 2:
            $("#content div").removeClass('cur');
            $("#page3").addClass('cur');
            $("#content_page div").stop().animate({'margin-left': '-200%'}, 500);
            break;
        case 3:
            $("#content div").removeClass('cur');
            $("#page4").addClass('cur');
            $("#content_page div").stop().animate({'margin-left': '-300%'}, 500);
            break;

    }
});

$('.head-left').on('click',function(){

    var val = $(this).attr('value');
    if(val == 'none'){
        $("#right_content").stop().animate({'left': blo}, 300);
        $(this).attr('value','block');
    }else{
        $("#right_content").stop().animate({'left': '0%'}, 300);
        $(this).attr('value','none');
    }

});
$('#right_content').bind('swiperight',function(){
    var val = $('#head-left').attr('value');
    if(val == 'none'){
        $("#right_content").stop().animate({'left': blo}, 300);
        $('#head-left').attr('value','block');
    }else{

    }
});
$('#right_content').bind('swipeleft',function(){
    var val = $('#head-left').attr('value');
    if(val == 'none'){

    }else{
        $("#right_content").stop().animate({'left': '0%'}, 300);
        $('#head-left').attr('value','none');
    }
});