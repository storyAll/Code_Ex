<template>
  <div class="NetworkRoutingLine">
    <div v-for="(item,key) in netroutingdata" :key="key" class="networking">
      <div class="roundline">
        <div class="round"></div>
        <div v-if="key !=netroutingdata.length" class="line"></div>
      </div>
      <div class="content">
        <p>{{item.name}}</p>
        <p>编号<b>:</b><span>{{item.title}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NetworkRoutingLine',
  data () {
    return {

    }
  },
  methods: {

  },
  props: {
    netroutingdata: { // 总体tabs组件宽度
      type: String,
      required: false,
      default: function () {
        return 'auto'
      }
    }
  }
}
</script>

<style scoped lang="less">
.NetworkRoutingLine {
  width:90%;
  margin:auto;
}
.networking {
  width:100%;
  height:100%;
  display: flex;
  padding-left: 10px;
  .roundline {
    width:20px;
    .round {
      width:10px;
      height: 10px;
      border: 1.1px solid #797979;
      border-radius: 50%;
      background: #0066ff;
      margin:auto;
    }
    .line {
      width:1px;
      height:45px;
      background: #797979;
      margin:auto;
    }
  }
  .content {
    padding-left: 10px;
    p {
      padding:0;
      margin:0;
      font-size:14px;
      color:white;
      b {
        padding: 0 5px;
      }
      span {
        font-size: 12px;
      }
    }
  }
}
.networking:last-child .line {
  height:0;
  display:none;
}
</style>
