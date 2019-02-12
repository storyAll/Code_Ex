import axios from 'axios'
import qs from 'qs'
import store from '../store'
import { Message } from 'element-ui'

let axiosIns = axios.create({})
let baseURLDev = store.getters.baseURLDev
let baseURLPro = store.getters.baseURLPro
let baseURLDeb = store.getters.baseURLDeb
if (process.env.NODE_ENV === 'development') {
  axiosIns.defaults.baseURL = baseURLDev
} else if (process.env.NODE_ENV === 'debug') {
  axiosIns.defaults.baseURL = baseURLDeb
} else if (process.env.NODE_ENV === 'production') {
  axiosIns.defaults.baseURL = baseURLPro
  // axiosIns.defaults.withCredentials = true
}
let baseURL = axiosIns.defaults.baseURL
axiosIns.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axiosIns.defaults.timeout = 30000
axiosIns.defaults.responseType = 'json'
axiosIns.defaults.transformRequest = [function (data) {
  // 数 据序列化
  return qs.stringify(data)
}
]
axiosIns.defaults.validateStatus = function (status) {
  return true
}
axiosIns.interceptors.request.use(function (config) {
  config.headers.Accept = 'application/json'
  return config
})
axiosIns.interceptors.response.use(function (response) {
  // let data = response.data
  let status = response.status
  if (status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
})

let ajaxMethod = ['get', 'post']
let api = {}
let showType = true
ajaxMethod.forEach((method) => {
  api[method] = function (uri, data, config) {
    return new Promise(function (resolve, reject) {
      axiosIns[method](uri, data, config).then((response) => {
        if (response.data.code !== 200) {
          if (showType) {
            Message({
              message: response.data.msg,
              type: 'warning'
            })
            showType = false
            setTimeout(() => {
              showType = true
            }, 2600)
          }
        } else {
          resolve(JSON.parse(JSON.stringify(response.data.data)))
        }
        if (process.env.NODE_ENV === 'development') {
          console.log('访问接口', baseURL + uri)
          console.log('返回数据', response)
        }
      }).catch((response) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(response)
        }
        Message({
          message: '请求超时，请稍后再试',
          type: 'warning',
        })
        reject(response)
      })
    })
  }
})
export default api
