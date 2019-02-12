<template>
  <div id="chart-wrapper" class="chart-wrapper" ref="chartWrapper">
    <div  ref="chartContent" class="chart-content"></div>
  </div>
</template>

<script>
export default {
  name: 'ScatterPoint',
  data () {
    return {
      container: {},
      AxisX: [1, 2, 3, 4, 5, 6],
      AxisY: [1, 2, 3, 4, 5, 6],
      // ScatterColor: ['#3BCD64','#FFCC00','#F66060'],
      option: {
        // width: '20%',
        // height: '20%',
        // title: {},
        // legend: {},
        //tooltip: {},
        polar: {},
        angleAxis: {
          show: false,
          type: 'category',
          boundaryGap: false,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#999',
              type: 'dashed'
            }
          },
          axisLine: {
            show: false
          }
        },
        radiusAxis: {
          show: false,
          type: 'category',
          data: this.AxisY,
          axisLine: {
            show: false
          },
          axisLabel: {
            rotate: 45
          }
        },
        series: [{
          name: '',
          type: 'scatter',
          coordinateSystem: 'polar',
          hoverAnimation: false,
          itemStyle: {
            normal: {
              color: function (idx) {
                return idx.value[3]
              }
            }
          },
          symbolSize: function (val) {
            return val[2] * 0.15
          },
          data: [[6, 1, 90,'#3BCD64'], [6, 2, 90,'#FFCC00'], [6, 3, 90,'#3BCD64'], [6, 4, 90,'#F66060'], [6, 5, 90,'#FFCC00'], [6, 6, 90,'#F66060']],
          animationDelay: function (idx) {
            return idx * 1
          }
        }]
      }
    }
  },
  created () {

  },
  mounted () {
    this.drawChart()
  },
  methods: {
    drawChart () {
      var dom = this.$refs['chartContent']
      // console.log('dom=>', dom)
      this.container = this.charts.init(dom)
      this.container.setOption(this.option)//绘制canvas图表
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
    .chart-content {
      width: 72px;
      height: 72px;
      margin-left: -11px;
      margin-top: -11px;
    }
  }
</style>
