function getFun (req, res) {
    const { type } = req.params;
    const resData = type === 'number' ? [1, 2, 3, 4, 5] : ['sss', 'aaa', 'bbb'];
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

module.exports = getFun;