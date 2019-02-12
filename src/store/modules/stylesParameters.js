// leftBoxTakeUp 左侧展开收起 {1:展开,2:收起}
const state = {
  iTakeUpAll:true,
  // 左侧收起展开  true 展开 false 收起
  topBoxTakeUp: true,
  leftBoxTakeUp: true,
  rightBoxTakeUp: true,
  // alarmRecordShadeShow: false,
  // 底部展开收起 控制  true 展开 false 收起
  footExhPutCont: false,
  //消息列表显隐
  alertListStatus: false,
  // // 底部显示隐藏  true 显示 false 隐藏
  // footExhPutContShow: true,
  // // 空间树/设备树  1空间树 2设备树
  // treeBoxAct: 1,
  // equipmentType: '温德姆大酒店',
  // backButton: false,
  // searchButton: false,
  // fadeInAnima: true,
  // // 搜索结果隐藏
  // rightSearchFadeIn: true,
  // //  设备级状态栏
  // eqBol: false,
  // equipmentList: false
  footTitle: ''
}

// getters
const getters = {
  iTakeUpAll: state => state.iTakeUpAll,
  topBoxTakeUp: state => state.topBoxTakeUp,
  leftBoxTakeUp: state => state.leftBoxTakeUp,
  rightBoxTakeUp: state => state.rightBoxTakeUp,
  // treeBoxAct: state => state.treeBoxAct,
  footExhPutCont: state => state.footExhPutCont,
  alertListStatus: state => state.alertListStatus
  // footExhPutContShow: state => state.footExhPutContShow,
  // alarmRecordShadeShow: state => state.alarmRecordShadeShow,
  // equipmentType: state => state.equipmentType,
  // backButton: state => state.backButton,
  // searchButton: state => state.searchButton,
  // fadeInAnima: state => state.fadeInAnima,
  // rightSearchFadeIn: state => state.rightSearchFadeIn,
  // eqBol: state => state.eqBol,
  // equipmentList: state => state.equipmentList
}

// actions
const actions = {}

// mutations
const mutations = {
  chITakeUpAll (state, products) {
    state.iTakeUpAll = products
    if(products === true){
      state.topBoxTakeUp = products
      state.leftBoxTakeUp = products
      state.rightBoxTakeUp = products
    }else{
      state.topBoxTakeUp = false
      state.leftBoxTakeUp = false
      state.rightBoxTakeUp = false
    }
  },
  chTopBoxTakeUp (state, products) {
    state.topBoxTakeUp = products
  },
  chLeftBoxTakeUp (state, products) {
    state.leftBoxTakeUp = products
  },
  chRightBoxTakeUp (state, products) {
    state.rightBoxTakeUp = products
  },
  updateAlertListStatus (state, status) {
    state.alertListStatus = status
  },
  // chfootExhPutContShow (state, products) {
  //   state.footExhPutContShow = products
  // },
  // chalarmRecordShadeShow (state, products) {
  //   state.alarmRecordShadeShow = products
  // },
  chfootExhPutCont (state, products) {
    state.leftBoxTakeUp = !products // 显示底部的时候折叠左侧
    state.footExhPutCont = products
  }
  // chtreeBoxAct (state, products) {
  //   state.treeBoxAct = products
  // },
  // chfadeInAnima (state, products) {
  //   state.fadeInAnima = products
  // },
  // updataequipmentType (state, products) {
  //   state.equipmentType = products
  // },
  // setBackButtonState (state, backButton) {
  //   state.backButton = backButton
  // },
  // setSearchButton (state, searchButton) {
  //   state.searchButton = searchButton
  // },
  // setRightSearchFadeIn (state, rightSearchFadeIn) {
  //   state.rightSearchFadeIn = rightSearchFadeIn
  // },
  // setEqBol (state, val) {
  //   state.eqBol = val
  // },
  // setEquipmentList (state, value) {
  //   state.equipmentList = value
  // }
}

export default {
  state,
  getters,
  actions,
  mutations
}
