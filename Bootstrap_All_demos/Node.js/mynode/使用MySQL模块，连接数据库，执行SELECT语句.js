/**
 * 使用MySQL模块，连接数据库，执行SELECT语句
 */
var mysql = require('mysql');
//require中的第三方模块名必须与node_modules目录下的文件夹名一致

//1 创建到数据库服务器的连接
var conn = mysql.createConnection({
    host       :    '127.0.0.1',
    user       :    'root',
    password   :    '',
    database   :    'jd'
});

//2 提交SQL语句给服务器执行
var sql = "SELECT * FROM jd_user";
conn.query(sql, function(err, result){
    console.log('SELECT语句执行完成')
    console.log(result); // [ {},{},{} ] 行对象
    for(var i=0; i<result.length; i++){
        var u = result[i];
        console.log(`${u.uid}  ${u.userName}  ${u.age}`);
    }
});

//3 断开连接
conn.end();