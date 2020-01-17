/**
 * 使用http模块接收客户端请求消息
 *
 * 演示QueryString模块的使用  参考文档http://nodejs.cn/
 * node interpreter: C:\Program Files (x86)\nodejs\node.exe
 *
 */

const http = require('http');
const url = require('url');

//创建一个Web服务器 —— 创建一个面包售货员
const server = http.createServer();

//让Web服务器能够处理客户端连接请求——岗前培训
server.on('request', function(request, response){
    console.log('Node.js Web服务器接收到一个HTTP请求消息');
    //console.log(arguments.length,arguments[0],arguments[1], arguments);
    console.log(`请求Request：${request}`);
    console.log(`请求Method：${request.method}`);
    console.log(`请求URL：${request.url}`)
    console.log('请求URL数据：')
    var obj = url.parse(request.url,  true);
    console.log(obj);  //query / pathname

    console.log(`请求头部：`);
    console.dir(request.headers);
});
//练习：使用url模块解析出请求URL中的：
// (1) 请求资源的名称
// (2) 查询字符串数据

//让Web服务器开始监听指定端口——开始上岗
server.listen(8888, function(){
    console.log('Node.js Web服务器开始监听8888端口...')
})

// 1.启动脚本；
// 2.在本机地址栏输入：http://localhost:8888/
// 3.返回脚本查看；