/**
 * 使用Node.js读取一个文件中的内容
 */

var fs = require('fs');

//读取一个文件中的所有内容——同步读取
var buf = fs.readFileSync('htdocs/1.html');
//console.log(buf);  //输出为<Buffer ...>
//console.log(buf.toString());  //把缓冲区中数据转换为字符串/

fs.readFile('htdocs/1.html', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});