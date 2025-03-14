(function () {
    const originalXHR = window.XMLHttpRequest;
    function CustomXHR() {
      const xhr = new originalXHR();
      // 重写 open 方法
      const originalOpen = xhr.open;
      xhr.open = function (method, url) {
        originalOpen.apply(xhr, arguments);
      };

      // 重写 send 方法
      const originalSend = xhr.send;
      xhr.send = function (body) {
        originalSend.apply(xhr, arguments);
      };

      // 监听 readystatechange 事件
      xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4) {
          console.log('xhr: ', xhr)
          if (xhr.status >= 200 && xhr.status < 300) {
            // 请求成功，检查响应数据
            try {
              let response = JSON.parse(xhr.responseText);
              if (response.error) {
                // 处理接口报错
                handleApiError(xhr);
              }
            } catch (e) {
              console.error('Failed to parse response:', e);
            }
          } else {
            // 请求失败，处理HTTP错误
            handleHttpError(xhr);
          }
        }
      });
      return xhr;
    }
    // 替换全局的XMLHttpRequest
    window.XMLHttpRequest = CustomXHR;

    // 处理接口报错的函数
    function handleApiError(xhr) {
      const { error, _url, _requestData } = xhr
      console.error('API Error:', error);
      console.log('Request URL:', _url);
      console.log('Request Data:', _requestData);
      // 这里可以添加自定义的错误处理逻辑，比如显示错误提示、重试请求等
      // 如 修改响应数据
      // const modifiedResponse = xhr.responseText.replace('foo', 'bar');
      // Object.defineProperty(xhr, 'responseText', {
      //   value: modifiedResponse,
      //   writable: true
      // });
    }

    // 处理HTTP错误的函数
    function handleHttpError(xhr) {
      const { status, statusText, _url, _requestData } = xhr
      console.error('HTTP Error:', status, statusText);
      console.log('Request URL:', _url);
      console.log('Request Data:', _requestData);
      // 这里可以添加自定义的错误处理逻辑，比如显示错误提示、重试请求等
    }
  })();


  