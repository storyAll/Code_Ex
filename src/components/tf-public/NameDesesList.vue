<template>
  <div class="name-deses-list" v-if="dataList.length!==0">
    <div class="nameDesesList-cont" v-for="(dataLi,index) in dataList" :key="index">
      <div class="nameDesesList-cont-l">{{dataLi.name}}</div>
      ：
      <div class="nameDesesList-cont-r" v-if="dataLi.des" v-html="dataLi.des"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NameDesesList',
  data () {
    return {}
  },
  props: {
    dataList: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .name-deses-list {
    padding: 10px;
    font-size: 14px;
    .nameDesesList-cont {
      display: flex;
      padding: 3px 0;
    }
    .nameDesesList-cont-r {
      flex: 1;
    }
  }
</style>
