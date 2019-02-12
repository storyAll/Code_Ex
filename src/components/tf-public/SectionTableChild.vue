<template>
    <div class="SectionTableChild" :class="checkStatus()">
      <!--管孔或线缆排布-->
      <span class="circle" v-for="(tdiDa,index) in SectionTableChildData" :key="index" :class="[{greenBorder:tdiDa.Usability=='0',yellowBorder:tdiDa.Usability=='1',redBorder:tdiDa.Usability=='2'},id(tdiDa.id),active(tdiDa.id)]">
        <!--管孔内线缆排布-->
        <span class="circleSmall" v-for="(tdiDaChlid,index) in tdiDa.cable" :key="index" :class="[smId(tdiDaChlid.id)]">
        </span>
      </span>
    </div>
</template>

<script>
export default {
  name: 'SectionTableChild',
  data () {
    return {
      SectionTableChildData: []
    }
  },
  props: {
    //管段数据
    tdiData: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    //管段索引
    index: {
      type: Number,
      required: true,
      default: function () {
        return []
      }
    }
  },
  created(){
    this.getTdiData()
    //console.log(this.SectionTableChildData)
  },
  methods: {
    id(obj){
      return 'id'+ obj
    },
    smId(obj){
      return 'smId'+ obj
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
      if ( type===8){
        if ( obj===sub ){
          return 'activechild'
        }
      }
    },
    checkStatus(){
      //console.log(!this.$route.query.child)
      if (this.$route.query.deviceID ){
        return 'check'
      } else {
        return 'nocheck'
      }
    },
    getTdiData() {
      // 无关孔情况
      if (!this.tdiData[this.index].pore){
        this.tdiData[this.index].pore = []
      }
      // 无线缆情况
      if (!this.tdiData[this.index].cable){
        this.tdiData[this.index].cable = []
      }
      //线缆为空时
      if (this.tdiData[this.index].cable.length ===0 ){
        // 管孔字段不存在 此时状态 管段无管孔 无线缆
        if ( !this.tdiData[this.index]){
          this.tdiData[this.index].pore = []
        }
        // 管孔非空时 排布管孔
        if ( this.tdiData[this.index].pore.length>0){
          this.SectionTableChildData = this.tdiData[this.index].pore
        }
      } else {
        //管孔为空时 排布线缆
        this.SectionTableChildData = this.tdiData[this.index].cable
        this.SectionTableChildData.type = 1//标记当前为线缆
      }
    }
  },
  watch: {
    tdiData(){
      this.getTdiData()
      //console.log(this.tdiData)
    }
  }
}
</script>

