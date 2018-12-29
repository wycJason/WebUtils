/*使用Node.js创建一个静态Web服务器
1)创建一个HTTP Server
2)为Server指定处理请求消息的过程
    2.1)解析请求URL中的资源名称， 如 /login.html
    2.2)读取指定文件中的内容，如 htdocs/login.html
    2.3)构建响应消息，把读取到的文件内容输出客户端
3)让Server开始监听特定端口
提示：上述程序需要用到http、url、fs模块*/


/**
 * 使用Node.js创建一个静态Web服务器
 * 根据客户端请求的页面名称，输出对应的文件内容
 */

/*Url {
 protocol: 'http:',
 slashes: true,  // 斜杠语法
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
 }*/

var http = require('http');
var url = require('url');
var fs = require('fs');

//1 创建一个HTTP Server
var server = http.createServer();

//2 为Server指定处理请求消息的过程
server.on('request', function(request, response) {

    //2.1)解析请求URL中的资源名称， 如 /login.html
    var urlObj = url.parse( request.url , true);
    var fileName = urlObj.pathname; //请求的文件名称
    if(fileName=='/favicon.ico'){
        console.log(" pathname: '/favicon.ico")
        response.end();  //结束输出
        return;  //不处理图标文件的请求
    }
    fileName = 'htdocs'+fileName; //请求文件的实际路径   如 htdocs/login.html

    //2.2)读取指定文件中的内容，如 htdocs/login.html
    var buf = fs.readFileSync(fileName);

    //2.3)构建响应消息，把读取到的文件内容输出客户端
    response.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
    response.write(buf);  //输出响应主体
    response.end();  //结束输出
});

//3 让Server开始监听特定端口
server.listen(3000, function(){
    console.log('静态Web服务器开始监听3000端口');
});

//测试输出：     http://localhost:3000/login.html    http://localhost:3000/favicon.ico