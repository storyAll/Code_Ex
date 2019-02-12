<template>
  <div class="work-order-list-stic">
    <nav-button-group></nav-button-group>
    <right-box>
      <div class="data-statistics-head">
        <widget-tabs :controllers="titTabTxt" :tabsWidth="titTabTxtwidth"
                     :btnGroupNormalColor="'#263F5B'"></widget-tabs>
        <!--<i class="el-icon-d-arrow-right" @click="closeRightBox"></i>-->
      </div>
      <title-des-item v-if="titTabTxtActive==='数据统计'"  :tdiData="tdiData"></title-des-item>
      <CommonChart
        :chartOption="chartOption"
      >
        <widget-tabs :controllers="['本月','本年']"
                     :btnGroupType="3"
                     :btnGroupNormalColor="'#1F3B5B'"
                     style="border-radius: 5px;overflow: hidden;border:1px solid rgba(255,255,255,0.2);margin-right: 5px"
                     @handelClick="putChartData"></widget-tabs>
      </CommonChart>
      <CommonChart
        :chartOption="chartOption2"
      >
        <widget-tabs :controllers="['本月','本年']"
                     :btnGroupType="3"
                     :btnGroupNormalColor="'#1F3B5B'"
                     style="border-radius: 5px;overflow: hidden;border:1px solid rgba(255,255,255,0.2);margin-right: 5px"
                     @handelClick="putChart2Data"></widget-tabs>
      </CommonChart>
    </right-box>
  </div>
</template>

<script>

import NavButtonGroup from '@/components/tf-banner/NavButtonGroup.vue' //左上工具栏

import TitleDesItem from '@/components/tf-public/TitleDesItem.vue'
import RightBox from '@/components/tf-right-detail/RightBox.vue'
import CommonChart from '@/components/tf-public/tf-charts/CommonChart.vue'
import WidgetTabs from '@/components/tf-public/WidgetTabs'
import { mapMutations, mapState } from 'vuex'

import dataJson from '@/api/workOrderListStic.json'

