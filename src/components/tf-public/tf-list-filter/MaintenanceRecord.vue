<template>
  <div class="filter-item">
    <el-input class="ruler"
              size="small"
              placeholder="项目名称"
              v-model="param.projectName"
              clearable>
    </el-input>
    <el-select class="ruler" v-model="param.systemType" size="small" placeholder="系统类型">
      <el-option
        v-for="(item,index) in systemTypeData"
        :key="index"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-input class="ruler"
              size="small"
              placeholder="工单编号"
              v-model="param.workOrderId"
              clearable>
    </el-input>
    <el-input class="ruler"
              size="small"
              placeholder="工单内容"
              v-model="param.workOrderContent"
              clearable>
    </el-input>
    <el-input class="ruler"
              size="small"
              placeholder="负责人"
              v-model="param.principal"
              clearable>
    </el-input>
    <el-date-picker
      size="mini"
      v-model="param.dates"
      type="daterange"
      value-format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-select class="ruler" v-model="param.workOrderStatus" size="small" placeholder="工单状态">
      <el-option
        v-for="(item,index) in workOrderStatusData"
        :key="index"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-button style="margin-left: 10px" size="mini" type="primary" @click="resetData">重置</el-button>
    <el-button size="mini" type="primary" @click="confirmRequestParam">查询</el-button>
    <el-button size="mini" type="primary" @click="exportFile">导出</el-button>
  </div>
</template>

<script>
export default {
  name: 'MaintenanceRecord',
  data() {
    return {
      param: {
        //项目名称
        projectName: '',
        //系统类型
        systemType: '',
        //工单编号
        workOrderId: '',
        //工单内容
        workOrderContent: '',
        //负责人
        principal: '',
        //时间数组，包含起始时间
        dates: [],
        //工单状态
        workOrderStatus: ''
      }
    }
  },
  props: {
    systemTypeData: {
      type: Array,
      required: true,
      default: function () {
      }
    },
    workOrderStatusData: {
      type: Array,
      required: true,
      default: function () {
      }
    }
  },
  created: function () {
    // TODO
    //this.resetData
  },
  methods: {
    /**
     *@desc 初始化过滤条件
     *@param
     *@author 张冲
     *@date 2018/11/7 18:20
     */
    resetData: function () {
      // 初始化表单参数
      this.param={
        //项目名称
        projectName: '',
        //系统类型
        systemType: '',
        //工单编号
        workOrderId: '',
        //工单内容
        workOrderContent: '',
        //负责人
        principal: '',
        //时间数组，包含起始时间
        dates: [],
        //工单状态
        workOrderStatus: ''
      }
    },
    /**
     *@desc 确认过滤条件并提交给父组件
     *@param
     *@author 张冲
     *@date 2018/11/7 18:21
     */
    confirmRequestParam: function () {
      // 提交筛选参数
      this.$emit('maintenanceRecordParam',this.param)
    },
    /**
     *@desc 导出表格
     *@param
     *@author 张冲
     *@date 2018/11/21 16:42
     */
    exportFile: function () {
      //
    }
  }
}
</script>

<style scoped lang="less">
  .filter-item {
    position: relative;
    /*padding-bottom: 15px;*/
    padding-left: 48px;
    overflow: hidden;
    line-height: 40px;
    .el-button--primary {
      color: rgba(255,255,255,.85);
      padding: 6px 20px;
      background:none;
      border-color: #1890FF;
    }
    .ruler {
      width: 100px;
    }
    .btn-area{
      /*z-index: 3;*/
      /*position: relative;*/
      /*!*top: 2px;*!*/
      /*left: 10px;*/
    }
    /deep/ .el-range-input{
      background-color: rgba(0,0,0,0);
    }
    /deep/ .el-range-separator{
      color: rgba(255,255,255,.85);
    }
    /deep/ .el-range-editor{
      width: 220px;
      height: 32px;
      position: relative;
      top: 1px;
    }
  }
</style>
