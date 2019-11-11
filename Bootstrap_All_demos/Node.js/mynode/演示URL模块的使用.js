/**
 * 演示URL模块的使用   参考文档http://nodejs.cn/     node interpreter:C:\Program Files (x86)\nodejs\node.exe
 */
const url = require('url');   //引入指定模块

var str = 'http://tmooc.cn:8000/s.do?uname=mary&age=20#chapter3';

//var obj = url.parse(str);

var obj = url.parse(str, true); //true表示使用querystring模块把查询字符串解析为对象

console.log(obj);
console.log(obj.query.age);

/*
 Url {
 protocol: 'http:',
 slashes: true,
 auth: null,
 host: 'tmooc.cn:8000',
 port: '8000',
 hostname: 'tmooc.cn',
 hash: '#chapter3',
 search: '?uname=mary&age=20',
   query: 'uname=mary&age=20',
 pathname: '/s.do',
 path: '/s.do?uname=mary&age=20',
 href: 'http://tmooc.cn:8000/s.do?uname=mary&age=20#chapter3'
 }

 undefined

 Url {
 protocol: 'http:',
 slashes: true,
 auth: null,
 host: 'tmooc.cn:8000',
 port: '8000',
 hostname: 'tmooc.cn',
 hash: '#chapter3',
 search: '?uname=mary&age=20',
   query: { uname: 'mary', age: '20' },
 pathname: '/s.do',
 path: '/s.do?uname=mary&age=20',
 href: 'http://tmooc.cn:8000/s.do?uname=mary&age=20#chapter3'
 }

 20


 */