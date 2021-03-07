import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import vant from 'vant'
import { Toast } from 'vant'
import 'vant/lib/index.css'
import http from '../http'
import './assets/style.css'
// 将封装好的http挂载到Vue.prototype
// 就可以在任意组件使用this就可以获取到封装好的文件
Vue.prototype.$http = http
Vue.prototype.$msg = Toast

Vue.use(vant)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