export default {
  name: 'WorkOrderListStic',
  data () {
    return {
      tdiData: [],
      chartOption: {},
      circularChartOption: {},
      chartOption2: {},
      chartOptionMonth: {},
      chartOptionYear: {},
      chartOption2Month: [],
      chartOption2Year: [],
      optionValue2Name: {
        '0': '处理中',
        '1': '待处理',
        '2': '已完成',
        '3': '已超时'
      }
    }
  },
  created () {
    this.$post('/workOrderManagementHomePage').then((data) => {
      this.initDatas(data)
    }).catch(() => {
      this.initDatas(dataJson)
    })
  },
  computed: {
    ...mapState({
      titTabTxt: state => state.workOrderData.titTabTxt,
      titTabTxtActive: state => state.workOrderData.titTabTxtActive,
      titTabTxtwidth: state => state.workOrderData.titTabTxtwidth
    })
  },
  methods: {
    initDatas (data) {
      let tdiData = []
      tdiData = [
        {
          tit: '今日维保工单数',
          des: '32',
          cy: '个'
        },
        {
          tit: '已完成',
          des: '20',
          cy: '个'
        },
        {
          tit: '待接单',
          des: '2',
          cy: '个'
        },
        {
          tit: '待执行',
          des: '9',
          cy: '个'
        },
        {
          tit: '已超时',
          des: '2',
          cy: '个'
        }
      ]
      tdiData[0].des = data.maintenanceSingular
      tdiData[1].des = data.processing
      tdiData[2].des = data.processed
      if (data.repairOrderStatistics && data.repairOrderStatistics.bymonth) {
        let x = []
        let d = []
        data.repairOrderStatistics.bymonth.forEach((v, i) => {
          x.push(v.time)
          d.push(v.count)
        })
        this.chartOptionMonth = {
          x,
          d
        }
        this.putChartData(0)
      }
      if (data.repairOrderStatistics && data.repairOrderStatistics.byYear) {
        let x = []
        let d = []
        data.repairOrderStatistics.byYear.forEach((v, i) => {
          x.push(v.time)
          d.push(v.count)
        })
        this.chartOptionYear = {
          x,
          d
        }
      }
      if (data.buildingControlSystem && data.buildingControlSystem.bymonth) {
        let d = []
        data.buildingControlSystem.bymonth.forEach((v, i) => {
          d.push({
            name: this.optionValue2Name[v.stateType],
            value: ~~v.typePercent
          })
        })
        this.chartOption2Month = d
        this.putChart2Data(0)
      }
      if (data.buildingControlSystem && data.buildingControlSystem.byYear) {
        let d = []
        data.buildingControlSystem.byYear.forEach((v, i) => {
          d.push({
            name: this.optionValue2Name[v.stateType],
            value: ~~v.typePercent
          })
        })
        this.chartOption2Year = d
      }
      this.tdiData = tdiData
    },
    putChartData (e) {
      let getChartOpt2 = this.getChartOption1()
      if (e === 0) {
        getChartOpt2.xAxis.data = this.chartOptionMonth.x
        getChartOpt2.series[0].data = this.chartOptionMonth.d
      } else {
        getChartOpt2.xAxis.data = this.chartOptionYear.x
        getChartOpt2.series[0].data = this.chartOptionYear.d
      }
      this.chartOption = getChartOpt2
    },
    putChart2Data (e) {
      let getChartOpt = this.getChartOption2()
      if (e === 0) {
        getChartOpt.series[0].data = this.chartOption2Month
      } else {
        getChartOpt.series[0].data = this.chartOption2Year
      }
      this.chartOption2 = getChartOpt
    },
    closeRightBox () {
      this.chRightBoxTakeUp(false)
    },
    getChartOption2 () {
      return {
        title: [
          {
            show: true,
            text: '维修工单状态统计',
            top: '3%',
            left: '3%',
            textStyle: {
              color: '#fff',
              fontStyle: 'normal',
              fontWeight: '500',
              fontFamily: 'PingFangSC-Medium',
              fontSize: 14
            }
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          icon: 'circle',
          orient: 'vertical',
          x: 160,
          y: 40,
          itemWidth: 5,
          itemHeight: 5,
          textStyle: {
            color: '#fff',
            fontSize: 14,
            fontFamily: 'pingfang',
            padding: [0, -30, 0, 0]
          }
        },
        series: [
          {
            hoverOffset: 5,
            name: '空间状态',
            type: 'pie',
            center: ['20%', '50%'],
            radius: [28, 50],
            label: {
              fontSize: 16,
              normal: {
                show: false
              }
            },
            data: [
              {
                name: '处理中',
                value: 21
              },
              {
                name: '已完成',
                value: 16
              },
              {
                name: '待处理',
                value: 36
              },
              {
                name: '已超时',
                value: 3
              }
            ],
            labelLine: {
              normal: {
                show: false
              }
            }
          }
        ]
      }
    },
    getChartOption1 () {
      return {
        title: [
          {
            show: true,
            text: '工单统计',
            top: '3%',
            left: '3%',
            textStyle: {
              color: '#fff',
              fontStyle: 'normal',
              fontWeight: '500',
              fontFamily: 'PingFangSC-Medium',
              fontSize: 14
            }
          }
        ],
        height: '45%',
        width: '80%',
        tooltip: {},
        xAxis: {
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: true
          },
          data: ['第一周', '第二周', '第三周', '第四周']
        },
        yAxis: {
          axisLabel: {
            show: true,

            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          },
          type: 'value',
          splitNumber: 4,
          min: function (value) {
            return value.min - 20
          },
          max: function (value) {
            return value.max + 20
          }
        },
        series: [{
          name: '正常',
          type: 'bar',
          barWidth: 8,
          itemStyle: {
            color: '#268BFF'
          },
          data: [240, 310, 390, 200]
        }
        ]
      }
    },
    ...mapMutations(['chRightBoxTakeUp'])
  },
  components: {
    RightBox,
    CommonChart,
    WidgetTabs,
    TitleDesItem,
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
    .el-icon-d-arrow-right {
      cursor: pointer;
    }
  }
</style>
