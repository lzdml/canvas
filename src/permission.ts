import { router } from '/@/router';
// import { getToken } from '/@/utils/auth';

// const { VITE_GLOB_APP_TITLE } = getAppEnvConfig();

// const whiteList = [''];

// router.beforeEach(async (to, from, next) => {
//   const hasToken = getToken();
//   // 登录未过期或打开页面不需要登录
//   if (hasToken) {
//     if (to.path === '/login') {
//       next(from.path);
//     } else {
//       next();
//     }
//   } else {
//     if (whiteList.indexOf(to.path) > -1) {
//       next();
//     } else {
//       next(`/login?redirect=${to.path}`);
//     }
//   }
// });

router.afterEach((to) => {
  // 路由发生变化
  const metaTitle = to.meta.title;
  if (metaTitle) {
    window.document.title = `${metaTitle}`;
  }
});
