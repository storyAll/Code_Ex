<template>
  <div class="filter-item">
    <el-select class="ruler" v-model="param.contractStatus" size="small" placeholder="当前合同">
      <el-option
        v-for="(item,index) in contractStatusData"
        :key="index"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-input class="ruler"
              size="small"
              placeholder="合同名称"
              v-model="param.contractName"
              clearable>
    </el-input>
    <el-input class="ruler"
              size="small"
              placeholder="合同编号"
              v-model="param.contractId"
              clearable>
    </el-input>
    <el-input class="ruler"
              size="small"
              placeholder="承租人/公司"
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
    <el-button style="margin-left: 10px" size="mini" type="primary" @click="resetData">重置</el-button>
    <el-button size="mini" type="primary" @click="confirmRequestParam">查询</el-button>
  </div>
</template>

<script>
export default {
  name: 'ContractListFilter',
  data() {
    return {
      param: {
        //合同名称
        contractName: '',
        //合同编号
        contractId: '',
        //负责人
        principal: '',
        //合同状态
        contractStatus: '当前合同',
        //时间数组，包含起始时间
        dates: []
      }
    }
  },
  props: {
    contractStatusData: {
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
      // 重置筛选条件
      this.param={
        //合同名称
        contractName: '',
        //合同编号
        contractId: '',
        //负责人
        principal: '',
        //合同状态
        contractStatus: '当前合同',
        //时间数组，包含起始时间
        dates: []
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
      this.$emit('contractListFilterParam',this.param)
    }
  }
}
</script>

<style scoped lang="less">
  .filter-item {
    position: relative;
    /*padding-bottom: 15px;*/
    padding-left: 48px;
    line-height: 40px;
    .el-button--primary {
      color: rgba(255,255,255,.85);
      padding: 6px 20px;
      background:none;
      border-color: #1890FF;
    }
    .ruler {
      width: 120px;
    }
    .btn-area{
      position: relative;
      /*top: 2px;*/
      left: 10px;
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
