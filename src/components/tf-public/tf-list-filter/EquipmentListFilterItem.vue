<template>
    <div class="filter-item">
      <el-input class="ruler"
                size="small"
                placeholder="设备名称"
                v-model="param.equipmentName"
                clearable>
      </el-input>
      <el-input class="ruler"
                size="small"
                placeholder="设备编号"
                v-model="param.equipmentID"
                clearable>
      </el-input>
      <el-input class="ruler"
                size="small"
                placeholder="设备位置"
                v-model="param.equipmentPosition"
                clearable>
      </el-input>
      <el-input class="ruler"
                size="small"
                placeholder="设备状态"
                v-model="param.equipmentStatus"
                clearable>
      </el-input>
      <el-select class="ruler" v-model="param.category" size="small" placeholder="设备类型">
      <el-option
                v-for="(item,index) in equipmentCategoryData"
                :key="index"
                :label="item"
                :value="item">
      </el-option>
      </el-select>
      <el-button style="margin-left: 10px" size="mini" type="primary" @click="resetData">重置</el-button>
      <el-button size="mini" type="primary" @click="confirmRequestParam">查询</el-button>
    </div>
</template>

<script>
export default {
  name: 'EquipmentListFilterItem',
  data() {
    return {
      param: {
        equipmentID: '',
        equipmentName: '',
        equipmentPosition: '',
        equipmentStatus: '',
        category: ''
      }
    }
  },
  props: {
    equipmentCategoryData: {
      type: Array,
      required: true,
      default: function () {
      }
    }
  },
  methods: {
    /**
     *@desc 初始化过滤条件
     *@param
     *@author 张冲
     *@date 2018/11/7 18:20
     */
    resetData: function () {
      // 初始化参数
      this.param={
        equipmentID: '',
        equipmentName: '',
        category: ''
      }
    },
    /**
     *@desc 确认过滤条件并提交给父组件
     *@param
     *@author 张冲
     *@date 2018/11/7 18:21
     */
    confirmRequestParam: function () {
      //提交表单参数
      this.$emit('equipmentListFilterItemParam',this.param)
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
  }
</style>
