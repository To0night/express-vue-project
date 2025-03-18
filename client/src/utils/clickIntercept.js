function handleClickIntercept() {
    function findTargetTags(node) {
        if (node.tagName === 'BUTTON' && node.id === 'getBtn') {
            return node
        }
        // 递归遍历子节点
        for (const child of node?.children || []) {
            return child ? findTargetTags(child) : null
        }
    }
    // 保存原始点击事件
    function clickIntercept(node) {
        node.addEventListener("click", function (event) {
            // 打开弹框
            // const userConfirmed = confirm('你确定要执行此操作吗？');
            // 如果用户取消
            if (!userConfirmed) {
                // 阻止默认行为
                event.preventDefault();
                // 阻止事件冒泡
                event.stopPropagation();
            }

        }, true);
    }
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    const domNode = findTargetTags(node)
                    if (domNode) {
                        console.log(domNode, 'domNode');
                        clickIntercept(domNode)
                        observer.disconnect()
                    }
                })
            }

        }
    })

    observer.observe(document.body, { childList: true, subtree: true });
}

handleClickIntercept()
