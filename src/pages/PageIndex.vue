<!--// 模拟页面调用组织数据-->
<template>
  <div class="pageindex-wrapper">
    <div id="head-item-hover-dom"
         style="height: 64px;width: 100%;background-color: transparent;position: fixed;z-index: 1000;"
         @mouseenter="showHeadItem(true)"
         @mouseleave="showHeadItem(false)"
    >
      <transition name="animationTop" mode="out-in" appear>
        <head-item
          v-if="topBoxTakeUp"
          key="headitem"
          :tabs="tabs"
          :tabIndex="tabIndex"
          @changeItem="changeItem"
        ></head-item>
      </transition>
    </div>

    <!--<widget-bottom-tool-bar v-if="iViewModeIndex === 1" @handleClick="handleClickBottomTool"></widget-bottom-tool-bar>-->
    <tf-tree-box
      @handleAsideTreeTakeUp="handleAsideTreeTakeUp"
      @handleNodeClick="handleNodeClick"
      @handleChangeSearchKey="handleChangeSearchKey"
      :asideTreeTakeUp="leftBoxTakeUp"
      :controllers="iLeftTabsData"
      :treeData="treeData"
      :controllerIndex="iLeftTabsIndex"
      :treeSearchKey="iTreeSearchKey"
    ></tf-tree-box>
    <MessageList
      @handleClick="handleClickMessage"
    ></MessageList>
    <ToolBar
      @handleClick="handleClickBottomTool"
      :isBim="iViewModeIndex"></ToolBar>
    <!--{{'iViewModeIndex:'+this.iViewModeIndex}}   {{'iTabsIndex:'+this.iTabsIndex}}   {{'iDeviceIndex=>'+this.iDeviceIndex}}-->
    <router-view/>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import TfTreeBox from '@/components/tf-tree-box/TfTreeBox'
import WidgetBottomToolBar from '@/components/tf-public/WidgetBottomToolBar'
import HeadItem from '@/components/tf-banner/HeadItem'
import localTreeData from '@/router/localTreeData.json'
import MessageList from '@/pages/AlertList'
import ToolBar from '@/components/tf-tools/ToolBar'

