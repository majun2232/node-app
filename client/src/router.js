import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      component: () =>
        import('./views'),
      children: [{
          path: '',
          component: () =>
            import('./views/infoshow'),
        },
        {
          path: '/home',
          name: 'home',
          component: () =>
            import('./views/Home'),
        },
        {
          path: '/infoshow',
          name: 'infoshow',
          component: () =>
            import('./views/infoshow'),
        },
        {
          path: '/foundlist',
          name: 'FundList',
          component: () =>
            import('./views/FundList'),
        },
        {
          path: '/foodlist',
          name: 'foodlist',
          component: () =>
            import('./views/goodsShow'),
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: () =>
        import('./views/Login'),
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import('./views/Register'),
    },
    {
      path: '*',
      name: '/404',
      component: () =>
        import('./views/404'),
    }

  ]
})

// 路由守卫

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router;