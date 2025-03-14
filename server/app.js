/* 
nodemon 是一种工具，可在检测到目录中的文件更改时通过自动重新启动节点应用程序来帮助开发基于 node.js 的应用程序。
nodemon 监听app.js文件
bodyParser 转码工具
*/
const express = require('express');
const bodyParser = require('body-parser');
const postFun = require('./server/post')
const getFun = require('./server/get')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 实现请求
app.post('/getStudents', postFun);
app.get('/getData', getFun);
// 监听8081端口
app.listen('8081', () => {
	console.log('sever is 8081');
});


