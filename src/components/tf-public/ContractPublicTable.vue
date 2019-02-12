<template>
  <div class="ContractPublicTable">
    <table class="parkingsheet">
      <tr class="oddColor">
          <th>文档名称</th>
          <th>类型</th>
          <th>操作</th>
      </tr>
      <tr v-for="(item, key) in PublicTabledata" :key="key" :class="{'oddColor':key%2 != 0}">
          <td>{{item.documentname}}</td>
          <td>{{item.type}}</td>
          <td v-for="(val,index) in item.operation" :key="index">
            <span class="bluecolor">{{val.preview}}</span>
            <span class="bluecolor">{{val.download}}</span>
          </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ContractPublicTable',
  data () {
    return {

    }
  },
  methods: {

  },
  props: {
    PublicTabledata: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style scoped lang="less">
.ContractPublicTable {
  width:90%;
  margin:auto;
}
.parkingsheet{
    width: 100%;
    height: auto;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;
    color: #fff;
    // margin-bottom: 10px;
}
.parkingsheet tr th,.parkingsheet tr td{
    /*width: 10%;*/
    // border: 1px solid #1A344A;
    padding: 5px 10px;
    text-align: left;
    /*text-align: center;*/
    color: #fff;
}
.bluecolor {
  font-size: 14px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color: #1890FF;
  cursor: pointer;
}
.oddColor{
  background: #061D31;
}
</style>
