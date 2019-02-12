<template>
  <div class="device-list">
    <!--<nav-button-group></nav-button-group>-->
    <right-box>
      <!--<test>  </test>-->
      <div class="data-statistics-head">
        <widget-tabs class="widget-tabs" :controllers="['数据统计']" :tabsWidth="70"
                     :btnGroupNormalColor="this.commonBg"
        ></widget-tabs>
        <!--<i class="el-icon-d-arrow-right" @click="closeRightBox"></i>-->
      </div>
      <title-des-item :tdiData="tdiData" tdiDataClass="sma8"></title-des-item>
      <common-chart :chartOption="chartOption"
                    :rightTabsShow="false"
                    style="padding-left: 20px;padding-top: 20px">
        <el-button size="mini" @click="handleClick">
          {{chartBtnTxt ? '按月' : '按日'}}
        </el-button>
      </common-chart>
    </right-box>
  </div>
</template>

<script>
import TitleDesItem from '@/components/tf-public/TitleDesItem.vue'
import NavButtonGroup from '@/components/tf-banner/NavButtonGroup.vue'
import RightBox from '@/components/tf-right-detail/RightBox.vue'
import CommonChart from '@/components/tf-public/tf-charts/CommonChart.vue'
import WidgetTabs from '@/components/tf-public/WidgetTabs'
import {mapMutations} from 'vuex'

export default {
  name: 'DeviceList',
  data() {
    return {
      tdiData: [],
      chartBtnTxt: true,
      chartOption: {}
    }
  },
  created() {
    this.$post('/deviceTree').then((data) => {
      this.initDatas(data)
    })
  },
  methods: {
    initDatas(data) {
      let tdiData = []
      let chartOption = {}
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
        }
        //        ,
        //        {
        //          tit: '本月新增管路',
        //          des: '600',
        //          cy: 'm'
        //        },
        //        {
        //          tit: '本月新增设备',
        //          des: '60',
        //          cy: '个'
        //        }
      ]
      chartOption = this.getChartOption()
      tdiData[0].des = data.totalFactory
      tdiData[1].des = data.communicationLength
      tdiData[2].des = data.noTubeHole
      tdiData[3].des = data.totalWells
      tdiData[4].des = data.totaldevices
      tdiData[5].des = data.faultEquipment
      //      tdiData[6].des = data.monthNewLine
      //      tdiData[7].des = data.monthNewEquipment
      this.tdiData = tdiData
      //      chartOption.xAxis.data=data.equipmentFailureRate
      this.chartOption = chartOption
    },
    closeRightBox() {
      this.chRightBoxTakeUp(false)
    },
    handleClick: function () {
      this.chartBtnTxt = !this.chartBtnTxt
    },
    getChartOption() {
      return {
        height: '60%',
        title: {
          text: '故障率统计',
          textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: 14
          }
        },
        legend: {
          borderWidth: 0,
          icon: 'circle',
          pageIconSize: 30,
          x: 120,
          y: '0px',
          data: ['设备', '管网'],
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: 14
          }
        },
        grid: {
          top: '50px' // 距上边距
        },
        tooltip: {
          // trigger: 'axis'
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            axisTick: {show: false},
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            minInterval: 10,
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
            }
          }
        ],
        series: [
          {
            name: '设备',
            type: 'line',
            stack: '总量',
            barWidth: 4,
            data: [10, 20, 30, 400],
            itemStyle: {
              normal: {
                color: '#72B4FF'
              }
            }
          },
          {
            name: '管网',
            type: 'line',
            stack: '总量',
            barWidth: 4,
            data: [0, 20, 50, 100],
            itemStyle: {
              normal: {
                color: '#FF9500'
              }
            }
          }

        ]
      }
    },
    ...mapMutations(['chRightBoxTakeUp'])
  },
  components: {
    RightBox,
    TitleDesItem,
    CommonChart,
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
    .el-icon-d-arrow-right {
      cursor: pointer;
    }
  }

  /deep/ .el-button {
    background-color: rgba(0, 0, 0, 0);
    color: rgba(255, 255, 255, .85);
    position: absolute;
    right: 8px;
    top: 20px;
    padding: 5px 10px;
    border-color: rgba(24, 144, 255, 1);
    color: rgba(24, 144, 255, 1);
  }
</style>
