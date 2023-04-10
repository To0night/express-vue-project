/* 
nodemon 是一种工具，可在检测到目录中的文件更改时通过自动重新启动节点应用程序来帮助开发基于 node.js 的应用程序。
nodemon 监听app.js文件
bodyParser 转码工具
*/
const express = require('express');
const bodyParser = require('body-parser');
const studentData = require('./student.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 实现post请求
app.post('/getStudents', (req, res) => {
	// type: greater equal less
	// score: input -> 分数
	const { type, score } = req.body;
	const [_type, _score] = checkBody(type, score);
	const resData = getData(_type, _score);
	if (resData.length === 0) {
		res.send({
			errorNo: 0,
			errorMsg: 'No data',
		});
		return;
	} else {
		res.send({
			errorNo: 1,
			data: resData,
		});
	}
});

// 监听8081端口
app.listen('8081', () => {
	console.log('sever is 8081');
});

// 检查请求body参数
function checkBody(type, score) {
	return [checkType(type), checkScore(score)];
	function checkType(type) {
		return ['greater', 'equal', 'less'].includes(type) ? type : 'equal';
	}
	function checkScore(score) {
		const _score = Number(score);
		return isNaN(_score) ? 0 : _score;
	}
}
// 处理参数并返回数据
function getData(type, score) {
	switch (type) {
		case 'greater':
			return studentData.filter((i) => i.score > score);
		case 'equal':
			return studentData.filter((i) => i.score == score);
		case 'less':
			return studentData.filter((i) => i.score < score);
	}
}
