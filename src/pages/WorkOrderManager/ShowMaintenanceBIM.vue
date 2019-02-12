<!--维保记录BIM-->
<template>
  <div class="maintenance-bim-wrapper">
    <!--<nav-button-group></nav-button-group>-->
    <right-box>
      <div class="data-statistics-head">
        <span style="cursor: pointer" class="callback" @click="callback">返回</span>
        <widget-tabs :controllers="controllerTit" :tabsWidth="80" :btnGroupNormalColor="'RGB(29,57,88)'"></widget-tabs>
        <span>{{maintenanceState}}</span>
      </div>
      <div class="pic-desc-btn">
        <div class="btn">
          <name-deses-list :dataList="dataList"></name-deses-list>
          <widget-tabs
            style="border-radius: 5px;overflow: hidden;margin: 0 auto;"
            :controllers="[iViewModeIndex === 0 ?'查看GIS' : '查看BIM']"
            :btnGroupType="2"
            :tabsWidth="240"
            :btnGroupNormalColor="'#1890FF'"
            @handelClick="changeGISBIM"
          ></widget-tabs>
        </div>
      </div>
    </right-box>
  </div>
</template>

<script>
import NavButtonGroup from '@/components/tf-banner/NavButtonGroup.vue' //左上工具栏
import RightBox from '@/components/tf-right-detail/RightBox.vue'//面板组件
import SectionTable from '@/components/tf-public/SectionTable.vue'
import TitleDesItem from '@/components/tf-public/TitleDesItem.vue'//列表信息组件
import InfoList from '@/components/tf-public/InfoList.vue'
import WidgetTabs from '@/components/tf-public/WidgetTabs'
import NameDesesList from '@/components/tf-public/NameDesesList.vue'
//状态管理工具
import {mapMutations, mapGetters} from 'vuex'

