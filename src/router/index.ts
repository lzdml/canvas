/*
 * @Author: DZL
 * @Date: 2023-07-25 21:56:07
 * @LastEditors: DZL
 * @LastEditTime: 2023-07-25 22:38:58
 * @Description:
 */
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

import Layout from '/@/layout/index.vue';

/* Router Modules */
import ERROR_ROUTES from '/@/router/modules/error'; // 错误页面路由

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect: 'home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('/@/views/home/index.vue'),
        meta: {
          title: 'Emoji Maker',
          keepAlive: false,
        },
      },
      {
        path: 'movie',
        name: 'Movie',
        component: () => import('/@/views/movie/index.vue'),
        meta: {
          title: '在线选票效果',
          keepAlive: false,
        },
      },
    ],
  },
  ...ERROR_ROUTES,
];

//导入生成的路由数据
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 如果存在保存的位置，则恢复到之前滚动的位置
      return { ...savedPosition, behavior: 'instant' };
    } else {
      // 否则滚动到页面顶部
      return { top: 0, behavior: 'instant' };
    }
  },
});

/* resetRouter */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export { router };
