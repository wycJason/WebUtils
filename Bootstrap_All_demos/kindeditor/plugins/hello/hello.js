/**
 * Created by jason on 2019/6/12.
 */
KindEditor.plugin('hello', function(K) {//'hello'指 hello.js插件
    var editor = this, name = 'hello';//插件名称
    // 点击图标时执行
    editor.clickToolbar(name, function() {
        editor.insertHtml('你好');
    });
});