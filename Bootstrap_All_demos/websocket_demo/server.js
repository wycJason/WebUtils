/**
 * Created by jason on 2018/10/8.
 * Node解释器，C:\Program Files (x86)\nodejs\node.exe
 */
var app=require('http').createServer(handler);
var ws=require('nodejs-websocket');//切换到顶级目录安装模块 npm install websocket  然后再引用
var fs=require('fs');
app.listen(80);
function handler(req,res){
    fs.readFile(__dirname+'/client.html',function(err,data){
        if(err){
            res.writeHead(500);
            return res.end('error ');
        }
        res.writeHead(200);
        res.end(data);
    });
}
var server=ws.createServer(function(conn){
    console.log('new conneciton');
    conn.on("text",function(str){
        broadcast(server,str);
    });
    conn.on("close",function(code,reason){
        console.log('connection closed');
    })
}).listen(5000);

function broadcast(server, msg) {
    server.connections.forEach(function (conn) {
        conn.sendText(msg);
    })
}