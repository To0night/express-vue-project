const studentData = require('../static/json/student.json');
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

function postFun (req, res) {
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
}

module.exports = postFun;