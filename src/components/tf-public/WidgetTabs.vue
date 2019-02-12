<template>
  <div class="tabs-wrapper" :style="{width:tabsWidth+'px',height:tabsHeight+'px'}">
    <div class="tabs-bg"
         :style="{
            width:tabsWidth/controllers.length + 'px',
            height:tabsHeight + 'px',
            lineHeight: tabsHeight + 'px',
            left:tabsBgLeft + 'px',
            backgroundColor: tabsBgColor
            }"
         v-if="[2,3].indexOf(btnGroupType) > -1"
    ></div>
    <div class="tabs-btn-wrapper"
         :style="{
          height:[1,3].indexOf(btnGroupType) > -1 ? tabsHeight+ 'px' : tabsHeight - 2 + 'px',
          width:tabsWidth  + 'px',
          overflow:'hidden',
          backgroundColor:'transparent',
        }"
         style="display: flex;flex-direction: row;justify-content: space-around;align-items: center"

    >
      <button v-for='(item,index) in controllers' :key="index"
              :style="{
               width:btnGroupType === 3 ? tabsWidth/controllers.length - 2 + 'px' : tabsWidth/controllers.length + 'px',
              height:btnGroupType === 3? tabsHeight - 2 + 'px' : tabsHeight + 'px',
              lineHeight: btnGroupType === 3 ? tabsHeight - 1 + 'px' : tabsHeight + 'px',
              backgroundColor: btnGroupNormalColor,
              color:btnGroupType === 3 && tabsBgLeft === btnWidth * index?tabsBgColor:''
              }"
              class="tabs-btn"
              :class="{'active':btnGroupType === 1 && tabsBgLeft === btnWidth * index,'bgt1':btnGroupType === 1}"
              @click="handleClick(index,item)"
      >
        {{item}}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WidgetTabs',
  data () {
    return {
      tabsBgLeft: 0,
      btnWidth: this.tabsWidth / this.controllers.length
    }
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
    handleClick (index, item) {
      this.tabsBgLeft = this.btnWidth * index
      this.$emit('handelClick', index)
      this.$emit('handelClickItem', {index, item})
    }
  }
}
</script>

<style scoped lang="less">
  .tabs-wrapper {
    position: relative;
    .tabs-bg {
      position: absolute;
      z-index: 1;
      left: 0;
      top: 0;
      transition: all 0.3s linear;
    }
    .tabs-btn-wrapper {
      position: absolute;
      z-index: 2;
      background-color: transparent;
      .tabs-btn {
        margin: 0 0;
        padding: 0 0;
        cursor: pointer;
        color: #fff;
        border: none;
        background-color: transparent;
      }
      .tabs-btn.bgt1 {
        color: rgba(255, 255, 255, .65);
        border-width: 1px;
        border-style: solid;
        border-color: rgba(255, 255, 255, .65);
        border-right: none;
      }
      .tabs-btn.bgt1:first-child {
        border-radius: 4px 0 0 4px;
      }
      .tabs-btn.bgt1:last-child {
        border-radius: 0 4px 4px 0;
        border-right: 1px solid;
      }
      .tabs-btn.bgt1.active {
        color: #1890FF;
        border-color: #1890FF;
      }
    }

  }

</style>
