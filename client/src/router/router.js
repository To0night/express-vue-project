// src/router/index.js
// import Vue from 'vue';
// import VueRouter from 'vue-router';
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

// 引入组件
import home from '../views/home/index.vue';
import page404 from '../views/404/index.vue';
import login from '../views/login/index.vue';


// 定义路由规则
const routes = [
    {
        path: '/',
        component: () => import('../layout.vue'),
    },
    {
        path: '/app',
        component: () => import('../layout.vue'),
        children: [
            {
                path: '/app/home', // 根路径
                component: home, // 对应的组件
            },
            {
                path: '/app/404', // 路径
                component: page404, // 对应的组件
            },
            {
                path: '/app/login/:id', // 动态路由
                component: login,
            },
        ]
    }

];


// 创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(),
    routes, // 路由规则
});

export default router;