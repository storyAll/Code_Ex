<!--折线统计图 ****王震-->
<template>
  <div id="chart-wrapper" class="chart-wrapper" ref="chartWrapper">
    <div ref="chartContent" class="chart-content" width="300" height="200"></div>
  </div>
</template>

<script>
export default {
  name: 'LineChart',
  data() {
    return {
      container: {},
      equipment: [],//设备数据初始化
      network: [],//管网数据初始化
      min: 6,//横坐标最小值
      max: 18,//横坐标最大值
      splitNumber: 7//横坐标分割数量
    }
  },
  props: {
    chartOption: {
      type: Object,
      required: true,
      default: function () {
        return {
        }
      }
    },
    btnState: {
      type: String,
      required: true,
      default: function () {
        return 'day'
      }
    }
  },
  created() {
    //this.drawChart()
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      let equipment = []
      let network = []
      if (!this.chartOption.LineChartObj1) return false
      //console.log(this.btnState)
      //根据按日or按月判断
      if (this.btnState === 'day') {
        for (var i = 0; i < this.chartOption.LineChartObj1.dayData.length; i++) {
          var obj1 = this.chartOption.LineChartObj1.dayData[i].time
          var obj2 = obj1.substring(0, obj1.length - 3)
          var arr = [
            obj2,
            this.chartOption.LineChartObj1.dayData[i].count
          ]
          equipment.push(arr)
        }
        for (var k = 0; k < this.chartOption.LineChartObj2.dayData.length; k++) {
          var obj3 = this.chartOption.LineChartObj2.dayData[k].time
          var obj4 = obj3.substring(0, obj3.length - 3)
          var arr2 = [
            obj4,
            this.chartOption.LineChartObj2.dayData[k].count
          ]
          network.push(arr2)
        }
        this.min = 6
        this.max = 18
        this.splitNumber = 7
      } else if (this.btnState === 'month') {
        for (let i = 0; i < this.chartOption.LineChartObj1.monthData.length; i++) {
          let eobj = this.chartOption.LineChartObj1.monthData[i].time
          let eobj1 = eobj.substring(1, 2)
          let eobj2 = ''
          switch (eobj1) {
            case '一':
              eobj2 = 1
              break
            case '二':
              eobj2 = 2
              break
            case '三':
              eobj2 = 3
              break
            case '四':
              eobj2 = 4
              break
          }
          let arr = [
            eobj2,
            this.chartOption.LineChartObj1.monthData[i].count
          ]
          equipment.push(arr)
        }
        for (let i = 0; i < this.chartOption.LineChartObj2.monthData.length; i++) {
          let nobj = this.chartOption.LineChartObj2.monthData[i].time
          let nobj1 = nobj.substring(1, 2)
          let nobj2 = ''
          switch (nobj1) {
            case '一':
              nobj2 = 1
              break
            case '二':
              nobj2 = 2
              break
            case '三':
              nobj2 = 3
              break
            case '四':
              nobj2 = 4
              break
          }
          let arr = [
            nobj2,
            this.chartOption.LineChartObj2.monthData[i].count
          ]
          network.push(arr)
        }
        this.min = 1
        this.max = 4
        this.splitNumber = 4
      }
      this.equipment = equipment//填充设备数据
      this.network = network//填充管网数据
      let options = {
        title: {
          text: '故障率统计',
          show: true,
          top: '3%',
          left: '3%',
          textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: '500',
            fontFamily: 'PingFangSC-Medium',
            fontSize: 14
          }
        },
        height: '60%',
        width: '80%',
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: '3%',
          textStyle: {
            color: '#fff'
          },
          data: ['设备', '管网']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
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
          splitNumber: this.splitNumber,
          min: this.min,
          max: this.max
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
          min: 0
        },
        series: [
          {
            name: '设备',
            type: 'line',
            itemStyle: {
              color: '#268BFF'
            },
            data: this.equipment
          },
          {
            name: '管网',
            type: 'line',
            itemStyle: {
              color: '#08f86d'
            },
            data: this.network
          }
        ]
      }
      var dom = this.$refs['chartContent']
      this.container = this.charts.init(dom)
      this.container.setOption(options)
    }
  },
  watch: {
    chartOption: {
      handler: function(val){
        //console.log(1)
        this.drawChart()
      },
      deep: true
    },
    btnState(){
      this.drawChart()
    }
  }
}
</script>

<style scoped lang="less">
  @import "./tf-charts-common";

  .chart-wrapper {
    position: relative;
    .chart-content {
      width: @tfAsideRightWidth;
      height: @chartsHeight;
      color: white;
    }
    .controller {
      position: absolute;
      right: 0;
      top: 0;
      height: 30px;
      width: @tfAsideRightWidth - 150;
      overflow: hidden;
      background-color: #425E7D;
    }
  }
</style>
