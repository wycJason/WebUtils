/**
 * 使用MySQL模块，连接数据库，执行INSERT语句
 */
var mysql = require('mysql');
//require中的第三方模块名必须与node_modules目录下的文件夹名一致
//console.log(mysql);

//1 创建到数据库服务器的连接
var conn = mysql.createConnection({
    host       :    '127.0.0.1',
    user       :    'root',
    password   :    '',
    database   :    'jd'
});

//2 提交SQL语句给服务器执行
var sql = "INSERT INTO jd_user VALUES(NULL,'king','999')";
conn.query(sql, function(err, result){
    console.log('SQL语句执行完成')
    console.log(`SQL语句影响的行数： ${result.affectedRows}`);
    console.log(`INSERT产生在自增编号： ${result.insertId}`);
});

//3 断开连接
conn.end();