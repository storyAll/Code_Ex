import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import device from './modules/device'
import stylesParameters from './modules/stylesParameters'
import bimWebServer from './modules/bimWebServer'
import gisWebServer from './modules/gisWebServer'
import bimCache from './modules/bimCache'
import workOrderData from './modules/workOrderData'
import classification from './modules/classification' // 项目类型统一管理
import treedata from './modules/treedata' // 项目类型统一管理
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    device,
    stylesParameters,
    workOrderData,
    classification,
    treedata,
    bimWebServer,
    gisWebServer,
    bimCache
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
