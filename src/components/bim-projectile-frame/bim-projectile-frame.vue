<template>
  <div class="bim-projectile-frame" v-if="positionShow">
    <div class="projectFrame-box" :style="{top: positionNo.y,left: positionNo.x}">
      <div class="projectFrame-box-title">{{proBoxtitle}}</div>
      <div class="projectFrame-box-deses">
        <div class="projectFrame-box-des" v-for='(proBox,i) in proBoxObj' :key="i">{{proBox.name + ':' + proBox.des}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectileFrame',
  data () {
    return {}
  },
  computed: {},
  components: {},
  props: {
    proBoxtitle: {
      type: String,
      default: function () {
        return '名称'
      },
    },
    proBoxObj: {
      type: Array,
      default: function () {
        return [
          {
            name: '类型',
            des: '类型'
          },
          {
            name: '位置',
            des: '位置'
          }
        ]
      }
    },
    positionNo: {
      type: Object,
      default: function () {
        return {
          x: '-300px',
          y: '-300px'
        }
      }
    },
    positionShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "bim-projectile-frame";
</style>
