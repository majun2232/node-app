import Vue from 'vue'
import Router from 'vue-router'
import Index from './views'
import Register from './views/Register'
import notfound from './views/404'
import Login from './views/Login'
import Home from './views/Home'
import infoshow from './views/infoshow'
import foundlist from './views/FundList'
Vue.use(Router)



const router=new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children:[
        {
          path: '',
          component: Home,
        },
        {
          path: '/home',
          name: 'home',
          component: Home,
        },
        {
          path: '/infoshow',
          name: 'infoshow',
          component: infoshow,
        },
        {
          path: '/foundlist',
          name: 'FundList',
          component: foundlist,
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
    ,
    {
      path: '/register',
      name: 'register',
      component: Register
    } ,
    {
      path: '*',
      name: '/404',
      component: notfound
    }
  ]
})

// 路由守卫

router.beforeEach((to,from,next) => {
  const isLogin=localStorage.eleToken ? true :false;
  if(to.path=="/login" || to.path=="/register"){
    next();
  }else{
    isLogin ? next() : next("/login");
  }
})


export default router;
