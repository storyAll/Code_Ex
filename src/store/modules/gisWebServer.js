// import _ from 'lodash'
const state = {
  equipmentShowList: [],
  hlightPipepart: [],
  hlightPipeline: []
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {

  /*
  * 控制视图类型 [设备视图,工单视图,合同视图]
  * */
  changeGisViewMode (state, product) {
    var gisFrame = window.gisFrame.contentWindow || window.gisFrame.window
    gisFrame.BMapInit(product + 1)
  },

  /*返回到主视图*/
  LocateMainView (state, product) {
    var gisFrame = window.gisFrame.contentWindow || window.gisFrame.window
    console.log('gisFrame=>', gisFrame)
    gisFrame.LocateMainView()
  },

  /*
  *  跳转视图到指定位置和缩放
  * */
  LocateCurrentView (state, product) {
    console.log('LocateCurrentView=>', product)
    let {id, type, pos, level} = product
    var gisFrame = window.gisFrame.contentWindow || window.gisFrame.window
    if (pos && pos.x !== undefined && pos.y !== undefined) {
      gisFrame.LocateObjectView(pos, level)
    }
    // gisFrame.UNHighLight(state.hlightPipepart)
    // if (Array.isArray(id)) {
    //   console.log('isarray=>',Array.isArray(id))
    //   gisFrame.HighLight(id)
    //   state.hlightPipepart = state.hlightPipepart.concat(id)
    // } else {
    //   state.hlightPipepart.push(id)
    //   gisFrame.HighLight([id])
    // }
    if (type === 0) { // 厂房
      try {
        gisFrame.USetObjectHeighLight({
          type: 'CF'
        })
      } catch (e) {
        console.log('不能清除厂房高亮=>', e)
      } finally {
        gisFrame.SetObjectHeighLight({
          type: 'CF',
          id: id
        })
      }
    } else if (type === 2) { // 管路
      gisFrame.UHighLightGX(state.hlightPipeline)
      gisFrame.HighLightGX([id])
      state.hlightPipeline.push(id)
    } else if (type === 5) { // 管段
      gisFrame.UNHighLight(state.hlightPipepart)
      if (Array.isArray(id)) {
        console.log('isarray=>', Array.isArray(id))
        gisFrame.HighLight(id)
        state.hlightPipepart = state.hlightPipepart.concat(id)
      } else {
        state.hlightPipepart.push(id)
        gisFrame.HighLight([id])
      }
    } else if (type === 3) {
      try {
        // gisFrame.USetObjectHeighLight({
        //   type: 'GJ'
        // })
      } catch (e) {
        console.log('无法高亮管井=>', e)
      } finally {
        gisFrame.SetObjectHeighLight({
          type: 'GJ',
          id: id
        })
      }
    } else if (type === 'clearHightList') { // 清除高亮
      try {
        gisFrame.UHighLightGX(state.hlightPipeline)
      } catch (e) {
      }
      try {
        gisFrame.USetObjectHeighLight({
          type: 'CF'
        })
        gisFrame.USetObjectHeighLight({
          type: 'GJ'
        })
      } catch (e) {
      }
      try {
        gisFrame.UNHighLight(state.hlightPipepart)
      } catch (e) {
      }
    }
  },
  /*地图缩放变大*/
  GisZoomUp () {
    var gisFrame = window.gisFrame.contentWindow || window.gisFrame.window
    var pos = gisFrame.map.getCenter()
    pos.x = pos.lng
    pos.y = pos.lat
    let level = parseInt(gisFrame.map.getZoom()) - 1
    console.log('GisZoomUp=>', level)

    gisFrame.LocateObjectView(pos, level)
  },
  /*地图缩放变小*/
  GisZoomDown () {
    var gisFrame = window.gisFrame.contentWindow || window.gisFrame.window
    var pos = gisFrame.map.getCenter()
    pos.x = pos.lng
    pos.y = pos.lat
    let level = parseInt(gisFrame.map.getZoom()) + 1
    console.log('GisZoomDown=>', level)

    console.log('level=>', level)
    gisFrame.LocateObjectView(pos, level)
  },
  /*控制显隐工厂Label*/
  WorkShopLabelView (state, product) {
    console.log('WorkShopLabelView=>', product)
    var gisFrame = window.gisFrame.contentWindow || window.gisFrame.window
    try {
      gisFrame.TempLabel(product)
    }
    catch (e) {
      console.log('err gisFrame.TempLabel(product)=> ', e)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
