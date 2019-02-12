<!--数据统计面板-->
<template>
  <div class="contract-list-stic">
    <!--<nav-button-group></nav-button-group>-->
    <right-box>
      <div class="data-statistics-head">
        <widget-tabs :controllers="['数据统计']" :tabsWidth="70"
                     :btnGroupNormalColor="'RGB(29,57,88)'"></widget-tabs>
        <!--<i class="el-icon-d-arrow-right" @click="closeRightBox"></i>-->
      </div>
      <!--列表1 厂房信息-->
      <title-des-item :tdiData="tdiData"></title-des-item>
      <!--列表2 管网信息-->
      <title-des-item :tdiData="tdiData2"></title-des-item>
      <!--图表一 空间状态统计-->
      <CommonChart
        :chartOption="chartOption"
        :rightTabsShow="false"
        style="padding-left: 8px"
      ></CommonChart>
      <!--图表二 回款统计-->
      <CommonChart
        :chartOption="chartOption2"
        style="padding-left: 20px"
      >
        <!--年份切换按钮-->
        <widget-tabs :controllers="['本年','近5年']"
                     :btnGroupType="3"
                     :btnGroupNormalColor="'#1F3B5B'"
                     style="border-radius: 5px;overflow: hidden;border:1px solid rgba(255,255,255,0.2);margin-right: 10px"
                     ></widget-tabs>
      </CommonChart>
    </right-box>
  </div>
</template>

<script>
import NavButtonGroup from '@/components/tf-banner/NavButtonGroup.vue' //左上工具栏
import TitleDesItem from '@/components/tf-public/TitleDesItem.vue'//列表信息组件
import RightBox from '@/components/tf-right-detail/RightBox.vue'//面板组件
import CommonChart from '@/components/tf-public/tf-charts/CommonChart.vue'//图表组件
import WidgetTabs from '@/components/tf-public/WidgetTabs'//年份切换按钮
import { mapMutations } from 'vuex'//状态管理工具

export default {
  name: 'ContractListStic',
  data () {
    return {
      tdiData: [],
      tdiData2: [],
      chartOption: {},
      chartOption2: {}
    }
  },
  created () {
    this.$post('/contractManagementHomePage').then((data) => {
      this.initDatas(data)
    })
  },
  methods: {
    initDatas (data) {
      let tdiData = []
      let tdiData2 = []
      tdiData = [
        {
          tit: '厂房总数',
          des: '41',
          cy: '个'
        },
        {
          tit: '已租厂房',
          des: '20',
          cy: '个'
        },
        {
          tit: '厂房合同总额',
          des: '1220',
          cy: '万元'
        },
        {
          tit: '已收总额',
          des: '220',
          cy: '万元'
        },
        {
          tit: '待收总额',
          des: '1000',
          cy: '万元'
        }
      ]
      tdiData2 = [
        {
          tit: '管网总长',
          des: '800',
          cy: '公里'
        },
        {
          tit: '已租管网长',
          des: '401',
          cy: '公里'
        },
        {
          tit: '管网合同总额',
          des: '1220',
          cy: '万元'
        },
        {
          tit: '已收总额',
          des: '220',
          cy: '万元'
        },
        {
          tit: '待收总额',
          des: '1000',
          cy: '万元'
        }
      ]
      let getChartOpt = this.getChartOption1()
      let getChartOpt2 = this.getChartOption2()
      tdiData[0].des = data.factoryNumber
      tdiData[1].des = data.rentWorkshop
      tdiData[2].des = data.contractAmount
      tdiData[3].des = data.receivedAmount
      tdiData[4].des = data.collectedAmount

      tdiData2[0].des = data.networkLong
      tdiData2[1].des = data.rentNetworkLong
      tdiData2[2].des = data.networkContract
      tdiData2[3].des = data.receivedAmountNet
      tdiData2[4].des = data.collectedAmountNet

      this.tdiData = tdiData
      this.tdiData2 = tdiData2
      this.chartOption = getChartOpt
      this.chartOption2 = getChartOpt2
    },
    //隐藏右侧面板
    closeRightBox () {
      this.chRightBoxTakeUp(false)
    },
    getChartOption1 () {
      let data = [
        {
          name: '使用率20%-80%',
          value: 21
        },
        {
          name: '使用率80%',
          value: 16
        },
        {
          name: '使用率＜20%',
          value: 36
        },
        {
          name: '使用率＜20%',
          value: 10
        }
      ]
      return {
        title: [
          {
            show: true,
            text: '空间状态统计',
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
            center: ['25%', '50%'],
            radius: [22, 42],
            label: {
              fontSize: 16,
              normal: {
                show: false
              }
            },
            data: data,
            labelLine: {
              normal: {
                show: false
              }
            }
          }
        ]
      }
    },
    getChartOption2 () {
      let data1 = ['第一周', '第二周', '第三周', '第四周']
      let data2 = [240, 310, 390, 200]
      return {
        title: [
          {
            show: true,
            text: '回款统计',
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
          data: data1
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
          min: 0,
          max: 400
        },
        series: [{
          name: '正常',
          type: 'bar',
          barWidth: 8,
          itemStyle: {
            color: '#268BFF'
          },
          data: data2
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

  .el-icon-d-arrow-right {
    color: #fff;
  }
</style>
