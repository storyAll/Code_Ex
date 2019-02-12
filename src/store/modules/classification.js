/*类型管理仓库*/

const state = {
  iLeftTabsData: ['设备', '管网'],
  iLeftTabsIndex: 0,
  iTabsData: ['设备管理', '合同管理', '工单管理'],
  iTabsIndex: 0,
  iDeviceData: ['厂房', '设备', '管路', '管井', '管孔', '管段','设备组','管孔','子管孔','列表'],
  iDeviceIndex: 0,
  iDeviceID: 0,
  iViewModeData: ['BIM', 'GIS'],
  iViewModeIndex: 1,
  currentListTitle: ''

}

// getters
const getters = {
  iTabsData: state => state.iTabsData,
  iTabsIndex: state => state.iTabsIndex,
  iDeviceData: state => state.iDeviceData,
  iDeviceIndex: state => state.iDeviceIndex,
  iDeviceID: state => state.iDeviceID,
  iViewModeData: state => state.iViewModeData,
  iViewModeIndex: state => state.iViewModeIndex,
  iLeftTabsData: state => state.iLeftTabsData,
  iLeftTabsIndex: state => state.iLeftTabsIndex,
  currentListTitle: state => state.currentListTitle
}

// actions
const actions = {}

// mutations
const mutations = {
  updateILeftTabsData (state, data) {
    state.iLeftTabsData = data
  },
  updateILeftTabsIndex (state, data) {
    state.iLeftTabsIndex = data
  },
  updateITabsIndex (state, data) {
    state.iTabsIndex = data
  },
  updateIDeviceIndex (state, data) {
    state.iDeviceIndex = data
  },
  updateIDeviceID (state, data) {
    state.iDeviceID = data
  },
  updateIViewModeIndex (state, data) {
    state.iViewModeIndex = data
  },
  updateCurrentListTitle (state, data) {
    state.currentListTitle = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
