<template>
  <div class="wrapper">
    <transition name="animationLeft" mode="out-in" appear>
      <div v-if="asideTreeTakeUp" key="showbox" class="wrapper-box">
        <aside-controller slot="controller" class="controller">
          <el-tabs v-model="activeTab" class="aside-controller-tab" :stretch="true"
                   @tab-click="changeTab"
          >
            <el-tab-pane v-for='(item,index) in controllers' :key="index" :label="item" :name="index+''">
            </el-tab-pane>
          </el-tabs>
          <div class="drop-up" @click="emitAsideTreeTakeUp(controllerIndex,false)">
            <i class="el-icon-d-arrow-left icon" style="color:white;font-size: 18px"></i>
          </div>
        </aside-controller>
        <aside-search slot="search" class="search">
          <el-input
            size="small"
            class="search-input"
            placeholder="请输入内容"
            v-model="searchKey"
            clearable>
            <!--<el-button slot="append" type="primary">{{searchBtnLabel}}</el-button>-->
            <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
          </el-input>

        </aside-search>
        <aside-tree slot="tree" class="tree"
                    :treeData="treeData"
                    :defaultExpandedKeys="defaultExpandedKeys"
                    :defaultCheckedKeys="defaultCheckedKeys"
                    :defaultProps="defaultProps"
                    :filterText="searchKey"
                    @handleNodeClick="handleNodeClick"
        >
          <!--<el-tree-->
          <!--:data="testTreeData"-->
          <!--node-key="id"-->
          <!--:default-expanded-keys="[2, 3]"-->
          <!--:default-checked-keys="[5]"-->
          <!--:props="defaultProps">-->
          <!--&gt;-->
          <!--</el-tree>-->
        </aside-tree>
      </div>
      <div v-else key="showaction" class="wrapper-action">
        <div v-for='(item,index) in controllers' :key="index" class="action-btn"
             :class="['normal']"
             @click="emitAsideTreeTakeUp(index,true)">
          {{item}}
        </div>
        <!--<div class="action-bottom-decorate">-->
        <!--<div class="bottom">-->
        <!--</div>-->
        <!--</div>-->
      </div>
    </transition>

  </div>
</template>

<script>
import AsideController from './AsideController'
import AsideSearch from './AsideSearch'
import AsideTree from './AsideTree'

