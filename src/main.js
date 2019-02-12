// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './api/http'
import api from './api/api'
import echarts from 'echarts'
import store from './store'
import moment from 'moment'
import Element from 'element-ui'
import __ from 'lodash'
import 'element-ui/lib/theme-chalk/index.css'
import datause from './api/interfacedata'

Vue.config.productionTip = false
Vue.prototype.$get = http['get']
Vue.prototype.$post = http['post']
Vue.prototype.$__ = __
Vue.prototype.api = api
Vue.prototype.charts = echarts
Vue.prototype.moment = moment
Vue.prototype.datause = datause
Vue.prototype.commonBg = 'rgba(25, 52, 82, 0.94)'

Vue.use(Element)
Vue.filter('NumFormat', function (value) {
  if (!value) return '0'

  let intPart = Number(value).toFixed(0) // 获取整数部分
  let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断

  let floatPart = '' // 预定义小数部分
  let value2Array = value.split('.')

  // =2表示数据有小数位
  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString() // 拿到小数部分

    if (floatPart.length === 1) {
      // 补0,实际上用不着
      return intPartFormat + '.' + floatPart + '0'
    } else {
      return intPartFormat + '.' + floatPart
    }
  } else {
    return intPartFormat + floatPart
  }
})

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('login') === 'true') {
    next()
  } else {
    window.location.href = '/login.html'
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
