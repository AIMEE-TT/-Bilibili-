import Vue from 'vue'
import Router from 'vue-router'
// 引入Home.vue组件
import Home from '../views/Home.vue'
// 引入register.vue组件
import register from '../views/register.vue'
// 引入Login.vue组件
import Login from '../views/Login.vue'
// 引入userinfo.vue组件
import userinfo from '../views/userinfo.vue'
// 引入Edit.vue组件
import Edit from '../views/Edit.vue'
// 引入Article.vue组件
import Article from '../views/Article.vue'
import editcategory from '../views/EditCategory.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', component: Home, 
      meta: {
        keepalive:true
    }},
    { path: '/register', component: register },
    { path: '/login', component: Login },
    { path: '/userinfo', component: userinfo,  
      meta: {
        istoken: true
    }},
    { path: '/edit', component: Edit,  
      meta: {
      istoken: true
    }},
    { path:'/article/:id',component:Article },
    {
      path:'/editcategory',
      component:editcategory
    }
  ]
})

// 路由导航守卫
router.beforeEach((to,from,next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if((!localStorage.getItem('token') || !localStorage.getItem('id'))&&to.meta.istoken == true){
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})
export default router
