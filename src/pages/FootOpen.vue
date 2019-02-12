<template>
  <transition name="animationBottom">
    <div class="foot" v-show="footExhPutCont">
      <span class="close" @click="close">收起</span>
      <!--组件标题-->
      <h2 class="foot-title">{{fieldData.title}}</h2>
      <!--tabs标签动态-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="item" :key="index" :name="(index+1+'')" v-for="(item,index) in fieldData.tabs">
          <BaseList>
            <!--slot根据页签来进行切换不同的slot子组件=>EquipmentList组件-->
            <!--设备管理-->
            <EquipmentListFilterItem
              @equipmentListFilterItemParam="getListByParam"
              v-if="item==='设备列表'" slot="设备列表"
              :equipmentCategoryData="equipmentCategoryData">
            </EquipmentListFilterItem>
            <!--合同管理-->
            <ContractListFilter
              @contractListFilterParam="getListByParam"
              v-else-if="item==='合同列表'" slot="合同列表"
              :contractStatusData="contractStatusData">
            </ContractListFilter>
            <CostListFilter
              @costListFilterParam="getListByParam"
              v-else-if="item==='费用列表'" slot="费用列表"
              :costStatusData="costStatusData">
            </CostListFilter>
            <!--工单管理-->
            <MaintenanceRecord
              @maintenanceRecordParam="getListByParam"
              v-else-if="item==='维保记录'" slot="维保记录"
              :systemTypeData="systemTypeData"
              :workOrderStatusData="workOrderStatusData">
            </MaintenanceRecord>
            <PlanTask
              @planTaskParam="getListByParam"
              v-else slot="计划任务"
              :systemTypeData="systemTypeData">
            </PlanTask>
            <!--table区域-->
            <BaseTable
              @handleClickLocation="handleClickLocation"
              @handleClickRow="handleClickRow"
              :tableData="tableData" :tableHeads="tableHeads(item)" slot="2"/>
            <el-pagination slot="3"
                           class="pagination"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="[5, 10, 15 ]"
                           :page-size="10"
                           layout=" prev, pager, next, sizes,jumper"
                           :total="50">
            </el-pagination>
          </BaseList>
        </el-tab-pane>
      </el-tabs>
    </div>
  </transition>
</template>

<script>
import BaseTable from '@/components/tf-public/BaseTable.vue'
import EquipmentListFilterItem from '@/components/tf-public/tf-list-filter/EquipmentListFilterItem'
import CostListFilter from '@/components/tf-public/tf-list-filter/CostListFilter'
import ContractListFilter from '@/components/tf-public/tf-list-filter/ContractListFilter'
import MaintenanceRecord from '@/components/tf-public/tf-list-filter/MaintenanceRecord'
import PlanTask from '@/components/tf-public/tf-list-filter/PlanTask'
import BaseList from '@/components/tf-tables/BaseList'
import {mapGetters, mapMutations} from 'vuex'
import filedJson from '@/api/filed.json'
import th from '@/api/tableHead.json'
import {equipmentListUrl, maintenanceRecordUrl, planTaskUrl, contractListUrl, costListUrl} from '@/api/requestUrl.js'

