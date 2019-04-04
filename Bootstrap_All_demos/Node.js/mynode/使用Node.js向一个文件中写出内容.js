/**
 * 使用Node.js向一个文件中写出内容
 */

var fs = require('fs');

var txt = '系统日志：'+new Date()+'\n';

//同步地将数据追加到文件app.log，如果文件app.log尚不存在则创建该文件

//向文件中写出内容——覆盖指定文件已有的全部内容
//fs.writeFileSync('htdocs/app.log',txt);
//console.log('文件写出完成');

//向文件中追加写出内容——不会覆盖已有内容
fs.appendFileSync('htdocs/app.log',txt);
console.log('文件追加完成');
