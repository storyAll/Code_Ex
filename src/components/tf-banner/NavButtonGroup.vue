<template>
  <div class="nav-btn-group">
    <el-button @click="_getGIS" size="mini" class="btn"><i></i>{{iViewModeIndex === 0 ?'查看GIS' : '查看BIM'}}</el-button>
    <el-select v-if="iViewModeIndex === 0" class="factorises" v-model="aa" placeholder="选择厂房" size="mini">
      <el-option
        v-for="(v,index) in options"
        :key="index"
        :label="v"
        :value="v">
      </el-option>
    </el-select>
    <el-button size="mini" class="btn" @click="handleClick(value)" :key="index" v-for="(value,index) in arr">{{value}}
    </el-button>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
import Field from '@/api/filed.json'

export default {
  name: 'NavButtonGroup',
  data () {
    return {
      options: ['施洛特园区厂房'],
      a: '施洛特园区厂房',
      aa: '施洛特园区厂房'
    }
  },
  watch: {
    'iWorkShopIndex' (val) {
      this.a = val + 1 + '号厂房'
    },
    'a' (val, oldVal) {
      if (val !== oldVal) {
        var index = val.replace('号厂房', '')
        var to = (parseInt(index) - 1) < 0 ? 0 : (parseInt(index) - 1)
        this.$store.commit('updateIWorkShopIndex', to)
      }
    }
  },
  mounted () {
    this.a = '施洛特园区厂房'
  },
  methods: {
    /**
     *@desc 点击查看GIS相关信息
     *@param
     *@author 张冲
     *@date 2018/11/12 13:46
     */
    _getGIS: function () {
      // TODO
      this.$store.commit('updateIViewModeIndex', 1 - this.iViewModeIndex)
    },
    // 点击获得相对应的表格信息
    handleClick: function (value) {
      //点击展开收起底部组件
      this.chfootExhPutCont(!this.footExhPutCont)
      if (this.footExhPutCont) {
        this.updateAlertListStatus(false)
      }
      //保存当前按钮信息
      // TODO
      switch (value) {
        case '合同列表':
          break
        case '设备列表':
          break
        case '工单列表':
          this.openList()
          break
      }
    },
    openList () {
    },
    ...mapMutations([
      'chfootExhPutCont',
      'updateAlertListStatus'
    ])
  },
  computed: {
    //动态获取左上方按钮组
    arr: function () {
      let btns = []
      let entranceValue = this.iTabsData[this.iTabsIndex]
      Field.data.forEach(function (item) {
        if (item.title === entranceValue) {
          btns = item.button
        }
      })
      return btns
    },
    ...mapGetters([
      'footExhPutCont',
      'iTabsData',
      'iTabsIndex',
      'iViewModeIndex',
      'iWorkShopIndex'
    ])
  }
}
</script>

<style scoped lang="less">
  .nav-btn-group {
    .comFixed();
    top: 74px;
    left: 24px;
    background: hsla(0, 0%, 100%, .3);
    overflow: visible;
    padding: 5px 8px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    .btn {
      width: 90px;
      height: 30px;
      font-size: 15px;
    }
    .factorises {
      position: relative;
      top:-1px;
      /deep/ input {
        width: 100px;
        height: 30px;
      }
    }
    /deep/ .el-input__inner {
      background-color: rgba(255, 255, 255, 1);
      width: 88px;
      color: rgba(0, 0, 0, .65);
      padding-left: 10px;
    }
  }

  .nav-btn-group:after {
    content: "";
    width: 0px;
    height: 0px;
    border-width: 0 20px 20px;
    border-style: solid;
    border-color: transparent transparent hsla(0, 0%, 100%, .3);; /*透明 透明  灰*/
    margin: 0px auto;
    position: absolute;
    transform: rotate(90deg);
    margin-left: 0px;
    right: -30px;
    bottom: 10px;
  }
</style>