export default {
  name: 'AsideTreeBoxCommon',
  data () {
    return {
      searchBtnLabel: '搜索',
      activeTab: this.controllerIndex + '',
      searchKey: this.treeSearchKey,
      defaultExpandedKeys: ['wb_0'],
      defaultCheckedKeys: [5],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  props: {
    asideTreeTakeUp: {
      type: Boolean,
      required: false,
      default: function () {
        return false
      }
    },
    controllers: {
      type: Array,
      required: false,
      default: function () {
        return []
      }
    },
    treeData: {
      type: Array,
      required: false,
      default: function () {
        return []
      }
    },
    controllerIndex: {
      type: Number,
      required: false,
      default: function () {
        return 0
      }
    },
    treeSearchKey: {
      type: String,
      required: false,
      default: function () {
        return ''
      }
    }
  },
  watch: {
    controllerIndex (val, preVal) {
      this.activeTab = val + ''
    },
    treeSearchKey (val, oldVal) {
      if (val !== oldVal) {
        this.searchKey = val
      }
    },
    searchKey (val) {
      this.$emit('handleChangeSearchKey', val)
    }
  },
  components: {
    AsideController,
    AsideSearch,
    AsideTree
  },
  computed: {},
  methods: {
    emitAsideTreeTakeUp (index, b) {
      this.$emit('handleAsideTreeTakeUp', {index: index, b: b})
    },
    changeTab (e) {
      let index = parseInt(e.index)
      this.emitAsideTreeTakeUp(index, this.asideTreeTakeUp)
    },
    handleNodeClick (e) {
      this.$emit('handleNodeClick', e)
    }
  }
}
</script>

<style scoped lang="less">
  @import "./common";

  @iconWidth: 75px;
  @actionheight: 85 + 85 + 42 px;
  @actionHoverBg: RGB(42, 73, 102);
  .wrapper {
    .comFixed();
    top: @leftRightTop + 30px;
    left: 0;
    min-height: 0;
    .wrapper-box {
      height: @asideHeight;
      width: @asideWidth;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      overflow: hidden
    }
    .wrapper-action {
      height: @actionheight;
      width: 42px;
      color: white;
      font-size: 16px;
      .active {
        background-color: #268BFF !important;
      }
      .normal {
        background-color: #1E3956 !important;
      }
      .normal:hover{
        background-color: #268BFF !important;
      }
      .normal:hover:after{
        border-color: transparent transparent #268BFF !important;; /*透明 透明  灰*/
      }
      .active:after {
        transition: all 0.3s linear;
        border-color: transparent transparent #268BFF !important;; /*透明 透明  灰*/
      }
      .action-btn {
        width: 42px;
        height: 85px;
        background-color: @bg;
        writing-mode: tb-rl;
        cursor: pointer;
        text-align: center;
        line-height: 42px;
      }

      .action-btn:hover {
        background-color: @actionHoverBg;
      }
      .action-btn:first-child {
        border-top-right-radius: 8px;
      }
      .action-btn:first-child:hover {
        background-color: @actionHoverBg;
      }
      .action-btn:last-child {
        border-bottom-right-radius: 20px;
      }
      .action-btn:last-child:after {
        content: "";
        width: 0px;
        height: 0px;
        border-width: 0 26px 26px;
        border-style: solid;
        border-color: transparent transparent #1E3956; /*透明 透明  灰*/
        margin: 0px auto;
        position: absolute;
        transform: rotate(-45deg);
        margin-left: -20.5px;
        left: -50px;
        bottom: -17px;
      }
      .action-btn:last-child:hover:after {
        border-color: transparent transparent #1E3956; /*透明 透明  灰*/
      }
    }
    .controller {
      background-color: @bg;
      .aside-controller-tab {
        width: @asideWidth - @iconWidth - 20;
        margin-left: 20px;
        height: 40px;
        overflow: hidden;
        display: inline-block;
        padding: 0 0;

      }
      .drop-up {
        display: inline-block;
        vertical-align: top;
        width: @iconWidth - 5;
        height: 40px;
        cursor: pointer;
        transition: all 0.3s linear;
        text-align: center;
        .icon {
          display: block;
          line-height: 40px;
        }
      }
      /*.drop-up:hover {*/
      /*background-color: RGB(42, 73, 102);*/
      /*}*/
    }
    .search {
      background-color: @bg;
      display: flex;
      justify-content: center;
      align-items: center;
      div input {
        background-color: #112239;
        border: none;
      }
      .search-input {
        width: @asideWidth - 30;
      }
    }
    .tree {
      background-color: @bg;

    }
  }
</style>
<!--修改elemenet ui 内部样式-->
<style scoped lang="less">
  @import "./common";

  .wrapper {
    /deep/ .controller {
      .el-tabs__item {
        /*padding-right: 0;*/
        /*padding-left: 0;*/
        color: white;
        font-size: 20px;
      }
      .el-tabs__nav-wrap::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0px;
        background-color: #e4e7ed;
        z-index: 1;
      }
    }
    /deep/ .tree {
      .el-tree-node__label {
        width: calc(100% - 40px);
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 18px;
      }
      .el-tree {
        height: @asideHeight - 40 - 45;
        width: @asideWidth - 20;
        margin-left: 10px;
        background: transparent;
        overflow-y: scroll;
        overflow-x: hidden;
        /*box-shadow: 0px 0px 10px 0px rgba(0, 27, 51, 0.3);*/
        .el-tree-node__content:hover {
          background-color: RGB(42, 73, 102)
        }
        .is-current .el-tree-node__content:hover {
          background-color: RGB(42, 73, 102)
        }
        .el-tree-node:focus > .el-tree-node__content {
          background-color: RGB(10, 23, 36);
        }
        /*.is-current > .el-tree-node__content{*/
        /*background-color: RGB(10, 23, 36)*/
        /*}*/
        span.el-tree-node__label {
          color: white
        }
      }
    }
    /deep/ .search {
      div {
        border-radius: 3px;
      }
      .el-button {
        padding-top: 8px;
        padding-bottom: 8px;
      }
      * {
        background-color: #112239;
        border: none;
      }
    }
  }

</style>
