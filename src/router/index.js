import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../pages/Login';
import { checkToken } from '@/api/apis'

Vue.use(VueRouter);


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}



const  router =  new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/main',
      name:'main',
      //懒加载
      component:()=>import('../pages/Main'),
      children:[
        {
          path:"/main/index", 
          name:"/main/index",
          component:()=>import('../pages/main/index'),
          meta:{breadList:['首页']}
        },
        {
          path:"/main/order", 
          name:"/main/order",
          component:()=>import('../pages/main/order'),
          meta:{breadList:['订单管理']}
        },
        {
          path:"/main/itemList", 
          name:"/main/itemList",
          component:()=>import('../pages/main/itemList'),
          meta:{breadList:['商品管理','商品列表']}
          
        },
        {
          path:"/main/addItem", 
          name:"/main/addItem",
          component:()=>import('../pages/main/addItem'),
          meta:{breadList:['商品管理','商品添加']}
        },
        {
          path:"/main/classItem", 
          name:"/main/classItem",
          component:()=>import('../pages/main/classItem'),
          meta:{breadList:['商品管理','商品分类']}
        },
        {
          path:"/main/shopMg", 
          name:"/main/shopMg",
          component:()=>import('../pages/main/shopMg'),
          meta:{breadList:['店铺管理']}
        },
        //
        {
          path:"/main/account", 
          name:"/main/account",
          component:()=>import('../pages/main/account'),
          meta:{breadList:['账户管理','账户列表']}
        },
        {
          path:"/main/addAccount", 
          name:"/main/addAccount",
          component:()=>import('../pages/main/addAccount'),
          meta:{breadList:['账户管理','账户添加']}
        },
        {
          path:"/main/repalceAccount", 
          name:"/main/repalceAccount",
          component:()=>import('../pages/main/repalceAccount'),
          meta:{breadList:['账户管理','修改账户']}
        },
        {
          path:"/main/mStatistic", 
          name:"/main/mStatistic",
          component:()=>import('../pages/main/mStatistic'),
          meta:{breadList:['销售统计','商品统计']}
        },
        {
          path:"/main/orderstatistic", 
          name:"/main/orderstatistic",
          component:()=>import('../pages/main/orderstatistic'),
          meta:{breadList:['销售统计','订单统计']}
        },
        {
          path:"/main/reAccount", 
          name:"/main/reAccount",
          component:()=>import('../pages/main/reAccount'),
          meta:{breadList:['个人中心']}
        },
      ]
    },
  ]
})
//路由拦截
  router.beforeEach((to,from,next)=>{
   if(to.path != '/'){
    //判断用户是否登录 
    checkToken(localStorage.token).then(res=>{
      if(res.data.code ==0)next()
      else next('/')
    })
    }else next()
  })


export default router


