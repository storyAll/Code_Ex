<template>
  <div class="tabTitle">
    <div class="radio-group">
      <span v-for="(tab ,index) in tabs" :key="index" :class="{'highight':current==index}" @click="current=index,tabChange('TableDetail'+(index+1))">{{tab.name}}</span>
    </div>
    <keep-alive>
      <component v-bind:is="tabView"></component>
    </keep-alive>
  </div>
</template>

<script>
import TableDetail1 from './EquipmentInformation.vue'
import TableDetail2 from './MaintenanceIinformation.vue'
import TableDetail3 from './CheckingInformation.vue'
export default {
  name: 'EquipmentTab',
  data () {
    return {
      current: 0,
      tabView: 'tableDetail1',
      tabs: [{name: '设备信息'},{name: '维保信息'},{name: '巡检信息'}]
    }
  },
  components: {
    TableDetail1,
    TableDetail2,
    TableDetail3
  },
  methods: {
    tabChange(tab){
      this.tabView = tab
    }
  }
}
</script>

<style lang="less" scoped>
  .tabTitle{
    box-sizing: border-box;
    background: #2a404a;
    opacity: 0.9;
    width: 300px;
    padding: 20px 15px;
    height: 500px;
    overflow: hidden;
    .radio-group{
      text-align: center;
      width: 100%;
      padding-bottom: 25px;
      span{
        font-size:14px;
        color: aliceblue;
        padding: 5px 5px;
        background: #666666;
      }
      span:not(:last-child){
        border-right:1px solid #222222 ;
      }
      .highight{
        color: #222222;
        border: 1px solid #666666;
        background: antiquewhite;
      }
    }
  }
</style>
