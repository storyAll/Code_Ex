import _ from 'lodash'

const state = {
  equipmentShowList: []
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  /**
   * 调用 示例
   * 注意 ID要传字符串 如 '5464'
   * 注意 rgbNo要传字符串 如 '1'
   * equipmentDyeing({
   *  ids:['5464','46656'],
   *  rgbNo:'1'
   * })
   * @param state
   * @param product
   */
  equipmentDyeing (state, product) {
    // FFCC00 黄 停运中黄色 0
    // 3BCD64 绿 运行中绿色 1
    // F5222D 红 故障中红色 2
    let rgbs = {
      '0': '{"r":1,"g":0.8,"b":0}',
      '1': '{"r":0.231372549,"g":0.803921569,"b":0.392156863}',
      '2': '{"r":0.996078431,"g":0.133333333,"b":0.176470588}'
    }
    if (window.bimFrame.contentWindow) {
      window.bimFrame.contentWindow.BIM.Viewer.SetColorObjects(JSON.stringify(product.ids), rgbs[product.rgbNo])
    } else {
      window.bimFrame.window.BIM.Viewer.SetColorObjects(JSON.stringify(product.ids), rgbs[product.rgbNo])
    }
  },
  /**
   * 调用 示例
   * 注意 ID要传字符串 如 '5464'
   * equipmentTypeShow(['5464','46656'])
   * @param state
   * @param product
   */
  equipmentTypeShow (state, product) {
    console.log('equipmentTypeShow=>')
    var judgeAction = function (data) {
      if (state.equipmentShowList.indexOf(data) > -1) {
        _.remove(state.equipmentShowList, function (n) {
          return n - data === 0
        })
        hide(data)
      } else {
        state.equipmentShowList.push(data)
        show(data)
      }
    }
    // var show = function (data) {
    //   if (window.bimFrame.contentWindow) {
    //     window.bimFrame.contentWindow.BIM.Viewer.SetShownObjects(JSON.stringify(data))
    //   } else {
    //     window.bimFrame.window.BIM.Viewer.SetShownObjects(JSON.stringify(data))
    //   }
    // }
    // var hide = function (data) {
    //   console.log('hide=>',data)
    //   if (window.bimFrame.contentWindow) {
    //     window.bimFrame.contentWindow.BIM.Viewer.SetHiddenObjects(JSON.stringify(data))
    //   } else {
    //     window.bimFrame.window.BIM.Viewer.SetHiddenObjects(JSON.stringify(data))
    //   }
    // }
    var show = function (data) {
      if (window.bimFrame.contentWindow) {
        window.bimFrame.contentWindow.BIM.Viewer.ShowObject(JSON.stringify(data))
      } else {
        window.bimFrame.window.BIM.Viewer.ShowObject(JSON.stringify(data))
      }
    }
    var hide = function (data) {
      console.log('hide=>',data)
      if (window.bimFrame.contentWindow) {
        window.bimFrame.contentWindow.BIM.Viewer.HideObject(JSON.stringify(data))
      } else {
        window.bimFrame.window.BIM.Viewer.HideObject(JSON.stringify(data))
      }
    }
    if (Array.isArray(product)) {
      for (let data of product) {
        judgeAction(data)
      }
    } else {
      judgeAction(product)
    }
  },
  /**
   * 调用 示例
   * 注意 ID要传字符串 如 '5464'
   * equipmentTypeHide(['5464','46656'])
   * @param state
   * @param product
   */
  equipmentTypeHide (state, product) {
    if (window.bimFrame.contentWindow) {
      window.bimFrame.contentWindow.BIM.Viewer.SetHiddenObjects(JSON.stringify(product))
    } else {
      window.bimFrame.window.BIM.Viewer.SetHiddenObjects(JSON.stringify(product))
    }
  },
  /**
   * 调用 示例
   * 注意 ID要传字符串 如 '5464'
   * equipmentShow('5464')
   * @param state
   * @param product
   */
  equipmentShow (state, product) {
    console.log('equipmentShow=>')
    // if (window.bimFrame.contentWindow) {
    //   window.bimFrame.contentWindow.BIM.Viewer.ShowObject(product)
    // } else {
    //   window.bimFrame.window.BIM.Viewer.ShowObject(product)
    // }
    var judgeAction = function (data) {
      if (state.equipmentShowList.indexOf(data) > -1) {
        _.remove(state.equipmentShowList, function (n) {
          return n - data === 0
        })
        hide(data)
      } else {
        state.equipmentShowList.push(data)
        show(data)
      }
    }
    var show = function (data) {
      if (window.bimFrame.contentWindow) {
        window.bimFrame.contentWindow.BIM.Viewer.ShowObject(JSON.stringify(data))
      } else {
        window.bimFrame.window.BIM.Viewer.ShowObject(JSON.stringify(data))
      }
    }
    var hide = function (data) {
      console.log('hide=>',data)
      if (window.bimFrame.contentWindow) {
        window.bimFrame.contentWindow.BIM.Viewer.HideObject(JSON.stringify(data))
      } else {
        window.bimFrame.window.BIM.Viewer.HideObject(JSON.stringify(data))
      }
    }
    if (Array.isArray(product)) {
      for (let data of product) {
        judgeAction(data)
      }
    } else {
      judgeAction(product)
    }
  },
  /**
   * 调用 示例
   * 注意 ID要传字符串 如 '5464'
   * equipmentHide('5464')
   * @param state
   * @param product
   */
  equipmentHide (state, product) {
    if (window.bimFrame.contentWindow) {
      window.bimFrame.contentWindow.BIM.Viewer.HideObject(product)
    } else {
      window.bimFrame.window.BIM.Viewer.HideObject(product)
    }
  }, /**
   * 调用 示例
   * @param state
   * @param product
   */
  LocateHome (state, product) {
    // 飞到最初视角
    if (window.bimFrame.contentWindow) {
      window.bimFrame.contentWindow.BIM.Viewer.LocateHome()
      // 不透明所有
      window.bimFrame.contentWindow.BIM.Viewer.SetTranslucentObjects('["T0"]', 1)
      window.bimFrame.contentWindow.BIM.Viewer.SetTranslucentObjects('["T7452745"]', 0.3)
    } else {
      window.bimFrame.window.BIM.Viewer.LocateHome()
      // 不透明所有
      window.bimFrame.window.BIM.Viewer.SetTranslucentObjects('["T0"]', 1)
      window.bimFrame.window.BIM.Viewer.SetTranslucentObjects('["T7452745"]', 0.3)
    }
  },
  /**
   * 调用 示例
   * 注意 ID要传字符串 如 '5464'
   * locationTranslucent('5464')
   * @param state
   * @param product
   */
  locationTranslucent (state, product) {
    console.log('locationTranslucent=>',product)

    // 半透明所有
    if (window.bimFrame.contentWindow) {
      window.bimFrame.contentWindow.BIM.Viewer.SetTranslucentObjects('["T0"]', 0.3)
      // 不透明传入设备,或设备类
      window.bimFrame.contentWindow.BIM.Viewer.SetTranslucentObjects(JSON.stringify(Array.isArray(product) ? product : [product]), 1)
      // 飞行到设备视角
      if (Array.isArray(product)) {
        window.bimFrame.contentWindow.BIM.Viewer.SetLocateObjects(JSON.stringify(product))
      } else {
        window.bimFrame.contentWindow.BIM.Viewer.LocateObject(product)
      }
    } else {
      window.bimFrame.window.BIM.Viewer.SetTranslucentObjects('["T0"]', 0.3)
      // 不透明传入设备,或设备类
      window.bimFrame.window.BIM.Viewer.SetTranslucentObjects(JSON.stringify(Array.isArray(product) ? product : [product]), 1)
      // 飞行到设备视角
      if (Array.isArray(product)) {
        window.bimFrame.window.BIM.Viewer.SetLocateObjects(JSON.stringify(product))
      } else {
        window.bimFrame.window.BIM.Viewer.LocateObject(product)
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
