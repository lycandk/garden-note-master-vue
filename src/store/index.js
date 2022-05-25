/**
 * 前端登录器，需要在前端判断用户的登录状态。我们可以像之前那样在组件的 data 中设置一个状态标志，但登录状态应该被视为一个全局属性，而不应该只写在某一组件中。所以我们需要引入一个新的工具——Vuex，它是专门为 Vue 开发的状态管理方案，我们可以把需要在各个组件中传递使用的变量、方法定义在这里。
 * ————————————————
 * 版权声明：本文为CSDN博主「Evan-Nightly」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
 * 原文链接：https://blog.csdn.net/Neuf_Soleil/article/details/89422585
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

/**
 * 为了实现登录拦截器，我们需要一个记录用户信息的变量。为了方便日后的扩展（权限认证等），
 * 我们使用一个用户对象而不是仅仅使用一个布尔变量。同时，设置一个方法=>login,触发这个方法时可以为我们的用户对象赋值。
 * localStorage，即本地存储，在项目打开的时候会判断本地存储中是否有 user 这个对象存在，如果存在就取出来并获得 username 的值，
 * 否则则把 username 设置为空。这样我们只要不清除缓存，登录的状态就会一直保存。
 * 为了区分页面是否需要拦截，我们需要修改一下 src\router\index.js，在需要拦截的路由中加一条元数据，设置一个 requireAuth 字段
 */
export default new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
    }
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    logout (state) {
      state.user = []
      window.localStorage.removeItem('user')
    }
  }
})
