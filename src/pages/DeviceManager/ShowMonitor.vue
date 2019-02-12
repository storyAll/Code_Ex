<!--设备管理监控面板  **王震-->
<template>
  <div class="device-list">
    <right-box>
      <div class="data-statistics-head">
        <widget-tabs class="widget-tabs" :controllers="['数据统计']" :tabsWidth="55" :tabsBgColor="tabsBgColor"></widget-tabs>
        <!--<i class="el-icon-d-arrow-right" @click="closeRightBox"></i>-->
      </div>
      <!--监控信息-->
      <title-des-item :tdiData="tdiData"></title-des-item>
      <!--天与月状态切换-->
      <el-button type="primary" size="mini" class="btnState" @click="changeBtnState">{{ btnState==='day'? '按月': '按日'}}</el-button>
      <line-chart :chartOption="chartOption" :btnState="btnState" style="padding-left: 20px" >
      </line-chart>
    </right-box>
  </div>
</template>

<script>
import NavButtonGroup from '@/components/tf-banner/NavButtonGroup.vue' //左上工具栏
import TitleDesItem from '@/components/tf-public/TitleDesItem.vue'
import RightBox from '@/components/tf-right-detail/RightBox.vue'
import LineChart from '@/components/tf-public/tf-charts/LineChart.vue'
import WidgetTabs from '@/components/tf-public/WidgetTabs'
import {mapMutations} from 'vuex'
export default {
  name: 'ShowMonitor',
  data () {
    return {
      tabsBgColor: 'none',
      btnState: 'day',
      tdiData: [],
      chartOption: {
        LineChartObj1: {
          monthData: [
            {time: '第一周', count: '120'},
            {time: '第二周', count: '87'},
            {time: '第三周', count: '74'},
            {time: '第四周', count: '65'}
          ],
          dayData: [
            {time: '6:00', count: '62'},
            {time: '8:00', count: '36'},
            {time: '12:00', count: '82'},
            {time: '14:00', count: '62'},
            {time: '16:00', count: '28'},
            {time: '18:00', count: '55'}
          ]
        },
        LineChartObj2: {
          monthData: [
            {time: '第一周', count: '126'},
            {time: '第二周', count: '84'},
            {time: '第三周', count: '44'},
            {time: '第四周', count: '22'}
          ],
          dayData: [
            {time: '6:00', count: '20'},
            {time: '8:00', count: '65'},
            {time: '12:00', count: '85'},
            {time: '14:00', count: '62'},
            {time: '16:00', count: '21'},
            {time: '18:00', count: '44'}
          ]
        }
      }
    }
  },
  created(){
    let tdiData = []
    tdiData = [
      {
        tit: '厂房总数',
        des: '41',
        cy: '个'
      },
      {
        tit: '通信管网长度',
        des: '80',
        cy: '公里'
      },
      {
        tit: '管孔总数',
        des: '6220',
        cy: '个'
      },
      {
        tit: '检查井总数',
        des: '1220',
        cy: '个'
      },
      {
        tit: '设备总数',
        des: '12356',
        cy: '个'
      },
      {
        tit: '故障设备',
        des: '12',
        cy: '个'
      },
      {
        tit: '本月新增管路',
        des: '600',
        cy: 'm'
      },
      {
        tit: '本月新增设备',
        des: '60',
        cy: '个'
      }
    ]
    this.tdiData = tdiData
    this.getMeterData()//获取数据
  },
  methods: {
    //右侧面板关闭
    closeRightBox () {
      this.chRightBoxTakeUp(false)
    },
    //切换时间状态
    changeBtnState(){
      if (this.btnState === 'day'){
        this.btnState = 'month'
      } else {
        this.btnState = 'day'
      }
    },
    //获取数据
    getMeterData(){
      this.$post('/deviceTree').then((res)=>{
        this.tdiData[0].des = res.totalFactory
        this.tdiData[1].des = res.communicationLength
        this.tdiData[2].des = res.noTubeHole
        this.tdiData[3].des = res.totalWells
        this.tdiData[4].des = res.totaldevices
        this.tdiData[5].des = res.faultEquipment
        this.tdiData[6].des = res.monthNewLine
        this.tdiData[7].des = res.monthNewEquipment
        this.chartOption.LineChartObj1 = res.equipmentFailureRate
        this.chartOption.LineChartObj2 = res.pipelineFailureRate
      })
    },
    ...mapMutations(['chRightBoxTakeUp'])
  },
  components: {
    RightBox,
    TitleDesItem,
    LineChart,
    WidgetTabs,
    NavButtonGroup
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
    .widget-tabs {
      border-bottom: 2px solid #268bff;
    }
  }
  .el-icon-d-arrow-right {
    color: #fff;
    cursor: pointer;
  }
  /deep/.widget-tabs.tabs-btn {
    background: none;
  }
  .btnState {
    position: absolute;
    right: 5%;
    z-index: 10;
  }
  /deep/.el-button{
    background-color: rgba(0,0,0,0);
    color: rgba(255,255,255,.85);
    /*position: absolute;*/
    position: relative;
    right: -80%;
    top: 26px;
    padding: 5px 10px;
    border-color: rgba(24, 144, 255, 1);
    color: rgba(24, 144, 255, 1);
  }
</style>
