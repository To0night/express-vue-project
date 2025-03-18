function onNotFound(callback) {
    const observer = new MutationObserver(() => {
        if (document.body.innerText.includes("404")) {
            console.log("检测到 404 页面，触发订阅");
            callback();
            observer.disconnect(); // 停止监听
        }
    });

    function restartObserver() {
        setTimeout(() => {
            if (!document.body.innerText.includes("404")) {
                console.log("页面恢复，重新启用监听");
                observer.observe(document.body, { childList: true, subtree: true });
            }
        }, 500);
    }

    observer.observe(document.body, { childList: true, subtree: true });

    const originalPushState = history.pushState;
    history.pushState = function (...args) {
        originalPushState.apply(this, args);
        restartObserver();
    };

    const originalReplaceState = history.replaceState;
    history.replaceState = function (...args) {
        originalReplaceState.apply(this, args);
        restartObserver();
    };

    window.addEventListener("popstate", restartObserver);
    
    // 退出页面时，移除监听
    window.addEventListener("beforeunload", () => {
        console.log("页面即将关闭，移除 MutationObserver 监听");
        observer.disconnect();
    });
}

// 使用订阅
onNotFound(() => {
    console.log("订阅触发：用户进入 404 页面");
});



function handleErrorHref () {
    if (window.myHrefListenerFun) {
      return
    }
    console.log('监听页面url变化');
    function restartObserver() {
      if (window.location.href.includes("/reservations/booking-summary")) {
        console.log('错误页面href', window.location.href);
        window.alert('错误页面href:' + window.location.href)
      }
    }
    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      const previousHref = window.location.href;
      originalPushState.apply(this, args);
      if (previousHref !== window.location.href) {
        restartObserver();
      }
    };
    const originalReplaceState = history.replaceState;
    history.replaceState = function (...args) {
      const previousHref = window.location.href;
      originalReplaceState.apply(this, args);
      if (previousHref !== window.location.href) {
        restartObserver();
      }
    };
    window.addEventListener("hashchange", restartObserver); // 监听 hash 变化
    window.addEventListener("popstate", restartObserver); // 监听前进、后退
    window.myHrefListenerFun = true // 防止重复执行
  }
  handleErrorHref ()