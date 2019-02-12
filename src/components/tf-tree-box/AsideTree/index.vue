<template>
  <div class="wrapper">
    <el-tree
      :data="treeData"
      node-key="id"
      :default-expanded-keys="defaultExpandedKeys"
      :default-checked-keys="defaultCheckedKeys"
      :expand-on-click-node="false"
      :props="defaultProps"
      :filter-node-method="filterNode"
      ref="tree"
      @node-click="nodeClick"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'AsideTree',
  data () {
    return {}
  },
  props: {
    treeData: { // 树形渲染所需要的数据
      type: Array,
      required: false,
      default: function () {
        return []
      }
    },
    defaultExpandedKeys: { // 默认展开的节点
      type: Array,
      required: false,
      default: function () {
        return ['wb_0']
      }
    },
    defaultCheckedKeys: { // 默认选择的节点
      type: Array,
      required: false,
      default: function () {
        return []
      }
    },
    defaultProps: { // element tree 组件的树形指定
      type: Object,
      required: true,
      default: function () {
        return {}
      }
    },
    filterText: { // 过滤字符串
      type: String,
      required: false,
      default: function () {
        return ''
      }
    }

  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    nodeClick (obj, ele, node) {
      // console.log('obj,ele,node=>', obj, ele, node)
      this.$emit('handleNodeClick', obj)
    }
  }
}
</script>

<style scoped lang="less">
  @import "../common";

  .wrapper {
    position: relative;
    top: 0;
    border-radius: 0;
    width: @asideWidth;
    height: @asideHeight - 45 - 40;
    /deep/ .el-tree-node.is-current.is-focusable {
      .el-tree-node__content > span{
      }
    }
  }
</style>
