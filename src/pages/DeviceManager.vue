<!--// 模拟页面调用组织数据-->
<template>
  <div class="wrapper">
    <!--设备管理-->
    <nav-button-group></nav-button-group>
    <foot-open></foot-open>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import FootOpen from './FootOpen'
import NavButtonGroup from '@/components/tf-banner/NavButtonGroup.vue'

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
    FootOpen,
    NavButtonGroup
  },
  computed: {
    ...mapGetters(['leftBoxTakeUp', 'iLeftTabsData', 'iLeftTabsIndex', 'iEquipmentData', 'iPipeNetworkData'])
  },
  watch: {},
  created () {
  },
  methods: {
    ...mapMutations({
      setBackButtonState: 'setBackButtonState'
    }),

  }
}
</script>
<style scoped lang="less">
  .wrapper {

  }
</style>
