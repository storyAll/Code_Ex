<template>
  <div>
    <el-table v-if="tableData.length>0"
              class="table-style"
              :data="tableData"
              @row-click="getMonitorInfo"
              :row-class-name="setRowStyle"
              :header-cell-style="setHeaderStyle">
      <el-table-column v-for="(item,key) in tableHeads.tableHead" :key="key"
                       :prop="key"
                       :label="item">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="tableHeads.title==='费用列表'"  type="text" size="small">已缴费
          </el-button>
          <el-button v-else-if="tableHeads.title==='消息列表'" @click="handleClick(scope.row)" type="text" size="small">
            查看合同
          </el-button>
          <el-button v-else @click="handleClick(scope.row)" type="text" size="small">定位</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'BaseTable',
  props: {
    tableData: {
      type: Array,
      required: true,
      default: function () {
      }
    },
    tableHeads: {
      type: Object,
      required: true,
      default: function () {
      }
    }
  },
  watch: {
    tableData(val) {
    }
  },
  mounted() {
  },
  methods: {
    /**
     *@desc 给单元格设置隔行换色
     *@param
     *@author 张冲
     *@date 2018/11/8 11:19
     */
    setRowStyle: row => row.rowIndex % 2 === 1 ? 'odd' : 'even',
    setHeaderStyle: function () {
      return {
        background: 'rgba(25, 52, 82, 1)'
      }
    },
    /**
     *@desc
     *@param id 设备id
     *@author 张冲
     *@date 2018/11/8 17:52
     */
    handleClick: function (id) {
      this.$emit('handleClickLocation', id)
    },
    /**
     *@desc 点击该条记录获取右侧监控面板信息，
     *@param
     *@author 张冲
     *@date 2018/11/16 14:51
     */
    getMonitorInfo: function (row, event, column) {
      this.$emit('handleClickRow',row)
      // console.log('row=>',row)
      // console.log('event=>',event)
      // console.log('column=>', column)
      // this.$emit('handle')
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/.odd {
    cursor: pointer;
    background-color: rgba(25, 52, 82, 1) !important;
  }

  /deep/.even {
    cursor: pointer;
    background-color: rgba(0, 30, 64, 1) !important;
  }

  /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(0, 0, 0, 0) !important;
  }

  /deep/ .el-table {
    color: rgba(255, 255, 255, .65);
    background-color: rgba(0, 0, 0, 0);
    border-bottom: 0;
    margin-left: 40px;
    td, th {
      padding: 0;
    }
    th {
      color: #fff;
      padding: 5px 0;
    }
    /*tr {*/
      /*th:first-child, td:first-child {*/
        /*padding-left: 40px;*/
      /*}*/
    /*}*/
  }
  /deep/ .el-table tr {
    background-color: rgba(0, 0, 0, 0);
  }
  /deep/ .el-table td {
    border-bottom: 0;
    height: 2px;
  }

  /deep/ .el-table th.is-leaf {
    border-bottom: 0;
  }

  /deep/ .el-table--border::after, .el-table--group::after, .el-table::before {
    background-color: rgba(0, 0, 0, 0);
  }
  /*/deep/.el-table__fixed-right::before, .el-table__fixed::before{*/
    /*background-color: rgba(0, 0, 0, 0);*/
  /*}*/
  /*/deep/.el-table__body tr.hover-row>td{*/
    /*background-color: rgba(0, 0, 0, 0);*/
  /*}*/
</style>