window.iEquipmentDeviceDetailData = []
export default {
  name: 'AsideTreeBox',
  data() {
    return {
      controllerIndex: 0,
      controllers: ['设备', '管网'],
      equipmentTreeData: [],
      pipeNetworkTreeData: [],
      treeData: [],
      tabs: [
        {
          value: '设备管理',
          path: '/DeviceManager'
        },
        {
          value: '合同管理',
          path: '/ContractManager'
        },
        {
          value: '工单管理',
          path: '/WorkOrderManager'
        }
        // {
        //   value: '后台设置',
        //   path: '/BackendManager'
        // }
      ],
      tabIndex: 0
    }
  },
  components: {
    TfTreeBox,
    HeadItem,
    MessageList,
    WidgetBottomToolBar,
    ToolBar
  },
  computed: {
    ...mapGetters([
      'iTakeUpAll',
      'topBoxTakeUp',
      'leftBoxTakeUp',
      'iTabsData',
      'iTabsIndex',
      'iDeviceIndex',
      'iDeviceID',
      'iViewModeIndex',
      'iLeftTabsData',
      'iLeftTabsIndex',
      'iEquipmentData', // 设备数据
      'iPipeNetworkData', // 管网数据
      'globalNodeClick',
      'iTreeSearchKey',
      'iWorkShopIndex',
      'iWorkshopDetailData',
      'iPipeDetailData'
    ])
  },
  watch: {
    // '$route' (to, from) {
    //   console.log('to=>', to)
    //   this.mathRouter(to)
    // }
    'iTabsIndex'(to, from) {
      this.$store.commit('updateIDeviceIndex', -1)
      this.routeDispatcher(null, to, null, null)
      if (to === 2) {
        this.$store.commit('WorkShopLabelView', true)
      } else {
        this.$store.commit('WorkShopLabelView', false)
      }
      try {
        this.changeGisViewMode(to)
      } catch (e) {
        console.log('百度地图未初始化')
      }
    },
    'iDeviceIndex'(to, from) {
      this.routeDispatcher(null, null, null, to)
    },
    'iDeviceID'(to, from) {
      this.routeDispatcher(null, null, null, to)
    },
    'iViewModeIndex'(to, from) {
      console.log('watch iViewModeIndex =>', to, from)
      if (from !== to) {
        this.routeDispatcher(to)
        if (to === 0) {
          this.$store.commit('updateILeftTabsData', ['设备'])
          this.$store.commit('updateILeftTabsIndex', 0)
          this.treeData = this.iEquipmentData
          this.LocateHome()
        } else {
          this.treeData = this.iEquipmentData
          this.$store.commit('updateILeftTabsData', ['设备', '管网'])
          this.$store.commit('updateILeftTabsIndex', 0)
        }
      }
    },
    'iWorkShopIndex'(val) {
      var workshopList = this.iEquipmentData[0].children
      if (this.iViewModeIndex === 0) {
        this.treeData = [workshopList[this.iWorkShopIndex]]
      }
      // this.$store.commit('LocateHome',{})
    },
    'globalNodeClick'(val) {
      this.handleNodeClick(val)
    },
    'iLeftTabsIndex'(val) {
      this.handleAsideTreeTakeUp({index: val, b: true})
    }

  },
  created() {
    this.fetchAsideTree()
    this.mathRouter(this.$route)
  },
  methods: {
    ...mapMutations({
      setBackButtonState: 'setBackButtonState',
      locationTranslucent: 'locationTranslucent',
      LocateHome: 'LocateHome',
      equipmentShow: 'equipmentShow',
      equipmentTypeShow: 'equipmentTypeShow',
      updateIEquipmentDeviceList: 'updateIEquipmentDeviceList',
      updateIPipeList: 'updateIPipeList',
      changeGisViewMode: 'changeGisViewMode'
    }),

    // 分发路由
    routeDispatcher(iViewModeIndex, iTabsIndex, iDeviceIndex, iDeviceID, source) { //路由调度器
      /*
      * 调度参考参数
      * @param iTabsIndex  顶部tab
      * @param iDeviceIndex 设备类型
      * @param iDeviceID 设备ID
      * @param iViewModeIndex 观测模式[BIM,GIS]
      * */
      iViewModeIndex = iViewModeIndex || this.iViewModeIndex
      iTabsIndex = iTabsIndex || this.iTabsIndex
      iDeviceIndex = iDeviceIndex || this.iDeviceIndex
      iDeviceID = iDeviceID || this.iDeviceID
      var routeBook = {
        '0|0|0': '查看厂房BIM',
        '0|0|6': '查看厂房BIM',
        '0|0|1': '查看设备BIM',
        '1|0|0': '查看厂房GIS',
        '1|0|6': '查看厂房GIS',
        '1|0|1': '查看设备GIS',
        '1|0|2': '查看管路',
        '1|0|3': '查看管井',
        '1|0|5': '查看管路',
        '1|0|7': '',
        '1|0|8': '',
        '0|1|0': '合同详情BIM',
        '0|1|1': '合同统计',
        '0|1|2': '合同管路',
        '0|1|3': '合同管井',
        '0|1|4': '合同统计',
        '0|1|9': '合同详情GIS',
        '1|1|0': '合同详情GIS',
        '1|1|-1': 'ContractManager',
        '1|1|1': '合同统计',
        '1|1|2': '合同管路',
        '1|1|3': '合同管井',
        '1|1|4': '合同统计',
        '1|1|5': '合同管路', // 按照要求修改为显示管路信息而非管段
        '1|1|7': '合同管路', // 按照要求修改为显示管路信息而非管段
        '1|1|8': '合同管路', // 按照要求修改为显示管路信息而非管段
        '0|2|0': '查看工单',
        '0|2|1': '维保记录列表',
        '0|2|2': '查看工单',
        '0|2|3': '维保记录列表',
        '0|2|4': '查看工单',
        '0|2|9': '维保记录BIM',
        '1|2|-1': 'WorkOrderManager',
        '1|2|0': '维保记录列表',
        '1|2|1': '维保记录列表',
        '1|2|2': '维保记录列表',
        '1|2|3': '维保记录列表',
        '1|2|4': '维保记录列表',
        '1|2|5': '维保记录列表',
        '1|2|6': '维保记录列表'
      }
      if (iTabsIndex === 0 && [-1, 0].indexOf(iDeviceID) > -1) { // 设备管理标签并且设备id为0,-1则跳转首页
        this.$router.push({path: '/'})
      } else if (iTabsIndex === 3) {
        this.$router.push({name: '后台设置'})
      } else {
        var buildRoute = iViewModeIndex + '|' + iTabsIndex + '|' + iDeviceIndex
        var routeToName = routeBook[buildRoute]
        console.log('buildRoute=>', buildRoute, routeToName)

        // if (['查看厂房BIM', '查看设备BIM'].indexOf(routeToName) > -1) {
        //   this.$store.commit('updateILeftTabsData', ['设备'])
        //   this.$store.commit('updateILeftTabsIndex', 0)
        // } else {
        //   this.$store.commit('updateILeftTabsData', ['设备', '管网'])
        //   this.$store.commit('updateILeftTabsIndex', this.iLeftTabsIndex)
        // }

        // iDeviceID = 7436527

        // console.log('source=>', source, iTabsIndex)
        if (source === 'bim' && iTabsIndex === 2) {
          this.$router.push({name: routeToName, query: {deviceID: iDeviceID, dataIndex: 1, hint: new Date().valueOf()}})
        } else if ([7, 8].indexOf(iDeviceIndex) > -1) {
          // this.$router.push({
          //   name: routeToName,
          //   query: {deviceID: iDeviceID, type: iDeviceIndex, hint: new Date().valueOf()}
          // })
        } else if (iTabsIndex === 1 && iDeviceIndex === 3) {
          this.$router.push({
            name: routeToName,
            query: {deviceID: iDeviceID, hint: new Date().valueOf()}
          })
        }
        else {
          this.$router.push({
            name: routeToName,
            query: {deviceID: iDeviceID, type: iDeviceIndex, hint: new Date().valueOf()}
          })
        }
      }
    },
    // 获取tree数据
    fetchAsideTree() {
      if (this.iEquipmentData.length > 0 && this.iPipeNetworkData.length > 0) {
        this.equipmentTreeData = this.iEquipmentData
        this.pipeNetworkTreeData = this.iPipeNetworkData
        this.treeData = this.iLeftTabsIndex === 0 ? this.equipmentTreeData : this.pipeNetworkTreeData
      } else {
        this.$post(this.api.treeBox)
          .then((data) => {
            this.buildTreeData(data)
          })
          .catch((e) => {
            console.log('catch=>', e)
            this.buildTreeData(localTreeData)
          })
      }
    },
    buildTreeData(data) {
      // console.log('buildTreeData=>', data)
      /*
      * 整理设备信息
      * */
      var deviceDetailList = data.deviceDetail // 所有设备信息
      var deviceTree = data.deviceTree // 所有分级树
      var company = data.company // 公司厂房信息
      var pipeline = data.pipeline // 管网信息
      var pipe = data.pipe // 管井信息
      var tree = company
      tree.id = tree.ManageCompanyID
      tree.label = tree.ManageCompanyName
      tree.children = tree.WorkBuildingInfoTree
      /*
      * 处理设备
      * */
      // this.$store.commit('updateIEquipmentDeviceDetailData', deviceDetailList)
      window.iEquipmentDeviceDetailData = deviceDetailList
      this.$store.commit('updateIPipeDetailData', pipe)
      this.$store.commit('updateIPipelineDetailData', pipeline)
      this.$store.commit('updateIWorkshopDetailData', company)
      var deviceTreeBuild = this.loopDeviceTree(deviceTree, deviceDetailList)
      var deviceTreeBuildWidthBIMID = this.loopDeviceTreeDataBindBIMID(deviceTreeBuild)
      var deviceTreeDataWidthBIMID = {
        children: []
      }
      for (let deviceTreeData of deviceTreeBuildWidthBIMID) {
        if (deviceTreeData.Tree) {
          deviceTreeData.Tree.BIMIds = this.contactChildDeviceList(deviceTreeData)
        }
        deviceTreeDataWidthBIMID = Object.assign(deviceTreeDataWidthBIMID, deviceTreeData)
        deviceTreeDataWidthBIMID.children.push(deviceTreeData.Tree)
      }
      for (let index in tree.children) {
        var itemBuild = tree.children[index]
        itemBuild.label = itemBuild.Name
        itemBuild.id = itemBuild.WorkBuildingID
        itemBuild.type = 0
        // console.log('deviceTreeDataWidthBIMID=>', deviceTreeDataWidthBIMID)
        if (itemBuild.id === deviceTreeDataWidthBIMID.ModelID) {
          for (let dtd of deviceTreeDataWidthBIMID.children) {
            // console.log('itemBuild=>', itemBuild, dtd)
            itemBuild.children = dtd.children
            itemBuild.BIMIds = this.contactChildDeviceList(itemBuild)
            this.$store.commit('updateIEquipmentDeviceList', itemBuild.BIMIds) // 缓存所有设备ID
          }
        }
      }
      var treeData = this.$__.cloneDeep([tree])
      var fixData = treeData[0].children[0]
      fixData.label = '施洛特园区厂房'
      fixData.Name = '施洛特园区厂房'
      console.log('fixData=>', fixData)
      this.$store.commit('updateIEquipmentData', [fixData])

      this.equipmentTreeData = [fixData]
      this.treeData = [fixData]
      /*
      * 处理管网
      * */
      // for (let pipeNode of pipe) {
      //   pipeNode.id = pipeNode.PointID
      //   pipeNode.label = pipeNode.Name
      //   if (pipeNode.IsPipeWell) {
      //     pipeNode.type = 3
      //   }
      //   for (let pipelineNode of pipeline) {
      //     pipelineNode.id = pipelineNode.PnID
      //     pipelineNode.label = pipelineNode.Name
      //     pipelineNode.children = pipelineNode.PipePartInfo
      //     pipelineNode.type = 2
      //     for (let pipelinePartIndex in pipelineNode.children) {
      //       let pipelinePart = pipelineNode.children[pipelinePartIndex]
      //       pipelinePart.id = pipelinePart.PipePartID
      //       pipelinePart.label = pipelinePart.PipePartName
      //       pipelinePart.type = 5
      //       if (pipelinePart.children === undefined) {
      //         pipelinePart.children = []
      //       }
      //       if (pipelinePart.PointsPath.indexOf(pipeNode.id + '') > -1) {
      //         pipelinePart.children.push(pipeNode)
      //       }
      //     }
      //   }
      // }
      var pipePartDetailData = []
      var pipelineCopy = this.$__.cloneDeep(pipeline)
      for (let pipelineNode of pipelineCopy) {
        pipelineNode.id = pipelineNode.PnID
        pipelineNode.label = pipelineNode.Name
        pipelineNode.children = pipelineNode.PipePartInfo
        pipelineNode.type = 2
        for (let pipelinePartIndex in pipelineNode.children) {
          let pipelinePart = pipelineNode.children[pipelinePartIndex]
          pipelinePart.id = pipelinePart.PipePartID
          pipelinePart.label = pipelinePart.PipePartName
          pipelinePart.type = 5
          if (pipelinePart.children === undefined) {
            pipelinePart.children = []
          }
          pipePartDetailData.push(pipelinePart)
        }
        for (let p of pipe) {
          for (let PnPointIndex of p.PnPointIndex) {
            if (PnPointIndex.PnID === pipelineNode.id) {
              p.id = p.PointID
              p.label = p.Name
              p.type = 3
              pipelineNode.children.push(p)
            }
          }
        }
      }
      // console.log('pipePartDetailData=>', pipePartDetailData)
      this.$store.commit('updateIPipePartDetailData', pipePartDetailData)
      var allPipeIds = []
      // 遍历管网进行管井ID组合绑定
      let loopPipeLine = (pipeNodeList) => {
        for (let pipeNode of pipeNodeList) {
          pipeNode.PipeIds = this.getPipeIds(pipeNode)
          allPipeIds = allPipeIds.concat(pipeNode.PipeIds)
          if (pipeNode.children && pipeNode.children[0].children) {
            loopPipeLine(pipeNode.children)
          }
        }
      }

      allPipeIds = this.$__.uniq(allPipeIds)
      this.$store.commit('updateIPipeList', allPipeIds) // 缓存所有管井ID
      // loopPipeLine(pipeline)

      var pipeBuildData = [{
        id: 'tbjs',
        label: '天保建设',
        children: pipelineCopy
      }]
      var pipelineData = this.$__.cloneDeep(pipeBuildData)
      console.log('pipelineData=>', pipelineData)
      let fixChildren = []
      for (let c of pipelineData[0].children[0].children) {
        fixChildren.push(c)
      }
      for (let c of pipelineData[0].children[1].children) {
        fixChildren.push(c)
      }
      let fix2Children = []
      for (let c of pipelineData[0].children[2].children) {
        fix2Children.push(c)
      }
      for (let c of pipelineData[0].children[3].children) {
        fix2Children.push(c)
      }
      var fixPipe = [
        {
          id: '-1',
          label: '施洛特园区通信管网',
          // children: [pipelineData[0].children[0], pipelineData[0].children[1]]
          children: fixChildren
        },
        {
          id: '0',
          label: '空港园区通信管网',
          // children: [pipelineData[0].children[2], pipelineData[0].children[3]]
          children: fix2Children
        }
      ]
      this.$store.commit('updateIPipeNetworkData', fixPipe)
      // this.pipeNetworkTreeData = this.iPipeNetworkData[0].children
      this.pipeNetworkTreeData = fixPipe
      if (this.iLeftTabsIndex === 0) {
        this.treeData = this.equipmentTreeData
      } else {
        this.treeData = this.pipeNetworkTreeData
      }
    },
    loopDeviceTree(deviceTree, deviceDetailList) {
      let loopNode = (deviceTree) => {
        for (let nodeIndex in deviceTree) {
          let nodeItem = deviceTree[nodeIndex]
          nodeItem.id = nodeItem.ID
          nodeItem.label = nodeItem.Name
          if (nodeItem.Children && nodeItem.Children.length > 0) {
            nodeItem.children = nodeItem.Children
            nodeItem.type = 6
            loopNode(nodeItem.children)
          } else if (nodeItem.hasOwnProperty('Tree') && nodeItem.Tree.Children != null && nodeItem.Tree.Children.length > 0) {
            nodeItem.Tree.id = nodeItem.Tree.ID
            nodeItem.Tree.label = nodeItem.Tree.Name
            nodeItem.type = 6
            nodeItem.Tree.children = nodeItem.Tree.Children
            loopNode(nodeItem.Tree.children)
          } else if (nodeItem.ObjectIDs && nodeItem.ObjectIDs.length > 0) {
            nodeItem.type = 6
            let resultList = this.filterDeviceDetail(nodeItem.ObjectIDs, deviceDetailList)
            nodeItem.children = resultList
          }
        }
      }
      loopNode(deviceTree)
      return deviceTree
    }, // 循环处理节点并绑定设备详情
    filterDeviceDetail(ObjectIDs, deviceDetailList) {
      var resultList = []
      for (let deviceDetail of deviceDetailList) {
        if (ObjectIDs.indexOf(deviceDetail.ID + '') > -1) {
          deviceDetail.label = deviceDetail.Properties[deviceDetail.Properties.length - 1].value
          deviceDetail.id = deviceDetail.ID
          deviceDetail.type = 1
          resultList.push(deviceDetail)
        }
      }
      return resultList
    }, // 根据设备id数组过滤需要的设备详情
    loopDeviceTreeDataBindBIMID(deviceTreeBuild) {
      let loopNode = (deviceTreeBuild) => {
        for (let nodeIndex in deviceTreeBuild) {
          let nodeItem = deviceTreeBuild[nodeIndex]
          nodeItem.id = nodeItem.ID
          nodeItem.label = nodeItem.Name
          if (nodeItem.Children && nodeItem.Children.length > 0) {
            nodeItem.children = nodeItem.Children
            nodeItem.type = 6
            nodeItem.BIMIds = this.getBIMIds(nodeItem)
            loopNode(nodeItem.children)
          } else if (nodeItem.hasOwnProperty('Tree') && nodeItem.Tree.Children != null && nodeItem.Tree.Children.length > 0) {
            nodeItem.Tree.id = nodeItem.Tree.ID
            nodeItem.Tree.label = nodeItem.Tree.Name
            nodeItem.type = 6
            nodeItem.Tree.children = nodeItem.Tree.Children
            loopNode(nodeItem.Tree.children)
          } else if (nodeItem.ObjectIDs && nodeItem.ObjectIDs.length > 0) {
            nodeItem.type = 6
            nodeItem.id = nodeItem.ID
            nodeItem.BIMIds = this.getBIMIds(nodeItem)
          }
        }
      }
      loopNode(deviceTreeBuild)
      return deviceTreeBuild
    }, // 循环处理节点并添加子树下所有设备详情
    contactChildDeviceList(node) {
      var BIMIds = []
      if (node.children) {
        for (let t of node.children) {
          if (t.BIMIds) {
            BIMIds = BIMIds.concat(t.BIMIds)
          }
        }
      }
      return BIMIds
    },
    getBIMIds(o) {
      let arr = []
      let getIds = (o) => {
        if (o.children && o.children.length !== 0) {
          o.children.forEach(function (v, i) {
            getIds(v)
          })
        } else {
          arr.push(o.ID)
        }
      }
      getIds(o)
      // console.log('arr=>',arr)
      return arr
    },
    getPipeIds(o) {
      let arr = []
      let getIds = (o) => {
        if (o.IsPipeWell) {
          arr.push(o.PointID)
        } else {
          o.children.forEach(function (v, i) {
            getIds(v)
          })
        }
      }
      getIds(o)
      // console.log('arr=>',arr)
      return arr
    },
    /*处理左侧树收展，与tab切换*/
    handleAsideTreeTakeUp(e) {
      var {index, b} = e
      console.log('index,b=>', index, b)
      this.$store.commit('updateILeftTabsIndex', index)
      if (index === 0) {
        this.treeData = this.equipmentTreeData
      } else {
        this.treeData = this.pipeNetworkTreeData
      }
      if (b === true || b === false) {
        this.$store.commit('chLeftBoxTakeUp', b)
      } else {
        this.$store.commit('chLeftBoxTakeUp', false)
      }
    },
    /*点击树及诶单*/
    handleNodeClick(e) {
      console.log('handleNodeClick=>', e)
      let {id, type, X, Y, label, source} = e
      this.$store.commit('updateIDeviceID', id)
      if (source !== undefined) {
        setTimeout(() => {
          this.$store.commit('chRightBoxTakeUp', true)
          this.routeDispatcher(null, null, null, null, source)
        }, 400)
      }
      var positon = {x: X, y: Y}
      type = type === undefined ? -1 : type

      if ([2, 3].indexOf(type) > -1) { // 判定如果是查看管井、管路，则转换查看模式为GIS
        // this.$store.commit('updateIViewModeIndex', 1)
      } else {
      }
      this.$store.commit('updateIDeviceIndex', type)
      this.$store.commit('updateIDeviceID', id)
      //
      var BIMIds = []
      var PipeIds = []
      if ([0, 1].indexOf(type)) {
        BIMIds = e.BIMIds || []
        if (type === 1) {
          BIMIds = [id]
        }
      } else {
        PipeIds = e.PipeIds || []
      }
      var that = this
      // console.log('type,BIMids,PipeIds=>', type, BIMIds, PipeIds, e)
      console.log('type=>', type)
      var matchWorkShop = function (cBIMIds) {
        console.log('matchWorkShop=>', cBIMIds)
        let cBIMIdsStr = cBIMIds.join(',')
        let iEquipmentData = that.iEquipmentData
        for (let workshop of iEquipmentData[0].children) {
          let sBIMIdsStr = workshop.BIMIds.join(',')

          if (sBIMIdsStr.indexOf(cBIMIdsStr) > -1) {
            let pos = {x: workshop.X, y: workshop.Y}
            pos = {x: 117.393061, y: 39.161752}
            id = 'wb_0'
            type = 0
            // let id = workshop.id
            that.$store.commit('LocateCurrentView', {id: id, pos: pos, level: 20, type: type})
          }
        }

        // console.log('iWorkshopDetailData=>', iWorkshopDetailData)
      }
      switch (type) {
        // 厂房
        case 0:
          if (label !== undefined) {
            let index = label.replace('号厂房', '')
            this.$store.commit('updateIWorkShopIndex', parseInt(index) - 1)
          }
          this.$store.commit('chRightBoxTakeUp', true)
          if (this.iViewModeIndex === 0) {
            try {
              this.LocateHome()
            } catch (e) {
              console.log('未加载bim模型')
            }
          } else {
            try {
              // this.$store.commit('LocateMainView', '')
              console.log('positon=>', positon)
              if (positon.x !== undefined && positon.y !== undefined) {
                this.$store.commit('LocateCurrentView', {id: id, pos: positon, level: 20, type})
              }
            } catch (e) {
              console.log('未加载gis模型=>', e)
            }
          }

          break
        // 设备组
        case 6:
          // this.$store.commit('chRightBoxTakeUp', false) //关闭右侧列表 -> 2018-11-20 默认不关闭
          // BIMIds = ['7436527', '7436528']
          try {
            this.locationTranslucent(BIMIds)
            // this.equipmentTypeShow(BIMIds)
            matchWorkShop(BIMIds)
          } catch (e) {
            console.log('未加载bim模型')
          }

          break
        // 设备
        case 1:
          if (this.iTabsIndex === 0) {
            this.$store.commit('chRightBoxTakeUp', true)
          }
          console.log('BIMIds=>', BIMIds)
          // BIMIds[0] = '6881485'
          if (this.iViewModeIndex === 0) {
            try {
              this.locationTranslucent(BIMIds[0])
            } catch (e) {
              console.log('未加载bim模型=>', e)
            }
          } else {
            try {
              // this.$store.commit('LocateMainView', '')
              matchWorkShop(BIMIds)
              if (positon.x !== undefined && positon.y !== undefined) {
                this.$store.commit('LocateCurrentView', {id, pos: positon, level: 20, type: type})
              }
            } catch (e) {
              console.log('未加载gis模型=>', e)
            }
          }
          break
        case 5: // 管段
          if (this.iViewModeIndex === 1) {
            /**/
            let PointsPath = e.PointsPath
            console.log('PointsPath=>', PointsPath)
            let positon1 = this.getPosByPipeId(PointsPath[0])
            let positon2 = this.getPosByPipeId(PointsPath[1])
            positon = {x: (positon1.x + positon2.x) / 2, y: (positon1.y + positon2.y) / 2}
            this.$store.commit('LocateCurrentView', {id: id, pos: positon, level: 20, type: type})
            if (this.iTabsIndex === 1) {
              setTimeout(() => {
                console.log('跳转到管孔检测面板')
                this.$router.push({
                  name: '合同管段',
                  query: {deviceID: id, hint: new Date().valueOf()}
                })
              }, 10)
            }
          }
          break
        case 7:
          console.log('type 7=>', id)
          this.$store.commit('updateIDeviceID', id)
          if (this.iTabsIndex === 1) {
            this.$router.push({
              name: '合同管段',
              query: {deviceID: id, type: type, hint: new Date().valueOf()}
            })
          }
          break
        case 8:
          console.log('type 8=>', id)
          this.$store.commit('updateIDeviceID', id)
          if (this.iTabsIndex === 1) {
            this.$router.push({
              name: '合同管段',
              query: {deviceID: id, type: type, hint: new Date().valueOf()}
            })
          }
          break
        default:
          this.$store.commit('chRightBoxTakeUp', true)

          if (this.iViewModeIndex === 0) {
            try {
              this.LocateHome()
            } catch (e) {
              console.log('未加载bim模型')
            }
          } else {
            try {
              this.$store.commit('LocateCurrentView', {id: id, pos: positon, level: 20, type: type})
            } catch (e) {
              console.log('未加载gis模型=>', e)
            }
          }
      }
    },

    /*根据管井id获取坐标*/
    getPosByPipeId(id) {
      let iPipeDetailData = this.iPipeDetailData
      for (let pipe of iPipeDetailData) {
        if (pipe.id === id) {
          return {x: pipe.X, y: pipe.Y}
        }
      }
    },
    /*修改左侧树结构查询数据*/
    handleChangeSearchKey(e) {
      this.$store.commit('updateITreeSearchKey', e)
    },
    changeItem(index) {
      // 切换tab重置数据
      if (this.tabIndex !== ~~index) {
        this.$store.commit('updateITabsIndex', parseInt(index))
        this.$store.commit('updateIDeviceIndex', 0)
        this.$store.commit('updateIDeviceID', 0)
        // this.$store.commit('updateIViewModeIndex', 1) // 切换顶部页签不更改viewMode
        this.$store.commit('chfootExhPutCont', false)

        let path = this.tabs[index].path
        this.tabIndex = parseInt(index)
        this.$router.push(path)
      }
    },
    /*点击底部工具栏*/
    handleClickBottomTool(val) {
      console.log('handleClickBottomTool=>', val)
      this.$store.commit('LocateCurrentView', {type: 'clearHightList'})
      if (this.iViewModeIndex === 1) {
        if (val === 1) {
          this.$store.commit('GisZoomUp', {})
        } else if (val === 0) {
          this.$store.commit('GisZoomDown', {})
        } else if (val === 3) {
          this.$store.commit('LocateMainView')
          var path = this.mathRouter(this.$route)
          this.$router.push({path: path})
        } else if (val === 4) {
          this.packUpAll()
        }
      } else {
        if (val === 3) {
          this.packUpAll()
        } else {
          this.$store.commit('LocateHome')
          var path = this.mathRouter(this.$route)
          this.$router.push({path: path})
        }
      }
    },
    packUpAll() {
      this.$store.commit('chITakeUpAll', !this.iTakeUpAll)
    },
    /*点击消息中心*/
    handleClickMessage(val) {
      // this.$store.commit('updateAlertListStatus', false)
      // this.$store.commit('updateITabsIndex', 1)
      // this.tabIndex = 1
      // this.$store.commit('chfootExhPutCont', true)
      this.$router.push({name: '合同详情GIS', query: {dataIndex: 0}})
    },
    /*页面初始化中解析响应顶部tabIndex*/
    mathRouter: function (route) {
      var vm = this
      var firstPath = route.matched[1].path
      var regex = new RegExp(firstPath)
      for (let i in this.tabs) {
        let tab = this.tabs[i]
        let judgeIndex = regex.test(tab.path)
        if (judgeIndex) {

          vm.tabIndex = parseInt(i)
          vm.$store.commit('updateITabsIndex', parseInt(i))
          return tab.path
        }
      }
    },
    /*
    * 显示顶部栏
    * */
    showHeadItem(val) {
      if (!this.iTakeUpAll) {
        this.$store.commit('chTopBoxTakeUp', val)
      }
    }
  }
}
</script>
<style scoped lang="less">
  .pageindex-wrapper {
    height: 0;
    min-width: @minWidth;
  }
</style>
