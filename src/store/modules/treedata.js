/*树形设备&官网数据集*/

const state = {
  iTreeSearchKey: '',
  iWorkShopIndex: 0,
  iEquipmentData: [], // 树形设备数据
  iEquipmentDeviceDetailData: [], // 基本设备数据
  iPipeNetworkData: [], // 管网数据
  iEquipmentDeviceList: [], // 设备id集合
  iPipeDetailData: [], // 管井详情集合
  iPipePartDetailData: [], // 管段详情集合
  iPipelineDetailData: [], // 管线详情集合
  iPipeList: [], // 管井id集合
  iWorkshopDetailData: [],
  globalNodeClick: {
    id: -1,
    type: -1,
    time: new Date()
  } // 接收全局点击事件
}

// getters
const getters = {
  iEquipmentData: state => state.iEquipmentData,
  iEquipmentDeviceDetailData: state => state.iEquipmentDeviceDetailData,
  iPipeNetworkData: state => state.iPipeNetworkData,
  iEquipmentDeviceList: state => state.iEquipmentDeviceList,
  iPipeDetailData: state => state.iPipeDetailData,
  iPipePartDetailData: state => state.iPipePartDetailData,
  iPipeList: state => state.iPipeList,
  iPipelineDetailData: state => state.iPipelineDetailData,
  iWorkshopDetailData: state => state.iWorkshopDetailData,
  iTreeSearchKey: state => state.iTreeSearchKey,
  iWorkShopIndex: state => state.iWorkShopIndex,
  globalNodeClick: state => state.globalNodeClick

}

// actions
const actions = {}

// mutations
const mutations = {
  updateIEquipmentData (state, data) {
    state.iEquipmentData = data
  },
  updateIEquipmentDeviceDetailData (state, data) {
    state.iEquipmentDeviceDetailData = data
  },
  updateIPipeNetworkData (state, data) {
    state.iPipeNetworkData = data
  },
  updateIEquipmentDeviceList (state, data) {
    state.iEquipmentDeviceList = data
  },
  updateIPipeDetailData (state, data) {
    state.iPipeDetailData = data
  },
  updateIPipePartDetailData (state, data){
    state.iPipePartDetailData = data
  },
  updateIPipelineDetailData (state, data) {
    state.iPipelineDetailData = data
  },
  updateIWorkshopDetailData (state, data) {
    state.iWorkshopDetailData = data
  },
  updateIPipeList (state, data) {
    state.iPipeList = data
  },
  updateGlobalNodeClick (state, data) {
    state.globalNodeClick = data
  },
  updateITreeSearchKey (state ,data ){
    state.iTreeSearchKey = data
  },
  updateIWorkShopIndex (state, data){
    state.iWorkShopIndex = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
