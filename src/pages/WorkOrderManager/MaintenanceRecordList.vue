<template>
  <div>
    <right-box>
      <el-radio-group class="tabs" v-model="tabPosition" style="margin-bottom: 30px;">
        <el-radio-button label="right">待执行</el-radio-button>
        <el-radio-button label="bottom">已完成</el-radio-button>
        <el-radio-button label="left">已超时</el-radio-button>
      </el-radio-group>
      <ul>
        <li class="item" @click="rowClick">
          <div>
            <span class="text-left">发电机巡检</span>
            <span class="text-right">正常</span>
          </div>
          <div>
            <span class="text-left">巡检时间：2018-08-20 9:00</span>
            <span class="text-right">小红</span>
          </div>
          <hr style="border-color: #999">
        </li>
      </ul>
      <ul>
        <li class="item" @click="rowClick">
          <div>
            <span class="text-left">发电机巡检</span>
            <span class="text-right">正常</span>
          </div>
          <div>
            <span class="text-left">巡检时间：2018-08-20 9:00</span>
            <span class="text-right">小红</span>
          </div>
          <hr style="border-color: #999">
        </li>
      </ul>
      <ul>
        <li class="item" @click="rowClick">
          <div>
            <span class="text-left">发电机巡检</span>
            <span class="text-right">正常</span>
          </div>
          <div>
            <span class="text-left">巡检时间：2018-08-20 9:00</span>
            <span class="text-right">小红</span>
          </div>
          <hr style="border-color: #999">
        </li>
      </ul>
      <ul>
        <li class="item" @click="rowClick">
          <div>
            <span class="text-left">发电机巡检</span>
            <span class="text-right">正常</span>
          </div>
          <div>
            <span class="text-left">巡检时间：2018-08-20 9:00</span>
            <span class="text-right">小红</span>
          </div>
          <hr style="border-color: #999">
        </li>
      </ul>
      <ul>
        <li class="item" @click="rowClick">
          <div>
            <span class="text-left">发电机巡检</span>
            <span class="text-right">正常</span>
          </div>
          <div>
            <span class="text-left">巡检时间：2018-08-20 9:00</span>
            <span class="text-right">小红</span>
          </div>
          <hr style="border-color: #999">
        </li>
      </ul>
      <ul>
        <li class="item" @click="rowClick">
          <div>
            <span class="text-left">发电机巡检</span>
            <span class="text-right">正常</span>
          </div>
          <div>
            <span class="text-left">巡检时间：2018-08-20 9:00</span>
            <span class="text-right">小红</span>
          </div>
          <hr style="border-color: #999">
        </li>
      </ul>
      <ul>
        <li class="item" @click="rowClick">
          <div>
            <span class="text-left">发电机巡检</span>
            <span class="text-right">正常</span>
          </div>
          <div>
            <span class="text-left">巡检时间：2018-08-20 9:00</span>
            <span class="text-right">小红</span>
          </div>
          <hr style="border-color: #999">
        </li>
      </ul>
      <el-pagination
        class="pagination"
        small
        layout="prev, pager, next"
        :total="50">
      </el-pagination>
    </right-box>
  </div>
</template>

<script>
import RightBox from '@/components/tf-right-detail/RightBox.vue'//面板组件

export default {
  name: 'MaintenanceRecordList',
  data () {
    return {
      tabPosition: 'bottom'
    }
  },
  methods: {
    rowClick: function () {
      this.$router.push({name: '维保记录BIM', query: {dataIndex: 1}})
    }
  },
  components: {
    RightBox
  }
}
</script>

<style lang="less" scoped>
  .title {
    padding: 10px 0;
    font-size: 18px;
    text-align: center;
  }

  .tabs {
    margin-top: 20px;
    margin-left: 20px;
    .active {
    }
  }

  .item {
    cursor: pointer;
    > div {
      padding: 5px 0;
      &:first-child {
        font-weight: bold;
        font-size: 1.2em;
      }
    }
    padding: 0 20px;
    span {
      display: inline-block;
    }
  }

  .text-left {
    width: 70%;
    text-align: left;
  }

  .text-right {
    width: 28%;
    text-align: right;
  }

  .pagination {
    margin: 20px 0;
    text-align: center;
  }

  /deep/ .el-radio-button__inner {
    background-color: rgba(0, 0, 0, 0);
    color: rgba(255, 255, 255, .85);
    padding: 5px 25px;
  }

  /deep/ .el-input__inner, /deep/ .el-pager li, /deep/ .el-pagination .btn-next, /deep/ .el-pagination .btn-prev, /deep/ .el-pagination button:disabled {
    color: rgba(255, 255, 255, .85);
    background-color: rgba(0, 0, 0, 0);
  }

  /deep/ .el-pager .number, /deep/ .el-pager li:last-child {
    font-weight: normal;
    font-size: 16px;
  }

  /deep/ .el-pager li.active {
    color: #409EFF;
    cursor: default;
  }
  /deep/.el-radio-button__orig-radio:checked+.el-radio-button__inner{
    background-color: rgba(0,0,0,0);
    color:#409EFF;
  }
</style>
