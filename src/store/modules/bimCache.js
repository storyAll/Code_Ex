const state = {
  spaceTreeData: [],
  spaceTreeDataKeys: [],
  equipmentTreeData: [],
  equipmentTreeDataKeys: [],
  equipmentsInfo: {}
}

// getters
const getters = {
  spaceTreeData: state => state.spaceTreeData,
  spaceTreeDataKeys: state => state.spaceTreeDataKeys,
  equipmentTreeData: state => state.equipmentTreeData,
  equipmentTreeDataKeys: state => state.equipmentTreeDataKeys,
  equipmentsInfo: state => state.equipmentsInfo
}

// actions
const actions = {}

// mutations
const mutations = {
  setEquipmentsInfo(state, product) {
    state.equipmentsInfo = product
  },
  setSpaceTreeData(state, product) {
    state.spaceTreeData = product
  },
  setEquipmentTreeData(state, product) {
    state.equipmentTreeData = product
  },
  setSpaceTreeDataKeys(state, product) {
    state.spaceTreeDataKeys = product
  },
  setEquipmentTreeDataKeys(state, product) {
    state.equipmentTreeDataKeys = product
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
