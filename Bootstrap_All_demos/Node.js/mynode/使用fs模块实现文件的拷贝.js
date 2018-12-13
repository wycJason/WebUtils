/**
 * 使用fs模块实现文件的拷贝
 */

var fs = require('fs');

var src = 'htdocs/1.html';   //源
var dest = 'htdocs/11.html'; //目标

//读取文件内容
var buf = fs.readFileSync(src);
//写出文件内容
fs.writeFileSync(dest, buf);

console.log('文件复制完成');