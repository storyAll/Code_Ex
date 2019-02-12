<template>
  <transition name="animationBottom">
    <div class="alert" v-show="alertListStatus">
      <span class="close" @click="close">收起</span>
      <h2 class="foot-title">消息列表</h2>
      <div class="date">
        <el-date-picker
          size="mini"
          v-model="dates"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <div class="btn-area">
          <el-button size="mini" type="primary" @click="resetData">重置</el-button>
          <el-button size="mini" type="primary" @click="confirmRequestParam">查询</el-button>
        </div>
      </div>
      <BaseTable @handleClickLocation="handleClick" :tableData="tableData" :tableHeads="tableHeadsData"></BaseTable>
      <el-pagination slot="3"
                     class="pagination"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[5, 10, 15 ]"
                     :page-size="10"
                     layout=" prev, pager, next, sizes,jumper"
                     :total="50">
      </el-pagination>
    </div>
  </transition>
</template>

<script>
import BaseTable from '@/components/tf-public/BaseTable'
import th from '@/api/tableHead.json'
import {alertListUrl} from '@/api/requestUrl.js'
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'AlertList',
  components: {
    BaseTable
  },
  data () {
    return {
      dates: [],
      tableData: [],
      param: {},
      currentPage:0,
    }
  },
  created () {
    this.getMessageList()
  },
  computed: {
    tableHeadsData: () => {
      return th.data.filter(item => {
        if (item.title === '消息列表') {
          return item
        }
      })[0]
    },
    ...mapGetters([
      'alertListStatus'
    ])
  },
  methods: {
    handleCurrentChange:function(){

    },

    handleSizeChange: function () {

    },
    /**
     *@desc 初始化过滤条件
     *@param
     *@author 张冲
     *@date 2018/11/7 18:20
     */
    resetData: function () {
    },
    /**
     *@desc 确认过滤条件并提交给父组件
     *@param
     *@author 张冲
     *@date 2018/11/7 18:21
     */
    confirmRequestParam: function () {
      this.getMessageList()
    },
    /**
     *@desc 获得消息列表数据
     *@param
     *@author 张冲
     *@date 2018/11/16 15:30
     */
    getMessageList: function () {
      this.$post(alertListUrl, this.param)
        .then(res => {
          this.tableData = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    close: function () {
      this.updateAlertListStatus(false)
    },
    handleClick: function (val) {
      this.$emit('handleClick', val)
    },
    ...mapMutations([
      'updateAlertListStatus'
    ])
  }
}
</script>

<style scoped lang="less">
  .alert {
    border-radius: 3px;
    position: fixed;
    z-index: 3;
    bottom: 0;
    overflow: hidden;
    height: auto;
    width: calc(100% - 323px);
    height: calc(100% - 120px);
    background: rgba(25, 52, 82, 1);
    .date {
      text-align: center;
      margin: 20px 0 40px 0;
    }
    .pagination {
      padding: 25px 40px;
      text-align: right;
    }
    margin: 0 auto;
    .foot-title {
      color: #fff;
      margin-left: 20px;
      font-size: 18px;
      padding: 10px 0;
    }
    .close {
      color: #347bb5;
      position: absolute;
      right: 20px;
      font-size: 14px;
      top: 15px;
      cursor: pointer;
    }
    .btn-area {
      position: absolute;
      top: 65px;
      right: 40px;
    }
    /deep/ .el-input__inner {
      background-color: #001E40;
    }
    /deep/ .el-button--primary {
      background: none;
      border-color: #1890FF;
    }
    /deep/ .el-pager li.active {
      padding: 2px 4px;
      border-radius: 3px;
      background-color: #409EFF;
      color: rgba(255, 255, 255, .85);
      line-height: 24px;
    }
    /deep/ .el-tabs__item {
      color: rgba(255, 255, 255, .85);
    }
    /deep/ .el-tabs__nav-wrap::after {
      background-color: rgba(0, 0, 0, .25);
      left: 48px;
    }
    /deep/ .el-tabs__nav-scroll {
      padding-left: 48px;
    }
    /deep/ .el-date-editor .el-range-input, .el-date-editor .el-range-separator {
      background: none;
    }
    /deep/ .el-date-editor .el-range-separator {
      color: rgba(255, 255, 255, .85);
    }
    /deep/ .el-input__inner, /deep/ .el-pager li, /deep/ .el-pagination .btn-next, /deep/ .el-pagination .btn-prev, /deep/ .el-pagination button:disabled, /deep/ .el-pagination__jump {
      color: rgba(255, 255, 255, .85);
      background-color: rgba(0, 0, 0, 0);
      border-color: rgba(255, 255, 255, .2);
    }
  }
</style>
