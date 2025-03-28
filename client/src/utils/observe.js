
// 方案一
// (function () {
//     // 1. 创建 MutationObserver 实例
//     const observer = new MutationObserver((mutationList) => {
//         mutationList.forEach((mutation) => {
//             if (mutation.type === 'attributes' && mutation.attributeName === 'href') {
//                 console.log("检测到 DOM href 变动:", mutation);
//             } else {
//                 console.log("检测到 DOM 变动:", mutation);
//             }

//         });
//     });

//     // 2. 选择要观察的目标节点
//     const targetNode = document.body;

//     // 3. 配置观察选项
//     const config = {
//         childList: true,  // 监听直接子节点的增删
//         subtree: true,    // 监听所有子孙节点
//         attributes: true,  // 监听属性变化
//         attributeFilter: ["href"], // 仅监听 `href` 变动
//     };

//     // 4. 开始监听
//     observer.observe(targetNode, config);

//     // observer.disconnect(); // 停止监听
// })()

// 方案二
// (function () {
//     console.log('监听页面url变化');
//     const observer = new MutationObserver(() => {
//         if (window.location.href.includes("/reservations/booking-summary")) {
//             console.log("检测到错误页面，触发订阅");
//             window.alert('检测到错误页面，触发订阅')
//             observer.disconnect(); // 停止监听
//         }
//     });

//     function restartObserver() {
//         if (document.body.innerText.includes("/reservations/booking-summary")) {
//             console.log("页面恢复，重新启用监听");
//             observer.observe(document.body, { childList: true, subtree: true });
//         }
//     }

//     observer.observe(document.body, { childList: true, subtree: true });

//     const originalPushState = history.pushState;
//     history.pushState = function (...args) {
//         const previousHref = window.location.href;
//         originalPushState.apply(this, args);
//         if (previousHref !== window.location.href) {
//             restartObserverDebounced();
//         }
//     };
//     const originalReplaceState = history.replaceState;
//     history.replaceState = function (...args) {
//         const previousHref = window.location.href;
//         originalReplaceState.apply(this, args);
//         if (previousHref !== window.location.href) {
//             restartObserverDebounced();
//         }
//     };

//     window.addEventListener("popstate", restartObserver);

//     // 退出页面时，移除监听
//     window.addEventListener("beforeunload", () => {
//         console.log("页面即将关闭，移除 MutationObserver 监听");
//         observer.disconnect();
//     });
// })()


// 方案三
// (function () {
//     // 存储检测到的订阅信息
//     let detectedSubscriptions = new Set();

//     // 验证 href 是否符合预期
//     function validateHref(href) {
//         // 这里可以根据实际需求定义验证规则，例如404 not found
//         // return href.includes('404') || href.includes('403');
//         return href
//     }

//     function findAndHandleTags(node, result = []) {
//         // 如果当前节点是 <a> 标签，添加到detectedSubscriptions
//         if (node.tagName === 'A' && node.href) {
//             const href = node.href;
//             if (validateHref(href)) {
//                 console.log('检测到a标签链接:', href);
//                 detectedSubscriptions.add(href);
//                 node.addEventListener('click', (event) => {
//                     console.log(event, 'a标签元素');
//                     event.preventDefault(); // 阻止默认跳转 点击被拦截
//                 }, true)
//             }
//         }
//         // 递归遍历子节点
//         for (const child of node?.children || []) {
//             child && findAndHandleTags(child, result);
//         }
//         return detectedSubscriptions;
//     }
//     // 创建 MutationObserver 实例
//     const observer = new MutationObserver((mutationsList, observer) => {
//         for (const mutation of mutationsList) {
//             if (mutation.type === 'childList') {
//                 mutation.addedNodes.forEach(node => {
//                     console.log(node, '节点node');
//                     findAndHandleTags(node)
//                 })
//             }

//         }
//     });
//     observer.observe(document.body, { childList: true, subtree: true });

//     function restartObserver() {
//         setTimeout(() => {
//             if (!document.body.innerText.includes("404")) {
//                 console.log("页面恢复，重新启用监听");
//                 observer.observe(document.body, { childList: true, subtree: true });
//             }
//         }, 500);
//     }

//     const originalPushState = history.pushState;
//     history.pushState = function (...args) {
//         originalPushState.apply(this, args);
//         restartObserver();
//     };

//     const originalReplaceState = history.replaceState;
//     history.replaceState = function (...args) {
//         originalReplaceState.apply(this, args);
//         restartObserver();
//     };

//     window.addEventListener("popstate", restartObserver);

//     // 退出页面时，移除监听
//     window.addEventListener("beforeunload", () => {
//         console.log("页面即将关闭，移除 MutationObserver 监听");
//         observer.disconnect();
//     });
// })()

