import store from '@/store/index'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
// import RouterReplace from '@/views/RouterReplace'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录'
    },
  },
  // // 用来刷新页面的空白路由
  // {
  //   path: '/routerreplace',
  //   name: 'routerreplace',
  //   component: RouterReplace,
  // }
  // {
  //   path: '/manage',
  //   name: 'manage',
  //   redirect: "/manage/manageindex",
  //   component: () => import("@/views/Manage"),
  //   children: [
  //     {
  //       path: 'manageindex',
  //       name: 'manageindex',
  //       component: () => import("@/views/ManageIndex"),
  //       meta: {
  //         requiresAuth: true,
  //         title: '首页',
  //       }
  //     },
  //     {
  //       path: 'adduser',
  //       name: 'adduser',
  //       component: () => import("@/views/AddUser"),
  //       meta: {
  //         requiresAuth: true,
  //         title: '添加学生',
  //       }
  //     },
  //     {
  //       path: 'users',
  //       name: 'users',
  //       component: () => import("@/views/Users"),
  //       meta: {
  //         requiresAuth: true,
  //         title: '管理学生',
  //       }
  //     }
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



// 全局前置路由守卫（守卫需要放置在router实例后面）
router.beforeEach(async (to, from, next) => {
  // 获取去往的路由并定义其标题
  document.title = to.meta.title
  // 判断是否需要登录校验（requiresAuth鉴权登录）
  if (to.matched.some(recode => recode.meta.requiresAuth)) {
    document.title = to.meta.title;  // 获取去往的路由并定义其标题
    // 判断是否有token
    if (localStorage.getItem("token")) {
      // console.log(999);
      // 判断是否开启获取路由数据
      // if (store.state.isAuth) {
      //   // 同步执行
      //   console.log("111");
      //   await store.dispatch("setRouter");
      //   next({ path: to.fullPath });
      // } else {
      //   next()
      // }
      next();
    } else {
      next({
        name: 'login',
        params: { redirect: to.fullPath }
      })
    }
  } else {  // 不需要登录校验
    next();
  }
})



export default router
