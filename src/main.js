// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
axios.defaults.baseURL = 'http://localhost:8443/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.use(ElementUI)

Vue.config.productionTip = false

/** 前端拦截器-前置全局守卫
 * 钩子函数及在某些时机会被调用的函数。这里我们使用 router.beforeEach()，意思是在访问每一个路由前调用。
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.username) {
      next()
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
}
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  // store即store/index.js里的store
  store,
  components: { App },
  template: '<App/>'
})
