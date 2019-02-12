<template>
  <div id="WidgetInspection">
    <div class="Inspection" v-for="(val,index) in inspectiondata" :key="index">
      <div class="first">
        <div class="firstEquip">{{val.title}}</div>
        <div class="firstStatus">{{val.status}}</div>
      </div>
      <div class="last">
        <div class="lastTime">
          <span>{{val.inspectionTitle}}<b>:</b></span>
          <span>{{val.inspectionTime}}</span>
        </div>
        <div class="lastName">{{val.inspectionPerson}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WidgetInspection',
  data(){
    return {

    }
  },
  props: {
    inspectiondata: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    }
  },
  methods: {

  }
}
</script>
<style scoped lang="less">
#WidgetInspection{
  // margin-top: 0px;
  height:450px;
  width:320px;
  overflow-x: hidden;
  overflow-y: scroll;
  color: white;
  .Inspection {
    width:90%;
    margin:auto;
    border-bottom: 1px solid #999;
    // background: red;
    .first {
      display:flex;
      font-size: 14px;
      font-weight: 600;
      padding: 10px 0;
      // background: blue;
      .firstEquip {
        width:60%;
      }
      .firstStatus {
        width:39%;
        text-align: right;
      }
    }
    .last {
      display:flex;
      padding-bottom: 10px;
      .lastTime {
        width:70%;
        font-size: 13px;
        b {
          padding: 0 2px 0 3px;
        }
      }
      .lastName {
        width:29%;
        text-align: right;
      }
    }
  }
}
.Inspection:last-child {
    border-width:0;
  }
</style>
