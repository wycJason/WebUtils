/**
 * Created by jason on 2018/9/10.
 */
layui.define("layer",function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    var layer = layui.layer;
    var obj = {
        hello: function(str){
            layer.alert('Hello '+ (str||'mymod'));
        }
    };

    //输出mymod接口
    exports('mymod', obj);
});