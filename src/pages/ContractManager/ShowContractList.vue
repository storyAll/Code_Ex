<!--查看合同列表-->
<template>
  <div class="maintenance-bim-wrapper">
    <!--<nav-button-group></nav-button-group>-->
    <right-box>
      <div class="data-statistics-head">
        <widget-tabs :controllers="controllerTit" :tabsWidth="80" :btnGroupNormalColor="'RGB(29,57,88)'"></widget-tabs>
        <span>{{maintenanceState}}</span>
      </div>
      <div class="pic-desc-btn">
        <div class="btn">
          <name-deses-list :dataList="dataList"></name-deses-list>
          <widget-tabs
            style="border-radius: 5px;overflow: hidden;margin: 0 auto;"
            :controllers="[iViewModeIndex === 0 ?'查看GIS' : '查看BIM']"
            :btnGroupType="1"
            :tabsWidth="240"
            :btnGroupNormalColor="'RGB(22,155,213)'"
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
import { mapMutations, mapGetters } from 'vuex'

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
    this.initDataList(1)
  },
  computed: {
    ...mapGetters(['iViewModeIndex'])
  },
  methods: {
    //隐藏右侧面板
    closeRightBox () {
      this.chRightBoxTakeUp(false)
    },
    initDataList (e) {
      let dataList = []
      if (e === 1) {
        dataList = this.getDataList1()
        this.controllerTit = ['维保信息']
      } else if (e === 2) {
        dataList = this.getDataList2()
        this.controllerTit = ['任务详情']
        this.maintenanceState = ''
      }
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
