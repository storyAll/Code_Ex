<!--object key->value 展示组件 http://localhost:8080/#/DeviceManager/ShowWorkshopBIM?deviceID=1 -->
<template>
  <div class="widget-wrapper" :style="{width:widgetWidth+'px',height:widgetHeight+'px'}">
    <div v-for='(item,index) in keyValueData' :key="index" v-if="index !== 'id'">
      <div class="label">{{keyAliasMap[index]}}</div>
      <div class="content">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WidgetKeyValue',
  data () {
    return {}
  },
  props: {
    widgetWidth: { // 总体tabs组件宽度
      type: String,
      required: false,
      default: function () {
        return 'auto'
      }
    },
    widgetHeight: { //总体tabs高度
      type: String,
      required: false,
      default: function () {
        return 'auto'
      }
    },
    keyValueData: {
      type: Object,
      required: false,
      default: function () {
        return {}
      }
    },
    keyAliasMap: {
      type: Object,
      required: false,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    handleClick (index) {
      this.tabsBgLeft = this.btnWidth * index
      this.$emit('handelClick', index)
    }
  }
}
</script>

<style scoped lang="less">
  .widget-wrapper {
    margin-top: 10px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .widget-wrapper > div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    color: white;
    height: 30px;
    overflow: hidden;
    .label {
      flex: 1;
      font-size: 14px;
      font-weight: 400;
      text-align: right;
      padding-right: 30px;
    }
    .content {
      flex: 2;
      text-align: center;
    }
  }

</style>
