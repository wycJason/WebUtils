/**
 * Created by Administrator on 2016/11/17.
 */
function loadUserList() {
    var postData ='[{"Cond":0,"Value":1}]';
    $.ajax({
        url: "/Home/UserList",
        type: "POST",
        data: { "PostJson": postData },
        dataType: 'json',
        beforeSend: function () { ly = layer.load('正在请求...'); },
        success: function (res) {
            console.log(res);
            layer.close(ly);
            var dataArr = JSON.parse(res.Data).Result;
            console.log(dataArr);
            $.each(dataArr, function (k,v) {
                console.log("名称："+v.UserName+",ID:"+v.UserSign);
            });
        },
        error: function (err) {
            layer.msg('网络请求失败！', { icon: 2 });
        }
    });
}


console.log(0)