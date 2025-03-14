import App from './App.vue';
import { createApp } from 'vue';
import router from './router/router'

import './utils/observe'
import './utils/XMLhttp'
import './utils/fetch'

const app = createApp(App);
app.use(router); // 使用路由
app.mount('#app');


