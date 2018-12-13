/*使用Node.js创建一个动态Web服务器——难点
动态Web服务器：可以接收客户端提交的内容，访问数据库，动态的生成响应内容。
提示：上述程序需要用到http、url、fs、mysql模块
运行过程：
1)创建一个HTTP Server
2)为Server指定处理请求消息的过程
    2.1)解析请求URL中的资源名称， 如 /login.html或/login.do
    2.2)若请求资源名称以.html结尾，直接读取指定文件中的内容，如 htdocs/login.html，作为响应消息数据； 若请求资源名称以.do结尾，解析请求数据，访问数据库，把执行结果作为响应消息数据。
    2.3)构建响应消息，把读取到的文件内容输出客户端
3)让Server开始监听特定端口*/

/*Url {
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
}*/

/**
 * 使用Node.js创建一个动态Web服务器，相当于之前的Apache+PHP;
 * 根据客户端.html或.do请求，执行不同的操作
 */
var http = require('http');     //创建HTTP服务器
var url = require('url');       //URL地址解析
var fs = require('fs');         //文件读取
var mysql = require('mysql');   //数据库访问   下载到的第三方模块要想使用，必须保存在同级目录下的名为node_modules的目录下。 node_modules----mysql

//1 创建一个HTTP Server
var server = http.createServer();

//2 为Server指定处理请求消息的过程
server.on('request', function(request, response) {

    //2.1)解析请求URL中的资源名称， 如 /login.html或 /login.do
    var urlObj = url.parse( request.url , true);
    var fileName = urlObj.pathname; //请求的文件名称
    if(fileName=='/favicon.ico'){
        response.end();  //结束输出
        return;  //不处理图标文件的请求
    }

    //2.2)根据客户端请求资源的类型，如.html或.do，分别处理
    var suffix = fileName.substring(fileName.lastIndexOf('.'));//文件中从最后一个.开始的子串  .html 或 .do
    if(suffix=='.html'){    //静态请求
        doStaticRequest();
    }else if(suffix=='.do'){    //动态请求
        doDynamicRequest();
    }

    function doStaticRequest(){ //服务器处理静态请求
        fileName = 'htdocs'+fileName;
        var buf = fs.readFileSync(fileName);
        response.end(buf); //输出静态内容并结束输出
    }
    function doDynamicRequest(){ //服务器处理动态请求
        if(fileName=='/login.do'){
            doLogin();
        }else if(fileName=='/register.do'){
            //读取指定文件中的内容，如 htdocs/register.html
            //var buf = fs.readFileSync('htdocs/register.html');
            //构建响应消息，把读取到的文件内容输出客户端
           // response.writeHead(200, {'Content-Type':'text/html;charset=UTF-8'});
            //response.write(buf);  //输出响应主体
            //response.end();  //结束输出
            doRegister();
        }
    }

    //处理动态请求——用户注册
    function doRegister(){
        //从请求查询字符中读取客户端提交的数据
        var uname = urlObj.query.uname;
        var upwd = urlObj.query.upwd;
        //连接数据库，提交INSERT语句
        var conn = mysql.createConnection({
            host        :   '127.0.0.1',
            user        :   'root',
            password    :   '',
            database    :   'tedu'
        });
        var sql = `INSERT INTO t_user VALUES(NULL,'${uname}','${upwd}')`;
        conn.query(sql, function(err,result){
            //执行成功后，向客户端输出注册提示消息
            response.end(`Register Success! New UID:${result.insertId}`);
        });
        conn.end();
    }
    //处理动态请求——用户登录
    function doLogin(){
        //从请求查询字符中读取客户端提交的数据
        var uname = urlObj.query.uname;
        var upwd = urlObj.query.upwd;
        //连接数据库，提交INSERT语句
        var conn = mysql.createConnection({
            host        :   '127.0.0.1',
            user        :   'root',
            password    :   '',
            database    :   'tedu'
        });
        var sql = `SELECT * FROM t_user WHERE uname='${uname}' AND upwd='${upwd}'`;
        conn.query(sql, function(err,result){
            //执行成功后，向客户端输出登录提示消息
            response.write(`Login Success!\n`);

            //执行成功后，向控制台输出登录提示消息
            console.log('SELECT语句执行完成')
            console.log(result); // [ {},{},{} ] 行对象
            for(var i=0; i<result.length; i++){
                var u = result[i];
                console.log(`${u.uid}  ${u.uname}  ${u.upwd}`);
                response.end(`Login Success!User is: ${u.uid}  ${u.uname}  ${u.upwd} \n`);
            }
        });
        conn.end();
    }
});

//3 让Server开始监听特定端口
server.listen(9999, function(){
    console.log('动态Web服务器开始监听9999端口');
});

//测试
//  http://localhost:9999/login.html    http://localhost:9999/register.html
//  http://localhost:9999/register.do?uname=jason&upwd=123456
//  http://localhost:9999/login.do?uname=jason&upwd=123456