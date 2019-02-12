<template>
  <div class="right-box-wrapper">
    <transition name="animationRight" mode="out-in" appear>
      <div class="right-box" v-if="rightBoxTakeUp" key="right-box">

        <slot></slot>
        <div class="enter-btn-wrapper"  @click="closeRightBox">
          <i class="el-icon-d-arrow-right" v-if="rightBoxTakeUp"></i>
        </div>
      </div>
      <div v-else class="back-btn-wrapper"  @click="openRightBox">
        <i class="el-icon-d-arrow-left" v-if="!rightBoxTakeUp"></i>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'RightBox',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['rightBoxTakeUp'])
  },
  methods: {
    openRightBox () {
      this.chRightBoxTakeUp(true)
    },
    closeRightBox(){
      this.chRightBoxTakeUp(false)
    },
    ...mapMutations(['chRightBoxTakeUp'])
  }
}
</script>

<style lang="less" scoped>
  .right-box-wrapper{
    .comFixed();
    right: 0;
    top: @leftRightTop;
    /*width: @tfAsideRightWidth;*/
    height: @tfAsideRightHeight;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    /*overflow: hidden;*/
    .right-box {
      overflow-y: scroll; // 右侧y轴超出部分增加滚动显示
      overflow-x: visible;
      width: @tfAsideRightWidth;
      height: @tfAsideRightHeight;
      min-height:@tfAsideRightMinHeight;
      .comBg();
      .enter-btn-wrapper{
        position: absolute;
        left:-25px;
        top:0;
        width:25px;
        height:50px;
        .comBg();
        text-align: center;
        line-height: 26px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        cursor: pointer;
        transition: all 0.3s linear;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-icon-d-arrow-right {
          color:white;
          right: 0px;
          top: 0px;
        }
      }
    }
    .back-btn-wrapper{
      position: absolute;
      right:0;
      width:25px;
      height:50px;
      .comBg();
      text-align: center;
      line-height: 26px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      cursor: pointer;
      transition: all 0.3s linear;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-icon-d-arrow-left {
        color:white;
        right: 16px;
        top: 95px;
      }
    }
    .back-btn-wrapper:hover{
      background-color: RGB(64,158,255);
    }
  }
</style>