// (function () {
//     function findAndHandleTags(node, result = []) {
//         // 如果当前节点是 <a> 标签，添加到detectedSubscriptions
//         if (node.tagName === 'A' && node.href) {
//             const href = node.href;
//             result.push(href)
//         }
//         // 递归遍历子节点
//         for (const child of node.children) {
//             findAndHandleTags(child, result);
//         }
//         return result;
//     }
//     const result = findAndHandleTags(document.body)
//     console.log(result, 1111);
// })()

// (function () {
//     // 验证 href 是否有效
//     function validateHref(element) {
//         const href = element.href;
//         if (!href) return;
//         // 模拟验证（实际项目中可以使用 fetch 或 XMLHttpRequest）
//         fetch(href, { method: 'HEAD' })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('资源加载失败');
//                 }
//             })
//             .catch((error) => {
//                 console.warn('资源加载失败:', href);
//                 detectedFailures++;
//                 showDefaultPage();

//                 // 替换为缺省内容
//                 if (element.tagName === 'A') {
//                     element.textContent = '链接无效，点击返回首页';
//                     element.href = '/';
//                 } else if (element.tagName === 'LINK') {
//                     element.remove(); // 移除无效的样式表
//                 }
//             });
//     }
//     // 递归搜素a标签
//     function findAndHandleTags(node, result = []) {
//         if (node.tagName === 'A' && node.href) {
//             validateHref(node)
//         }
//         // 递归遍历子节点
//         for (const child of node?.children || []) {
//             child && findAndHandleTags(child, result);
//         }
//     }
//     // 创建 MutationObserver 实例
//     const observer = new MutationObserver((mutationsList, observer) => {
//         for (const mutation of mutationsList) {
//             if (mutation.type === 'childList') {
//                 mutation.addedNodes.forEach(node => {
//                     console.log(node, '节点node');
//                     // 验证a标签
//                     findAndHandleTags(node)
//                 })
//             }

//         }
//     });
//     observer.observe(document.body, { childList: true, subtree: true });

//     function restartObserver() {
//         setTimeout(() => {
//             if (!document.body.innerText.includes("404")) {
//                 console.log("页面恢复，重新启用监听");
//                 observer.observe(document.body, { childList: true, subtree: true });
//             }
//         }, 500);
//     }

//     const originalPushState = history.pushState;
//     history.pushState = function (...args) {
//         originalPushState.apply(this, args);
//         restartObserver();
//     };

//     const originalReplaceState = history.replaceState;
//     history.replaceState = function (...args) {
//         originalReplaceState.apply(this, args);
//         restartObserver();
//     };

//     window.addEventListener("popstate", restartObserver);

//     // 退出页面时，移除监听
//     window.addEventListener("beforeunload", () => {
//         console.log("页面即将关闭，移除 MutationObserver 监听");
//         observer.disconnect();
//     });
// })()

// 方案四 只通过监听页面路径变化来调整页面
// (function () {
//     console.log('restartObserver');
//     let lastExecutionTime = 0;
//     const debounceTime = 1000; // 防抖时间
//     // 防抖函数
//     function restartObserverDebounced() {
//         const now = Date.now();
//         console.log(now, lastExecutionTime, debounceTime, 123456);
//         if (now - lastExecutionTime < debounceTime) {
//             console.log('restartObserverDebounced');
//             return;
//         }
//         lastExecutionTime = Date.now();
//         restartObserver();
//     }
//     function restartObserver() {
//         setTimeout(() => {
//             if (window.location.href.includes("/404")) {
//                 console.log('支付错误页面', window.location.href);
//                 window.alert('error Page:' + window.location.href)
//                 // console.log("页面恢复，重新启用监听");
//                 // observer.observe(document.body, { childList: true, subtree: true });
//             }
//         }, 500);
//     }
//     const originalPushState = history.pushState;
//     history.pushState = function (...args) {
//         originalPushState.apply(this, args);
//         restartObserverDebounced();
//     };
//     const originalReplaceState = history.replaceState;
//     history.replaceState = function (...args) {
//         originalReplaceState.apply(this, args);
//         restartObserverDebounced();
//     };

//     window.addEventListener("hashchange", restartObserverDebounced); // 监听 hash 变化
//     window.addEventListener("popstate", restartObserverDebounced); // 监听前进、后退
//     // 退出页面时，移除监听
//     window.addEventListener("beforeunload", () => {
//         console.log("页面即将关闭，移除监听");
//         // observer.disconnect();
//         window.removeEventListener("hashchange", restartObserverDebounced);
//         window.removeEventListener("popstate", restartObserverDebounced);
//     });
// })()