<template>
  <div id="chart-wrapper" class="chart-wrapper" ref="chartWrapper">
    <div ref="chartContent" class="chart-content"></div>
    <div class="controller" v-if="rightTabsShow">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  name: 'CommonChart',
  data () {
    return {
      container: {}
    }
  },
  props: {
    chartOption: {
      type: Object,
      required: false,
      default: function () {
        var options = {
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
            data: [240, 310, 390, 200]
          }]
        }
        return options
      }
    },
    rightTabsShow: {
      type: Boolean,
      default: true
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
      this.container.setOption(this.chartOption)
    }
  },
  watch: {
    'chartOption' () {
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
      top: 6px;
      overflow: hidden;
    }
  }
</style>
