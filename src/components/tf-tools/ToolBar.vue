<!--suppress ALL -->
<template>
  <div class="tools">
    <ul ref="bim" class="tools-ul" v-if="isBim===0">
      <li class="tools-li bim" @mouseleave="btnMouseleave" @mouseenter="btnMouseenter(index)"
          @click="btnPressStyle(index)" :key="index" v-for="(item,index) in BIM_PATH">
        <img :style="{width:'48px',height:'48px' ,}"
             :src="item.normal">
      </li>
    </ul>
    <ul ref="gis" class="tools-ul gis" v-else>
      <li class="tools-li" @mouseleave="btnMouseleave" @mouseenter="btnMouseenter(index)" @click="btnPressStyle(index)"
          :key="index" v-for="(item,index) in GIS_PATH">
        <img
          :style="{width:'48px',height:'48px' }"
          :src="item.normal">
      </li>
    </ul>
  </div>
</template>

<script>
//bim工具栏图标

import a from '@/assets/images/icons/tools/bim/icon_manyou_nor.png'
import b from '@/assets/images/icons/tools/bim/icon_manyou_hover.png'
import c from '@/assets/images/icons/tools/bim/icon_manyou_sel.png'
import d from '@/assets/images/icons/tools/bim/icon_cutcut_nor.png'
import e from '@/assets/images/icons/tools/bim/icon_cutcut_hover.png'
import f from '@/assets/images/icons/tools/bim/icon_cutcut_sel.png'
//gis工具栏图标
import g from '@/assets/images/icons/tools/gis/icon_big_hover.png'
import h from '@/assets/images/icons/tools/gis/icon_big_normal.png'
import i from '@/assets/images/icons/tools/gis/icon_big_press.png'
import j from '@/assets/images/icons/tools/gis/icon_celiang_hover.png'
import k from '@/assets/images/icons/tools/gis/icon_celiang_normal.png'
import l from '@/assets/images/icons/tools/gis/icon_celiang_press.png'
import m from '@/assets/images/icons/tools/gis/icon_gismainview_hover.png'
import n from '@/assets/images/icons/tools/gis/icon_gismainview_normal.png'
import o from '@/assets/images/icons/tools/gis/icon_gismainview_press.png'
import p from '@/assets/images/icons/tools/gis/icon_small_hover.png'
import q from '@/assets/images/icons/tools/gis/icon_small_normal.png'
import r from '@/assets/images/icons/tools/gis/icon_small_press.png'

import fullscreen from '@/assets/images/icons/tools/gis/icon_fullscreen_nor.png'
import fullscreen_press from '@/assets/images/icons/tools/gis/icon_fullscreen_hover.png'
import fullscreen_select from '@/assets/images/icons/tools/gis/icon_fullscreen_sel.png'

export default {
  name: 'ToolBar',
  data () {
    return {
      BIM_PATH: [
        {
          title: '',
          normal: n,
          hover: m,
          press: o
        },
        {
          title: '',
          normal: a,
          hover: b,
          press: c
        },
        {
          title: '',
          normal: d,
          hover: e,
          press: f
        },
        {
          title: '放大',
          hover: fullscreen_press,
          normal: fullscreen,
          press: fullscreen_select
        }
      ],
      GIS_PATH: [
        {
          title: '',
          hover: g,
          normal: h,
          press: i
        },
        {
          title: '',
          hover: p,
          normal: q,
          press: r
        },
        {
          title: '',
          hover: j,
          normal: k,
          press: l
        },
        {
          title: '',
          hover: m,
          normal: n,
          press: o
        },
        {
          title: '放大',
          hover: fullscreen_press,
          normal: fullscreen,
          press: fullscreen_select
        }
      ]
    }
  },
  props: {
    //是否显示bim工具栏
    isBim: {
      type: Number,
      required: true,
      default: false
    }
  },
  methods: {
    btnMouseleave: function () {
      if (this.isBim === 0) {
        for (let i = 0; i < this.$refs.bim.children.length; i++) {
          this.$refs.bim.children[i].children[0].src = this.BIM_PATH[i].normal
        }
      } else {
        for (let i = 0; i < this.$refs.gis.children.length; i++) {
          this.$refs.gis.children[i].children[0].src = this.GIS_PATH[i].normal
        }
      }
    },
    btnMouseenter: function (index) {
      if(this.isBim === 0){
        for (let i = 0; i < this.$refs.bim.children.length; i++) {
          this.$refs.bim.children[i].children[0].src = this.BIM_PATH[i].normal
          if (index === i) {
            this.$refs.bim.children[index].children[0].src = this.BIM_PATH[i].hover
          }
        }
      }else{
        for (let i = 0; i < this.$refs.gis.children.length; i++) {
          this.$refs.gis.children[i].children[0].src = this.GIS_PATH[i].normal
          if (index === i) {
            this.$refs.gis.children[index].children[0].src = this.GIS_PATH[index].hover
          }
        }
      }

    },
    btnPressStyle: function (index) {
      this.$emit('handleClick', index)

      if (this.isBim === 0) {
        for (let i = 0; i < this.$refs.bim.children.length; i++) {
          this.$refs.bim.children[i].children[0].src = this.BIM_PATH[i].normal
          if (index === i) {
            this.$refs.bim.children[index].children[0].src = this.BIM_PATH[i].press
          }
        }
      } else {
        for (let i = 0; i < this.$refs.gis.children.length; i++) {
          this.$refs.gis.children[i].children[0].src = this.GIS_PATH[i].normal
          if (index === i) {
            this.$refs.gis.children[index].children[0].src = this.GIS_PATH[index].press
          }
        }
      }
    },
  }
}
</script>

<style scoped lang="less">
  .tools {
    position: fixed;
    z-index: 3;
    bottom: 30px;
    left: 40%;
    .tools-ul {
      /*width: 230px;*/
      cursor: pointer;
      height: 54px;
      border-radius: 4px;
      /*background-color: rgba(255, 255, 255, .08);*/
      background-color: rgba(0, 0, 0, .1);
      border: 1px solid rgba(255, 255, 255, .3);
      .tools-li {
        cursor: pointer;
        display: inline-block;
        padding: 3px;

      }
    }
  }
</style>
