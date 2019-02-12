<template>
  <div id="app" ref="app">
    <router-view v-show="initShow"/>
    <iframe src="/bim.html" name="bimFrame" class="iframe-fade" ref="bimFrame" id="bimFrame" key="bimFrame"
            :style="{positioin:'absolute',zIndex:1 - iViewModeIndex}"
    ></iframe>
    <!--<iframe  src="/localBim/index.html" name="bimFrame" class="iframe-fade" ref="bimFrame" id="bimFrame" key="bimFrame"-->
    <!--:style="{positioin:'absolute',zIndex:1 - iViewModeIndex}"-->
    <!--&gt;</iframe>-->
    <iframe src="./gis.html" name="gisFrame" class="iframe-fade" ref="gisFrame" id="gisFrame" key="gisFrame"
            :style="{positioin:'absolute',zIndex:iViewModeIndex}"
    ></iframe>
    <bim-projectile-frame
      class="tipDialog"
      :proBoxtitle="proBoxtitle"
      :proBoxObj="proBoxObj"
      :positionNo="positionNo"
      :positionShow="positionShow"
    ></bim-projectile-frame>
  </div>
</template>

<script>
// import {Message} from 'element-ui';
import json from './router/router3.json'
import {mapMutations, mapGetters} from 'vuex'
import bimProjectileFrame from './components/bim-projectile-frame'

