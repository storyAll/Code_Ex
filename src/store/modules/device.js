const state = {
  // 生产
  // baseURLPro: 'http://localhost:8080/equipmentBIM',
  // baseURLPro: 'http://api.bytelurk.com:7300/mock/5bf4c9a32075c66b413cfdf4/tbty', // 线上
  baseURLPro: 'https://www.easy-mock.com/mock/5be52657606f6b5b7dce239f/tbty', // 线上
  // 测试
  baseURLDeb: 'https://www.easy-mock.com/mock/5be52657606f6b5b7dce239f/tbty',
  // 开发
  // baseURLDev: 'https://testapi.tfhulian.com/equipmentBIM'
  baseURLDev: 'https://www.easy-mock.com/mock/5be52657606f6b5b7dce239f/tbty'
}

// getters
const getters = {
  baseURLPro: state => state.baseURLPro,
  baseURLDeb: state => state.baseURLDeb,
  baseURLDev: state => state.baseURLDev
}

// actions
const actions = {}

//mutations
const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