<style scoped>
  .SectionTableChild {
    position: relative;
  }
  .circle {
    display: inline-block;
    width: 10px;
    height: 10px;
    /*border-color: rgb(165,165,165);*/
    background: rgb(165,165,165);
    border-radius: 50%;
    text-align: center;
    color: #fff;
    position: absolute;
  }
  .greenBorder {
    /*background:#3BCD64;*/
    border: 2px solid rgba(59,205,100,0.3);
    width: 15px  !important;
    height: 15px  !important;
    line-height: 50px  !important;
    background: none !important;
  }
  .redBorder {
    /*background:#F66060;*/
    border: 2px solid rgba(246,96,96,0.3);
    width: 15px  !important;
    height: 15px  !important;
    line-height: 50px  !important;
    background: none !important;
  }
  .yellowBorder {
    /*background:#FFCC00;*/
    border: 2px solid rgba(255,204,0,0.3);
    width: 15px  !important;
    height: 15px  !important;
    line-height: 50px  !important;
    background: none !important;
  }
  /*.active .nocheck .greenBorder {*/
    /*border: 3px solid #3BCD64;*/
  /*}*/
  /*.active .nocheck .redBorder {*/
    /*border: 3px solid #F66060;*/
  /*}*/
  /*.active .nocheck .yellowBorder {*/
    /*border: 3px solid #FFCC00;*/
  /*}*/
  .active .check .greenBorder {
    border:3px solid rgba(59,205,100,0.6) ;
  }
  .active .check .redBorder {
    border: 3px solid rgba(246,96,96,0.6);
  }
  .active .check .yellowBorder {
    border: 3px solid rgba(255,204,0,0.6);
  }
  .active .activechild.greenBorder {
    border: 3px solid #3BCD64;
  }
  .active .activechild.redBorder {
    border: 3px solid #F66060;
  }
  .active .activechild.yellowBorder {
    border: 3px solid #FFCC00;
  }
  .id1 {
    left: 40px;
    top: 42px;
  }
  .id2 {
    left: 25px;
    top: 42px
  }
  .id3 {
    left: 10px;
    top: 42px;
  }
  .id4 {
    left: 47px;
    top: 30px;
  }
  .id7 {
    left: 33px;
    top: 30px;
  }
  .id5 {
    left: 18px;
    top: 30px;
  }
  .id6 {
    left: 4px;
    top: 30px;
  }
  .id8 {
    left: 47px;
    top: 18px;
  }
  .id9 {
    left: 33px;
    top: 18px;
  }
  .id10 {
    left: 18px;
    top: 18px;
  }
  .id11 {
    left: 4px;
    top: 18px;
  }
  .id12 {
    left: 40px;
    top: 8px;
  }
  .id13 {
    left: 25px;
    top: 8px
  }
  .id14 {
    left: 10px;
    top: 8px;
  }
  .greenBorder.id1,.redBorder.id1,.yellowBorder.id1 {
    /*left: 30px;*/
    /*top: 4px*/
    left: 30px !important;
    top: 38px !important;
  }
  .greenBorder.id2,.redBorder.id2,.yellowBorder.id2 {
    /*left: 39px;*/
    /*top: 21px*/
    left: 11px !important;
    top: 38px !important
  }
  .greenBorder.id3,.redBorder.id3,.yellowBorder.id3 {
    /*left: 30px;*/
    /*top: 38px;*/
    left: 39px !important;
    top: 21px !important
  }
  .greenBorder.id4,.redBorder.id4,.yellowBorder.id4 {
    /*left: 11px;*/
    /*top: 38px*/
    left: 3px !important;
    top: 21px !important;
  }
  .greenBorder.id7,.redBorder.id7,.yellowBorder.id7 {
    /*left: 3px;*/
    /*top: 21px;*/
    left: 21px !important;
    top: 21px !important;
  }
  .greenBorder.id5,.redBorder.id5,.yellowBorder.id5 {
    left: 11px !important;
    top: 4px !important;
  }
  .greenBorder.id6,.redBorder.id6,.yellowBorder.id6 {
    /*left: 21px;*/
    /*top: 21px;*/
    left: 30px !important;
    top: 4px !important
  }
  .circleSmall {
    display: block;
    width: 2px;
    height: 2px;
    background: rgb(165,165,165);
    border-radius: 50%;
    position: absolute;
  }
  .smId1 {
    left: 10px;
    top: 11px;
  }
  .smId2 {
    left: 7px;
    top: 11px;
  }
  .smId3 {
    left: 4px;
    top: 11px;
  }
  .smId4 {
    left: 12px;
    top: 8px;
  }
  .smId5 {
    left: 9px;
    top: 8px;
  }
  .smId6 {
    left: 6px;
    top: 8px;
  }
  .smId7 {
    left: 3px;
    top: 8px;
  }
  .smId8 {
    left: 1px;
    top: 8px;
  }
  .smId9 {
    left: 12px;
    top: 5px;
  }
  .smId10 {
    left: 9px;
    top: 5px;
  }
  .smId11 {
    left: 6px;
    top: 5px;
  }
  .smId12 {
    left: 3px;
    top: 5px;
  }
  .smId13 {
    left: 1px;
    top: 5px;
  }
  .smId14 {
    left: 10px;
    top: 2px;
  }
  .smId15 {
    left: 7px;
    top: 2px;
  }
  .smId16 {
    left: 4px;
    top: 2px;
  }
</style>
