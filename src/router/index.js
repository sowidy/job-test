import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/front',
      name:'front',
      component:()=>import('@/layout/front'),
    },
    {
      path: '/login',
      name:'login',
      component:()=>import("@/view/login")
    },
    {
      path:'/user',
      name:'user',
      redirect:'/user/category',
      component:()=>import("@/layout/user"),
      children:[
        {
          path:'category',
          name:'category',
          component:()=>import('@/view/article/ArticleCategory')
        },
        {
          path:'manage',
          name:'manage',
          component:()=>import('@/view/article/ArticleManage')
        },
        {
          path:'info',
          name:'info',
          component:()=>import('@/view/user/UserInfo')
        },
        {
          path:'avatar',
          name:'avatar',
          component:()=>import('@/view/user/UserAvatar')
        },
        {
          path:'resetpwd',
          name:'resetpwd',
          component:()=>import('@/view/user/UserResetPassword')
        },
        {
          path:'chart',
          name:'chart',
          component:()=>import('@/view/chart')
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
})

export default router