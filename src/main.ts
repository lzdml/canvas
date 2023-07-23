import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import piniaStore from './store';
import './permission';
import '/@/styles/index.less';
import '/@/styles/reset.less';
import 'uno.css';

import '/@/assets/fonts/iconfont.css';
import 'virtual:svg-icons-register';
import feedTouch from './directives/feedTouch';

//vue3的挂载方式
const app = createApp(App);
app.directive('feed-touch', feedTouch);
app.use(router);
app.use(piniaStore);
app.mount('#app');
