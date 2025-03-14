// 拦截 fetch 请求
(function() {
    let originalFetch = window.fetch;
    window.fetch = function(url, options) {
        return originalFetch(url, options).then(function(response) {
            console.log(response,'fetch    response ');
            // if (url.includes('/api/data')) {
            //     response.clone().text().then(function(data) {
            //         // 调用原生代码的回调函数
            //         window.harmony.handleApiResponse(data);
            //     });
            // }
            return response;
        });
    };
})();