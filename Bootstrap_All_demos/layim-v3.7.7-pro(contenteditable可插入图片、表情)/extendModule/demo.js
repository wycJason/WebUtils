/**
 * Created by jason on 2018/9/10.
 */
layui.define("layer",function(exports){
    //do something
    var layer = layui.layer;
    exports('demo', function(){
        layer.alert('这是自定义扩展模块!');
    });
});