const state = {
  titTabTxt: ['数据统计'],
  titTabTxtActive: '数据统计',
  titTabTxtwidth: 70
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  updateTitTabData (state, data) {
    state.titTabTxt = ['数据统计']
    state.titTabTxtwidth = 70
    state.titTabTxtActive = '数据统计'
  },
  updataTitTabTxtActive (state, data) {
    state.titTabTxtActive = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
