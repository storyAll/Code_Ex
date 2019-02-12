<!--object key->value 展示组件 http://localhost:8080/#/DeviceManager/ShowWorkshopBIM?deviceID=1 -->
<template>
  <div class="widget-wrapper" >
    <div class="widget" v-for='(item,index) in widgetData' :key="index" v-if="index !== 'id'">
      <div class="title">
        {{item.title}}
      </div>
      <div class="pannel" v-for="(val,key) in item.detail" :key="index + key">
        <div class="label">{{val.alias}}</div>
        <div class="content">{{val.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WidgetBlockList',
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
    widgetData: {
      type: Array,
      required: false,
      default: function () {
        return []
      }
    },
    keyAliasFn: {
      type: Function,
      required: false,
      default: function () {
        return function () {

        }
      }
    }
  },
  created () {
    console.log('widgetBlockList=>', this.widgetData)
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
    margin-top: 0px;
    height:450px;
    overflow-x: hidden;
    overflow-y: scroll;
    color: white;
  }

  .widget {
    margin-left: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    border-bottom: 1px solid grey;
    .title {
      height: 20px;
      line-height: 20px;
      font-size: 15px;
    }
    .pannel {
      display: flex;
      flex-direction: row;
      height: 20px;
      .label {
        flex: 1;
        font-size: 14px;
        font-weight: 400;
        text-align: right;
        padding-right: 30px;
      }
      .content {
        flex: 2;
        padding-left: 20px;
        text-align: left;
      }
    }
  }

  .widget:last-child {
    border: none;
  }

</style>
