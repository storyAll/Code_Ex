<template>
    <div class="info-list">
      <el-row v-for="(tdiDa,index) in tdiData" :key="index">
        <el-col :span="12">
          {{tdiDa.tit}}
        </el-col>
        <el-col :span="12">
          {{tdiDa.des}}<span>{{tdiDa.cy}}</span>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'InfoList',
  data () {
    return {}
  },
  props: {
    tdiData: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .info-list {
    color: #fff;
    font-size: 14px;
    padding-top: 20px;
  }
  .info-list .el-col {
    text-align: center;
  }
</style>
