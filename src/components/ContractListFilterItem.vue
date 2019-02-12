<!--合同管理 -- 合同列表 --搜索条件  ####王震-->
<template>
  <div>
    <el-input class="ruler"
              placeholder="合同名称"
              v-model="input1"
              size="small"
              clearable>
    </el-input>
    <el-input class="ruler"
              placeholder="合同编号"
              v-model="input2"
              size="small"
              clearable>
    </el-input>
    <el-input class="ruler"
              size="small"
              placeholder="承租人/公司"
              v-model="input3"
              clearable>
    </el-input>
    <el-date-picker
      v-model="value5"
      size="small"
      type="datetimerange"
      :picker-options="pickerOptions2"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
    <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
    <el-button size="mini" type="primary">重置</el-button><el-button size="mini" type="primary">确认</el-button>
  </div>
</template>

<script>
export default {
  name: 'ContractListFilterItem',
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      value5: ''
    }
  }
}
</script>

<style scoped lang="less">
  .ruler{
    width: 100px;
  }
</style>
