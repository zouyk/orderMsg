import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//引入矢量图样式
import  '@/assets/fonts/iconfont.css'
import  '@/assets/fonts/iconfont.js'

Vue.use(ElementUI)
//提示
Vue.config.productionTip = false

//创建数据总线  并且挂在到vue全局  
Vue.prototype.$bus = new Vue 




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
