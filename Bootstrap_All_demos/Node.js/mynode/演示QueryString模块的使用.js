/**
 * 演示QueryString模块的使用
 */

//require函数用于引入一个Node.js的模块
var qs = require('querystring');

//console.log(qs);

//解析一个HTTP请求消息中的查询字符串
var str = 'uname=tom&upwd=123&age=20';
var obj = qs.parse(str);    //解析查询字符串

var objStr=qs.stringify({
    name:"jason",
    age:28
})
console.log(obj,objStr);
