<template>
  <div class="tabs-wrapper">
    <div class="normal-bar">
      <i class="el-icon-minus" @click="handleClick('left')"></i>
      <i class="el-icon-plus" @click="handleClick('right')"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WidgetBottomToolBar',
  data () {
    return {}
  },
  props: {
    controllers: { // 默认控制item数组
      type: Array,
      required: false,
      default: function () {
        return ['本月', '本年']
      }
    },
    tabsWidth: { // 总体tabs组件宽度
      type: Number,
      required: false,
      default: function () {
        return 82
      }
    },
    tabsHeight: { //总体tabs高度
      type: Number,
      required: false,
      default: function () {
        return 20
      }
    },
    tabsBgColor: { //总体tabs背景颜色
      type: String,
      required: false,
      default: function () {
        return 'RGBA(64, 158, 255,1)'
      }
    },
    btnGroupType: { //tabs组件类型,可选1,2
      type: Number,
      required: false,
      default: function () {
        return 2
      }
    },
    btnGroupNormalColor: { //按钮组（前景，上层）颜色
      type: String,
      required: false,
      default: function () {
        return 'transparent'
      }
    },
    color: {
      type: String,
      required: false,
      default: function () {
        return 'white'
      }
    }
  },
  methods: {
    handleClick (val) {
      this.$emit('handleClick', {type: val})
    }
  }
}
</script>

<style scoped lang="less">
  @width: 200px;
  .tabs-wrapper {
    position: absolute;
    margin: 0 0;
    left: calc(50% - @width / 2);
    z-index: 3;
    bottom: 100px;
    min-width: @width;
    width: @width;
    height: 35px;
    backdrop-filter: blur(10px) brightness(110%);
    background-color: rgba(255, 255, 255, .8);
    border-radius: 8px;
    overflow: hidden;

    .normal-bar {
      width: @width;
      hegiht: 35px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      transition: all 0.3s;
      i {
        flex: 1;
        color: #2D3639;
        font-size: 22px;
        text-align: center;
        line-height: 35px;
        font-weight: 900;
        transition: all 0.3s linear;
        cursor: pointer;
      }
      i:hover {
        background-color: #2D3639;
        color: snow
      }
    }

  }

</style>
