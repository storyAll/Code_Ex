<!--// 模拟页面调用组织数据-->
<template>
  <div class="backend-wrapper">
    后台管理
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import TfTreeBox from '@/components/tf-tree-box/TfTreeBox'
import HeadItem from '@/components/tf-banner/HeadItem'

export default {
  name: 'ContractManager',
  data () {
    return {
    }
  },
  components: {
    TfTreeBox,
    HeadItem
  },
  computed: {
    ...mapGetters(['leftBoxTakeUp'])
  },
  watch: {},
  created () {
  },
  methods: {
    ...mapMutations({
      setBackButtonState: 'setBackButtonState'
    })
  }
}
</script>
<style scoped lang="less">
  .backend-wrapper {
  }
</style>
