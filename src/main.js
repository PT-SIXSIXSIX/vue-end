// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//使所有浏览器都支持ES6新语法
import babelpolyfill from 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import routes from './routers'
import store from './vuex/store'
import globalConfig from './config'

import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import aiFooter from './components/AiFooter'
import aiAside from './components/AiAside'

const router = new VueRouter({
  routes
});

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueCookies);
Vue.use(Vuex);

// 组件
Vue.component('ai-footer', aiFooter);
Vue.component('ai-aside', aiAside);

// 关闭生产模式下的提示
Vue.config.productionTip = false;

// 登录逻辑
// router.beforeEach((to, from, next) => {
//   let user_id = window.$cookies.isKey('userId');
//   let access_token = window.$cookies.isKey('accessToken');
//   let allowRouter = globalConfig.bgRouter.concat(['/404']);
//   if ((!user_id || !access_token) && allowRouter.indexOf(to.path) < 0) {
//     next({ path: '/login' })
//   }
//   else if (user_id && access_token && to.path === '/login') {
//     next({ path: '/index' })
//   } else {
//     next()
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
