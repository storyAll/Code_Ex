<!--// 模拟页面调用组织数据-->
<template>
  <div class="wrapper">
    <nav-button-group></nav-button-group>
    <foot-open></foot-open>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import HeadItem from '@/components/tf-banner/HeadItem'
import NavButtonGroup from '@/components/tf-banner/NavButtonGroup.vue'
import FootOpen from './FootOpen'

export default {
  name: 'AsideTreeBox',
  data () {
    return {
      controllerIndex: 0,
      controllers: ['设备', '管网'],
      equipmentTreeData: this.iEquipmentData,
      pipeNetworkTreeData: this.iPipeNetworkData,
      treeData: this.iEquipmentData
    }
  },
  components: {
    HeadItem,
    NavButtonGroup,
    FootOpen
  },
  computed: {
    ...mapGetters(['leftBoxTakeUp', 'iLeftTabsData', 'iLeftTabsIndex', 'iEquipmentData', 'iPipeNetworkData'])

  },
  watch: {},
  created () {
  },
  methods: {
    ...mapMutations([
      'setBackButtonState',
      'equipmentShow',
      'equipmentHide',
      'equipmentTypeShow',
      'equipmentTypeHide',
      'locationTranslucent'
    ]),
  }
}
</script>
<style scoped lang="less">
  .wrapper {

  }
</style>
