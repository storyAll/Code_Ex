<!--断面图表  ****王震-->
<template>
  <div class="section-table">
      <!--排列12矩阵-->
      <div v-for="(tdiDa,index) in getTdiData" class="circle" :key="index" :class="[{greenBorder:tdiDa.Usability=='0',yellowBorder:tdiDa.Usability=='1',redBorder:tdiDa.Usability=='2'},id(tdiDa.id),active(tdiDa.id)]">
        <!--管孔或线缆排布-->
        <SectionTableChild :tdiData="getTdiData" :index="index" v-if="getTdiDataShow(index)"></SectionTableChild>
      </div>
  </div>
</template>

<script>
//import ScatterPoint from '@/components/tf-public/tf-charts/ScatterPoint.vue'
import SectionTableChild from '@/components/tf-public/SectionTableChild.vue'
//图表组件
export default {
  name: 'SectionTable',
  components: {SectionTableChild},
  data () {
    return {
      data: [],
      chartOption: {},
      getTdiData: []
    }
  },
  props: {
    tdiData: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  },
  methods: {
    id(obj){
      return 'id'+ obj
    },
    getTdiDataShow(index){
      if (this.getTdiData[index].cable === undefined){
        return false
      }
      if (this.getTdiData[index].cable.length===0 && this.getTdiData[index].pore.length===0){
        return false
      } else {
        return true
      }
    },
    gettdiData(index) {
      return this.tdiData[index]
    },
    active(object){
      let obj = object //目标ID
      let deviceID = ''//deviceID初始化
      let len = ''//deviceID长度初始化
      let type = ''//deviceID类型初始化
      let sub = ''//截取deviceID后两位初始化
      obj = obj.toString()//obj字符串化
      deviceID = this.$route.query.deviceID// URL中deviceID
      deviceID = deviceID.toString()// URL中deviceID字符串化
      len = deviceID.length//deviceID长度
      type = this.$route.query.type//deviceID类型 管孔 子管空
      sub = deviceID.substring(len-2) //截取deviceID后两位
      //obj不满2位补0
      if (obj<10) {
        obj = '0' + obj
      }
      //如果是管孔状态
      if (type===7){
        if (obj === sub){
          return 'active'
        }
      }
      //如果是子管孔状态
      if (type===8){
        if (obj==='01'){
          return 'active'
        }
      }
      if (!this.$route.query.type){
        return 'active'
      }
    }
  },
  created(){
    this.getTdiData = this.tdiData
    //console.log(this.getTdiData)
  },
  watch: {
    tdiData(){
      this.getTdiData = this.tdiData
      //console.log(this.getTdiData)
    }
  }
}
</script>

<style scoped>
  .section-table {
    padding: 20px;
    position: relative;
    height: 180px;
  }
  .el-col-6 {
    margin-bottom: 10px;
  }
 .circle {
   display: inline-block;
   width: 61px;
   height: 61px;
   line-height: 61px;
   border-radius: 50%;
   text-align: center;
   background: none;
   color: #fff;
   position: absolute;
 }
 .green {
   border: 2px solid #3BCD64;
 }
 .red {
   border: 2px solid #F66060;
 }
 .yellow {
   border: 2px solid #ffff00;
 }
  .greenBorder {
    /*border: 3px solid #3BCD64;*/
    border:3px solid rgba(59,205,100,0.3);
  }
  .redBorder {
    /*border: 3px solid #F66060;*/
    border: 3px solid rgba(246,96,96,0.3);
  }
  .yellowBorder {
    /*border: 3px solid #FFCC00;*/
    border: 3px solid rgba(255,204,0,0.3);
  }
  .active.greenBorder {
    border: 3px solid #3BCD64;
    /*border:3px solid rgba(59,205,100,0.6);*/
  }
  .active.redBorder {
    border: 3px solid #F66060;
    /*border: 3px solid rgba(246,96,96,0.6);*/
  }
  .active.yellowBorder {
    border: 3px solid #FFCC00;
    /*border: 3px solid rgba(255,204,0,0.6);*/
  }
  /*.section-table{*/
    /*border-radius: 50%;*/
    /*width: 200px;*/
    /*height: 200px;*/
    /*margin: 0 auto;*/
    /*border-radius: 50%;*/
  /*}*/
  .id1 {
    left: 20px;
    top:2px;
  }
  .id2 {
    left: 92px;
    top:2px;
  }
  .id3 {
    left: 164px;
    top:2px;
  }
  .id4 {
    left: 236px;
    top:2px;
  }
  .id5 {
    left: 20px;
    top:70px;
  }
  .id6 {
    left: 92px;
    top:72px;
  }
  .id7 {
    left: 164px;
    top:72px;
  }
  .id8 {
    left: 236px;
    top:72px;
  }
  .id9 {
    left: 20px;
    top:142px;
  }
  .id10 {
    left: 92px;
    top:142px;
  }
  .id11 {
    left: 164px;
    top:142px;
  }
  .id12 {
    left: 236px;
    top:142px;
  }
  /*.el-row .el-col {*/
    /*position: absolute;*/
    /*left: 70px;*/
    /*top: 70px;*/
  /*}*/
  /*.el-row .el-col:nth-child(1){*/
    /*transform:translate(0px,-68px);*/
  /*}*/
  /*.el-row .el-col:nth-child(2){*/
    /*transform:translate(68px,-38px);*/
  /*}*/
  /*.el-row .el-col:nth-child(3){*/
    /*transform:translate(68px,38px);*/
  /*}*/
  /*.el-row .el-col:nth-child(4){*/
    /*transform:translate(0px,68px);*/
  /*}*/
  /*.el-row .el-col:nth-child(5){*/
    /*transform:translate(-68px,38px);*/
  /*}*/
  /*.el-row .el-col:nth-child(6){*/
    /*transform:translate(-68px,-38px);*/
  /*}*/
</style>