export default {
  name: 'ShowMaintenanceBIM',
  data () {
    return {
      dataList: [],
      controllerTit: ['维保信息'],
      maintenanceState: '已完成'
    }
  },
  created () {
    /**
     * 1 : 维保 2: 计划
     */
    this.initDataList(this.dataIndex)
    // this.$store.commit('updateILeftTabsData', ['设备'])
    // this.$store.commit('updateILeftTabsIndex', 0)
  },
  props: {
    dataIndex: {
      type: Number,
      default: function () {
        return 1
      }
    }
  },
  watch: {
    dataIndex (val) {
    },
    '$route' (to, from) {
      let dataIndex = to.query.dataIndex
      this.initDataList(dataIndex + 1)
    }
  },
  beforeDestroy () {
    // this.$store.commit('updateILeftTabsData', ['设备', '管网'])
    // this.$store.commit('updateILeftTabsIndex', 0)
  },
  computed: {
    ...mapGetters(['iViewModeIndex'])
  },
  methods: {
    callback () {
      this.$router.push({name: '维保记录列表'})
    },
    //隐藏右侧面板
    closeRightBox () {
      this.chRightBoxTakeUp(false)
    },
    initDataList (e) {
      if (e === 1) {
        this.$post('/equipmentMaintenanceInformationData').then((data) => {
          console.log('data=>', data)
          this.initMaintenanceData(data)
        })
      } else if (e === 2) {
        this.$post('planningTaskDetails').then((data) => {
          this.initPlanningDatas(data)
        })
      }
    },
    initMaintenanceData (data) {
      data = {
        deviceName: '取水泵',
        repairOrderName: '维修订单',
        workOrderType: '正常工单',
        workOrderStatus: '进行中',
        startTime: '2018-01-12',
        endTime: '2018-01-18',
        workOrderDescription: '正常维修'
      }
      let dataList = []
      dataList = this.getDataList1()
      dataList[0].des = data.deviceName
      dataList[1].des = data.repairOrderName
      dataList[2].des = data.workOrderType
      dataList[3].des = data.workOrderStatus
      dataList[4].des = data.startTime
      dataList[5].des = data.endTime
      dataList[6].des = data.workOrderDescription
      //          dataList[7].des = data.pictureAddress
      this.dataList = dataList
      this.maintenanceState = data.workOrderStatus
      this.controllerTit = ['维保信息']
    },
    initPlanningDatas (data) {
      console.log('initPlanningDatas=>')
      let dataList = []
      dataList = this.getDataList2()
      dataList[0].des = data.planName
      dataList[1].des = data.projectName
      dataList[2].des = data.headMan
      dataList[3].des = data.frequency + '/日'
      dataList[4].des = data.startTime
      dataList[5].des = data.endTime
      dataList[6].des = (() => {
        let d = ''
        data.taskSteps.forEach(function (v, i) {
          d += `${i + 1}.${v}<br>`
        })
        return d
      })()
      this.controllerTit = ['任务详情']
      this.maintenanceState = ''
      this.dataList = dataList
    },
    getDataList1 () {
      return [
        {
          name: '设备名称',
          des: '1号电梯'
        },
        {
          name: '工单名称',
          des: '牵引机油杯液位检查'
        },
        {
          name: '工单类型',
          des: '报事报修'
        },
        {
          name: '工单状态',
          des: '已完成'
        },
        {
          name: '开始时间',
          des: '2018-08-20 9:00'
        },
        {
          name: '结束时间',
          des: '2018-08-20 11:00'
        },
        {
          name: '工单描述',
          des: '牵引机油杯液位正常，但距离警戒值较近，添加50ml润滑油'
        },
        {
          name: '现场图片',
          des: `<img src="${require('../../assets/images/common/206.png')}" alt="" style="width: 50px;height: 46px;">
          <img src="${require('../../assets/images/common/206.png')}" alt="" style="width: 50px;height: 46px;">
          <img src="${require('../../assets/images/common/206.png')}" alt="" style="width: 50px;height: 46px;">
          <img src="${require('../../assets/images/common/206.png')}" alt="" style="width: 50px;height: 46px;">`
        }
      ]
    },
    getDataList2 () {
      return [
        {
          name: '计划名称',
          des: '发电机检查'
        }, {
          name: '项目名称',
          des: '1号厂房'
        }, {
          name: '负责人',
          des: '小明'
        }, {
          name: '频次',
          des: '1/日'
        }, {
          name: '开始时间',
          des: '2018-08-20 9:00'
        }, {
          name: '结束时间',
          des: '2018-08-20 11:00'
        }, {
          name: '任务步骤',
          des: `1.检查发电机油位<br>2.检查发电机运行状态<br>3.拍摄现场图片`
        }
      ]
    },
    changeGISBIM () {
      this.$store.commit('updateIViewModeIndex', 1 - this.iViewModeIndex)
      console.log('iViewModeIndex=>', this.iViewModeIndex)
      this.$store.commit('updateIDeviceIndex', 9)

      let clickNode = {
        id: '7436527',
        type: 1,
        time: new Date()
      }
      this.$store.commit('updateGlobalNodeClick', clickNode)
      // setTimeout(() => {
      //   let clickNode = {
      //     id: '7436527',
      //     type: 1,
      //     time: new Date()
      //   }
      //   this.$store.commit('updateGlobalNodeClick', clickNode)
      // }, 50)

    },
    ...mapMutations(['chRightBoxTakeUp'])
  },
  components: {
    InfoList,
    NameDesesList,
    SectionTable,
    RightBox,
    TitleDesItem,
    NavButtonGroup,
    WidgetTabs
  }
}
</script>

<style lang="less" scoped>
  .data-statistics-head {
    color: white;
    display: flex;
    padding: 10px 16px 0 20px;
    justify-content: space-between;
    align-items: center;
    .el-icon-d-arrow-right {
      cursor: pointer;
    }
  }
</style>