export default {
  name: 'FootOpen',
  components: {
    BaseList,
    BaseTable,
    EquipmentListFilterItem,
    CostListFilter,
    ContractListFilter,
    MaintenanceRecord,
    PlanTask
  },
  data: function () {
    return {
      activeName: '1',
      show: 'false',
      systemTypeData: [
        '能源系统',
        '消防系统'
      ],
      equipmentCategoryData: [
        '消防设备',
        '照明设备'
      ],
      contractStatusData: [
        '当前合同',
        '未来合同',
        '历史合同'
      ],
      costStatusData: [
        '已缴费用',
        '待缴费用'
      ],
      workOrderStatusData: [
        '已接单',
        '未接单',
        '已完成'
      ],
      currentPage: 1,
      tableData: [],
      tabIndex: 0
    }
  },
  watch: {
    '$route' (to, from) {
      let dataIndex = to.query.dataIndex
      // console.log('to dataIndex', dataIndex)
      dataIndex = dataIndex === undefined ? 0 : dataIndex
      this.handleClick({index: dataIndex})
    }
  },
  methods: {
    getListData: async function (url, data) {
      var res = await this.$post(url, data)
      this.tableData = res
    },
    preTableData: function () {
      let str = this.iTabsData[this.iTabsIndex]
      switch (str) {
        case '设备管理':
          this.getListData(equipmentListUrl, {equipmentType: 1})
          break
        case '合同管理':
          let contractUrls = [contractListUrl, costListUrl]
          this.getListData(contractUrls[this.activeName - 1], {equipmentType: 1})
          break
        case '工单管理':
          let workOderUrls = [maintenanceRecordUrl, planTaskUrl]
          this.getListData(workOderUrls[this.activeName - 1], {equipmentType: 1})
          break
      }
      return []
    },
    handleClick: function (val) {
      // console.log('handleClick=>', val)
      let index = parseInt(val.index)
      this.tabIndex = index
      this.activeName = index + 1 + ''
    },
    handleSizeChange: function (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange: function (val) {
      console.log(`当前页: ${val}`)
    },
    /*点击定位收起下方和右侧面板*/
    handleClickLocation: function (val) {
      this.$store.commit('chfootExhPutCont', false)
      // setTimeout(() => {
      //   this.$store.commit('chRightBoxTakeUp', false) // 2018-11-21日需求永远不自动收起右侧面板
      // }, 500)
      let str = this.iTabsData[this.iTabsIndex]
      console.log('handleClickLocation=>', val, str)
      if (str === '工单管理') {
        this.$router.push({name: '维保记录BIM', query: {deviceID: 1, dataIndex: this.tabIndex, hint: new Date().valueOf()}})
      } else if (str === '合同管理') {
        this.hLightPipepart() //进行高亮管段操作
        // let id = val.OID
        // let clickNode = {
        //   id: id,
        //   type: 3,
        //   time: new Date()
        // }
        // this.$store.commit('updateGlobalNodeClick', clickNode)
        this.$router.push({name: '合同详情GIS', query: {deviceID: 1, dataIndex: this.tabIndex, hint: new Date().valueOf()}})
        // let demoPipepart = ['pipepart0', 'pipepart1']
        // this.$store.commit('LocateCurrentView', {id: demoPipepart, type: 5})
      } else {
        let id = val.OID
        let clickNode = {
          id: id,
          type: 1,
          time: new Date()
        }
        this.$store.commit('updateGlobalNodeClick', clickNode)
      }
    },
    /*
    * 点击行不收起面板
    * */
    handleClickRow: function (val) {
      let str = this.iTabsData[this.iTabsIndex]
      console.log('handleClickLocation=>', val, str)
      if (str === '工单管理') {
        this.$router.push({name: '维保记录BIM', query: {deviceID: 1, dataIndex: this.tabIndex, hint: new Date().valueOf()}})
      } else if (str === '合同管理') {
        this.hLightPipepart() //进行高亮管段操作
        // let id = val.OID
        // let clickNode = {
        //   id: id,
        //   type: 3,
        //   time: new Date()
        // }
        // this.$store.commit('updateGlobalNodeClick', clickNode)
        this.$router.push({name: '合同详情GIS', query: {deviceID: 1, dataIndex: this.tabIndex, hint: new Date().valueOf()}})
        // let demoPipepart = ['pipepart0', 'pipepart1']
        // this.$store.commit('LocateCurrentView', {id: demoPipepart, type: 5})
      } else {
        let id = val.OID
        let clickNode = {
          id: id,
          type: 1,
          time: new Date()
        }
        this.$store.commit('updateGlobalNodeClick', clickNode)
      }
    },

    /*
    * 获取管段中心
    * */
    getPipepartCenterPos: function (partIdArr) {
      let pipePartDetailData = this.iPipePartDetailData
      let iPipeDetailData = this.iPipeDetailData
      // 统计所有的管井id
      var pipeIds = []
      for (let partId of partIdArr) {
        for (let pipepart of pipePartDetailData) {
          if (partId === pipepart.id) {
            pipeIds = pipeIds.concat(pipepart.PointsPath)
          }
        }
      }
      var posCount = {
        x: 0,
        y: 0
      }
      // 获取所有坐标
      for (let pipeId of pipeIds) {
        for (let pipe of iPipeDetailData) {
          if (pipe.id === pipeId) {
            posCount.x += pipe.X
            posCount.y += pipe.Y
          }
        }
      }
      var pos = {}
      pos.x = posCount.x / pipeIds.length
      pos.y = posCount.y / pipeIds.length
      return pos
    },

    /*
    * 高亮管段
    * */
    hLightPipepart: function (val) {
      val = ['pipepart0', 'pipepart1', 'pipepart2', 'pipepart3', 'pipepart4', 'pipepart5','pipepart6']
      let pos = this.getPipepartCenterPos(val)
      this.$store.commit('LocateCurrentView', {type: 5, id: val, pos: pos})

    },
    close: function () {
      this.chfootExhPutCont(false)
    },
    getListByParam: function (param) {
      //回传的参数
    },
    ...mapMutations([
      'chfootExhPutCont',
      'updateCurrentListTitle'
    ])
  },
  mounted () {
  },
  computed: {
    fieldData: function () {
      let obj = {}
      // let that = this
      filedJson.data.forEach((item) => {
        if (item.title === this.iTabsData[this.iTabsIndex]) {
          obj = item
        }
      })
      return obj
    },
    tableHeads: function () {
      this.preTableData()
      return function (data) {
        for (let item of th.data) {
          if (item.title === data) {
            return item
          }
        }
      }
    },
    ...mapGetters([
      'footExhPutCont',
      'footTitle',
      'iTabsIndex',
      'iTabsData',
      'currentListTitle',
      'iPipePartDetailData',
      'iPipeDetailData'
    ])
  }
}
</script>

<style scoped lang="less">
  .foot {
    min-width: @minWidth - @tfAsideRightWidth - 200;
    border-radius: 3px;
    position: fixed;
    z-index: 3;
    bottom: 0;
    height: auto;
    width: calc(100% - 323px);
    height: calc(100% - 120px);
    background: rgba(25, 52, 82, .99);
    .pagination {
      padding: 25px 40px;
      text-align: right;
    }
    margin: 0 auto;
    .foot-title {
      color: #fff;
      margin-left: 20px;
      font-size: 18px;
      padding: 10px 0;
    }
    .close {
      color: #347bb5;
      position: absolute;
      right: 20px;
      font-size: 14px;
      top: 15px;
      cursor: pointer;
    }
    /deep/ .el-input__inner {
      background-color: #001E40;
    }

    /deep/ .el-pager li.active {
      padding: 2px 4px;
      border-radius: 3px;
      background-color: #409EFF;
      color: rgba(255, 255, 255, .85);
      line-height: 24px;
    }
    /deep/ .el-tabs__item {
      color: rgba(255, 255, 255, .85);
    }
    /deep/ .el-tabs__nav-wrap::after {
      background-color: rgba(0, 0, 0, .25);
      left: 48px;
    }
    /deep/ .el-tabs__nav-scroll {
      padding-left: 48px;
    }
    /deep/ .el-input__inner, /deep/ .el-pager li, /deep/ .el-pagination .btn-next, /deep/ .el-pagination .btn-prev, /deep/ .el-pagination button:disabled, /deep/ .el-pagination__jump {
      color: rgba(255, 255, 255, .85);
      background-color: rgba(0, 0, 0, 0);
      border-color: rgba(255, 255, 255, .2);
    }
  }
</style>
