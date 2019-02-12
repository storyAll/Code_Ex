// noinspection JSAnnotator
const state = {
  footInfo: {}
}

// getters
const getters = {
  footInfo: state => state.footInfo
}

// actions
const actions = {}

//mutations
const mutations = {
  updateFootInfo (state,info) {
    state.footInfo=info
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