export default {
  name: 'App',
  data () {
    return {
      initShow: false,
      proBoxtitle: '',
      proBoxObj: [],
      positionNo: {
        x: '300px',
        y: '300px'
      },
      positionShow: false
    }
  },
  mounted () {
    console.log('pre get json=>')
    // this.$get('https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/lib/jquery-1.10.2_1c4228b8.js')
    //   .then((res)=>{
    //     console.log('res=>',res)
    //   })
    //   .catch((err) => {
    //     console.log('err=>',err)
    //   })
    console.log('this.$route.query.initBim=>', this.$route.query.initBim)
    this.preBim()
    if (this.$route.query.initBim !== undefined) {
      this.preBim()
    } else {
      this.initShow = true
    }
    this.preGis()
  },
  computed: {
    ...mapGetters(['iViewModeIndex', 'iTabsIndex'])
  },
  methods: {
    ...mapMutations(['equipmentDyeing']),
    preBim () {
      const loading = this.$loading({
        lock: true,
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let that = this
      var getPosByModelID = (ModelID) => {
        var treeData = that.$store.state.treedata.iEquipmentData
        for (let tree of treeData) {
          for (let model of tree.children) {
            console.log('model=>', model)
            if (ModelID === model.id) {
              return model.Name
            }
          }
        }
        return '无匹配位置'
      }
      let initBIM = () => {
        var bimFrame = this.$refs['bimFrame']
        // var bimFrame = document.getElementById('bimFrame')
        // console.log('bimFrame=>', bimFrame)
        console.dir(bimFrame)
        bimFrame.window = bimFrame.contentWindow
        if (typeof bimFrame !== 'undefined' && bimFrame.window && typeof bimFrame.window.init !== 'undefined') {
          console.log('bimFrame.window.init==>')
          bimFrame.window.init({
            initCallback: function () {
              loading.close()
              window.bimFrame.BIM.Viewer.LoadData({
                structure: 'http://192.168.41.192:8080/RevitDisplaySystem/Data/jdall2.rvt',
                proterty: 'http://192.168.41.192:8080/RevitDisplaySystem/Data/jdall2.rvt.Properties'
                //  structure: 'http://192.168.41.192:8080/RevitDisplaySystem/Data/jdall0.rvt',
                //  proterty: 'http://192.168.41.192:8080/RevitDisplaySystem/Data/jdall0.rvt.Properties',
                //  structure: 'http://192.168.41.192:8080/RevitDisplaySystem/Data/rac_basic_sample_project.rvt',
                //  proterty: 'http://192.168.41.192:8080/RevitDisplaySystem/Data/rac_basic_sample_project.rvt.Properties',
              }, function () {
                that.initShow = true
                // 7419096
              })
            },
            click: function (obj) {
              console.log(obj)
              if (window.bimFrame.contentWindow) {
                window.bimFrame.contentWindow.BIM.Viewer.SetTranslucentObjects('["T0"]', 0.3)
                window.bimFrame.contentWindow.BIM.Viewer.SetTranslucentObjects(JSON.stringify([obj.id]), 1)
              } else {
                window.bimFrame.window.BIM.Viewer.SetTranslucentObjects('["T0"]', 0.3)
                window.bimFrame.window.BIM.Viewer.SetTranslucentObjects(JSON.stringify([obj.id]), 1)
              }
              let objId = obj.id
              let arr = that.$store.state.bimCache.equipmentsInfo
              let equipmentInfoObj = arr[objId] || null
              equipmentInfoObj && (that.$router.push(
                {
                  path: json[equipmentInfoObj.parent.ID],
                  query: {
                    'id': objId,
                    name: equipmentInfoObj.properties[equipmentInfoObj.properties.length - 1].value,
                    type: 'equipment'
                  }
                }))
              objId = null
              arr = null
              equipmentInfoObj = null
              console.log('BIM 单击')
              let clickNode = {
                id: obj.id,
                type: 1,
                source: 'bim',
                time: new Date()
              }
              that.$store.commit('updateGlobalNodeClick', clickNode)
              //  alert('单击BIm' + obj.id || 0)
            },
            dbclick: function (obj) {
              // bim模型还没加
              // 半透明所有
              this.click(obj)
              console.log('双击')
              if (window.bimFrame.contentWindow) {
                window.bimFrame.contentWindow.BIM.Viewer.SetTranslucentObjects('["T0"]', 0.3)
                window.bimFrame.contentWindow.BIM.Viewer.SetTranslucentObjects(JSON.stringify([obj.id]), 1)
              } else {
                window.bimFrame.window.BIM.Viewer.SetTranslucentObjects('["T0"]', 0.3)
                window.bimFrame.window.BIM.Viewer.SetTranslucentObjects(JSON.stringify([obj.id]), 1)
              }
            },
            hover: function (obj) {
              console.log('bim hover=>', obj, that)
              obj.id = '6575270'
              let objId = obj.id
              // console.log('that.$store.state.treedata=>', that.$store.state.treedata)
              // console.log('window.iEquipmentDeviceDetailData=>',window.iEquipmentDeviceDetailData)
              // let arr = that.$store.state.treedata.iEquipmentDeviceDetailData
              let arr = window.iEquipmentDeviceDetailData
              let equipmentInfoObj = arr[objId] || null
              // console.log('arr=>', arr)
              for (let device of arr) {
                if (device.ID === objId) {
                  equipmentInfoObj = device
                }
              }
              console.log('equipmentInfoObj=>', equipmentInfoObj)
              if (equipmentInfoObj) {
                let proBoxObj = [
                  {
                    name: '类型',
                    des: '类型'
                  },
                  {
                    name: '位置',
                    des: '位置'
                  }
                ]
                proBoxObj[0].des = equipmentInfoObj.TreeParent[0].Parent.Name
                proBoxObj[1].des = '天宝建设' + getPosByModelID(equipmentInfoObj.ModelID)
                that.proBoxObj = proBoxObj
                that.proBoxtitle = equipmentInfoObj.Properties[equipmentInfoObj.Properties.length - 1].value
                that.positionNo = {x: obj.x + 'px', y: obj.y + 'px'}
                !that.positionShow && (that.positionShow = true)
                proBoxObj = null
              } else {
                that.proBoxtitle = '暂无此设备信息'
                that.positionNo = {x: obj.x + 'px', y: obj.y + 'px'}
              }
              objId = null
              arr = null
              equipmentInfoObj = null
            },
            hoverEnd: function (obj) {
              console.log('bim hoverEnd=>')
              // alert('悬停结束' + obj.id || 0)
              that.positionShow && (that.positionShow = false)
            },
            loadDataCallback: function () {
              let fault = [] //故障
              let off = [] //停运 0
              let service = [] //正常 1
              that.$post('enquipmentStatus/enquipmentOidOfsStatus.rest').then((res) => {
                return new Promise((resolve, reject) => {
                  res.forEach((item) => {
                    if (item.useStatus === '0') {
                      off.push(item.equipmentOid)
                    } else if (item.useStatus === '1') {
                      service.push(item.equipmentOid)
                    } else if (item.useStatus === '2') {
                      fault.push(item.equipmentOid)
                    }
                  })
                  resolve(off, service, fault)
                })
              }).then(async () => {
                await that.equipmentDyeing({
                  ids: off,
                  rgbNo: '0'// FFCC00 黄 停运中黄色 0
                })
                await that.equipmentDyeing({
                  ids: service,
                  rgbNo: '1'// 3BCD64 绿 运行中绿色 1
                })
                await that.equipmentDyeing({
                  ids: fault,
                  rgbNo: '2'// F5222D 红 故障中红色 2
                })
              })
            }
          })
        } else {
          console.log('bimFrame.window.init==>2')
          setTimeout(() => {
            initBIM()
          }, 500)
        }
      }
      initBIM()
    },
    preGis () {
      let that = this
      let initGIS = () => {
        console.log('initGIS=>')
        var gisFrame = this.$refs['gisFrame']
        var gisFrameEvent = gisFrame.contentWindow || gisFrame.window
        if (typeof gisFrame !== 'undefined' && gisFrameEvent.init !== undefined) {
          console.log('gisFrame.window.init==>', gisFrameEvent)
          gisFrameEvent.BMapInit(that.iTabsIndex + 1)

          let changeTypeToSelf = (type) => {
            let map = {
              'CF': 0,
              'GJ': 3,
              'GX': 2,
              'GD': 5
            }
            return map[type]
          }
          var tipBox = document.getElementById('gisTipBox').cloneNode(true)
          tipBox.style.display = 'block'
          let setDomContent = function (title, desc, pos) {
            tipBox.children[0].innerHTML = title
            tipBox.children[1].innerHTML = desc
            tipBox.children[2].innerHTML = pos
            return tipBox
          }

          gisFrameEvent.init({
            click: function (obj) {
              // let PipeDeviceData = that.$store.state.treedata.iPipeDetailData
              // let iPipelineDetailData = that.$store.state.treedata.iPipelineDetailData
              // let iWorkshopDetailData = that.$store.state.treedata.iWorkshopDetailData

              let type = changeTypeToSelf(obj.type)
              let id = obj.id
              let clickNode = {
                id: id,
                type: type,
                time: new Date()
              }
              let PipeDeviceData = that.$store.state.treedata.iPipeDetailData
              let iPipelineDetailData = that.$store.state.treedata.iPipelineDetailData
              let iWorkshopDetailData = that.$store.state.treedata.iWorkshopDetailData
              var labelData = ''
              if (type === 0) { // 厂房
                for (let workshop of iWorkshopDetailData.children) {
                  if (workshop.id === id) {
                    labelData = workshop.label
                  }
                }
              } else if (type === 3) { // 管井
                for (let pipe of PipeDeviceData) {
                  if (pipe.id === id) {
                    labelData = pipe.label
                  }
                }
              } else if (type === 2) { //  管线
                for (let pipeline of iPipelineDetailData) {
                  if (pipeline.id === id) {
                    labelData = pipeline.label
                  }
                }
              } else if (type === 5) { // 管段
                console.log('iPipelineDetailData=>',iPipelineDetailData)
                for (let pipeline of iPipelineDetailData) {
                  for (let pipepart of pipeline.PipePartInfo) {
                    if (pipepart.PipePartID === id) {
                      labelData = pipepart.PipePartName
                      clickNode.PointsPath = pipepart.PointsPath
                    }
                  }
                }
              }
              console.log('gis click obj=>', obj, type, labelData)
              if (type === 0) {
                that.$store.commit('updateILeftTabsIndex', 0)
              } else {
                that.$store.commit('updateILeftTabsIndex', 1)
              }
              setTimeout(() => {
                // that.$store.commit('updateITreeSearchKey', labelData) // 不需要关联左侧搜索
                that.$store.commit('updateGlobalNodeClick', clickNode)
              }, 300)
            },
            dbclick: function (obj) {
              let PipeDeviceData = that.$store.state.treedata.iPipeDetailData
              let iPipelineDetailData = that.$store.state.treedata.iPipelineDetailData
              let iWorkshopDetailData = that.$store.state.treedata.iWorkshopDetailData
              let type = changeTypeToSelf(obj.type)
              let id = obj.id

              var position = {}
              if (type === 0) { // 厂房
                for (let workshop of iWorkshopDetailData.children) {
                  if (workshop.id === id) {
                    position = {x: workshop.X, y: workshop.Y}
                  }
                }
              } else if (type === 3) { // 管井
                for (let pipe of PipeDeviceData) {
                  if (pipe.id === id) {
                    position = {x: pipe.X, y: pipe.Y}
                  }
                }
              } else if (type === 2) { //  管线
                for (let pipeline of iPipelineDetailData) {
                  if (pipeline.id === id) {

                  }
                }
              } else if (type === 5) { // 管段
                console.log('iPipelineDetailData=>', iPipelineDetailData)
                for (let pipeline of iPipelineDetailData) {
                  for (let pipepart of pipeline.children) {
                    if (pipepart.id === id) {
                    }
                  }
                }
              }
              console.log('position=>', position)
              if (position.x !== undefined && position.y !== undefined) {
                that.$store.commit('LocateCurrentView', {id: id, pos: position, level: 18, type: type})
              }
              let clickNode = {
                id: id,
                type: type,
                time: new Date()
              }
              that.$store.commit('updateGlobalNodeClick', clickNode)
            },
            hover: function (obj) {
              let PipeDeviceData = that.$store.state.treedata.iPipeDetailData
              let iPipelineDetailData = that.$store.state.treedata.iPipelineDetailData
              let iWorkshopDetailData = that.$store.state.treedata.iWorkshopDetailData
              let type = changeTypeToSelf(obj.type)
              let id = obj.id
              console.log('gis hover=>', type, id)

              if (type === 0) { // 厂房
                for (let workshop of iWorkshopDetailData.children) {
                  if (workshop.id === id) {
                    let title = `标题:${workshop.label}`
                    let des = `位置:经度 ${workshop.X} 纬度 ${workshop.Y}`
                    let pos = `描述:  ${iWorkshopDetailData.ManageCompanyName}`
                    var tipBoxDom = setDomContent(title, des, pos)
                    return tipBoxDom
                  }
                }
              } else if (type === 3) { // 管井
                for (let pipe of PipeDeviceData) {
                  if (pipe.id === id) {
                    let title = `标题:${pipe.label}`
                    let pos = `位置:经度 ${pipe.X} 纬度 ${pipe.Y}`
                    // let pos = `描述:  ${iWorkshopDetailData.ManageCompanyName}`
                    let lineId = pipe.PnID[0]
                    let PipePartIDList = pipe.PipePartID
                    var des = ''
                    for (let pipeline of iPipelineDetailData) {
                      if (pipeline.id === lineId) {
                        des = pipeline.label
                        var PipePartDescFilter = []
                        for (let PipePart of pipeline.PipePartInfo) {
                          if (PipePartIDList.indexOf(PipePart.id) > -1) {
                            PipePartDescFilter.push(PipePart.label)
                          }
                        }
                        if (PipePartDescFilter.length > 1) {
                          des = '描述:处于 ' + des + ' 中 ' + PipePartDescFilter.join(',') + ' 的交界处'
                        } else if (PipePartDescFilter.length === 1) {
                          des = '描述:处于 ' + des + ' 中 ' + PipePartDescFilter.join(',') + ' 的边界处'
                        } else {
                          des = '描述:处于 ' + des + ' 中 '
                        }
                      }
                    }
                    let tipBoxDom = setDomContent(title, des, pos)
                    return tipBoxDom
                  }
                }
              } else if (type === 2) { //  管线
                for (let pipeline of iPipelineDetailData) {
                  if (pipeline.PnID === id) {
                    let title = pipeline.Name
                    let des = `描述:拥有 ${pipeline.PipePartInfo.length}个管段`
                    let pos = `位置:  ${iWorkshopDetailData.ManageCompanyName}`
                    let tipBoxDom = setDomContent(title, des, pos)
                    console.log('tipBoxDom=>', tipBoxDom)
                    return tipBoxDom
                  }
                }
              } else if (type === 5) { // 管段
                console.log('iPipelineDetailData=>', iPipelineDetailData)
                for (let pipeline of iPipelineDetailData) {
                  console.log('pipeline=>',pipeline)
                  for (let pipepart of pipeline.PipePartInfo) {
                    if (pipepart.PipePartID === id) {
                      let title = `标题:${pipepart.PipePartName}`
                      let des = `描述: 拥有 ${pipepart.PointsPath.length} 个管井`
                      let pos = `位置: ${pipeline.Name}`
                      let tipBoxDom = setDomContent(title, des, pos)
                      return tipBoxDom
                    }
                  }
                }
              }
            }
          })
        } else {
          setTimeout(() => {
            initGIS()
          }, 500)
        }
      }
      initGIS()
    }
  },
  components: {
    bimProjectileFrame
  }

}
</script>

<style lang="less">
  @import "./assets/style/iconfont.css";
  @import "./base.css";
  @import './font-face/font.css';

  .el-message__content{
    color:#333333 !important;
  }
  #app {
    background: linear-gradient(RGBA(0, 105, 175, 1), RGBA(107, 145, 189, 1), RGBa(155, 135, 159, 1), RGBA(111, 104, 128));
    width: 100%;
    height: 100%;
    min-width: @minWidth;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }

  body {
    font-family: Roboto-Light, SF-UI-Text-Light, pingfang !important;
  }

  #bimFrame {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    /* background: url("./assets/images/common/bim-bg-b.png"); */
    background: url("./assets/images/common/bg-2.png");
  }

  #gisFrame {
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    /* background: url("./assets/images/common/bim-bg-b.png"); */
    /*background: url("./assets/images/common/bg-2.png");*/
  }
</style>
