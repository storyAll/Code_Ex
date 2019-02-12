<!--查看管路 ****王震-->
<template>
  <div class="contract-list-stic">
    <right-box>
      <!--空白区域-->
      <!--<div class="none"></div>-->
      <div class="data-statistics-head">
        <widget-tabs :controllers="['数据统计']" :tabsWidth="70"
                     :btnGroupNormalColor="'RGB(29,57,88)'"></widget-tabs>
        <!--<i class="el-icon-d-arrow-right" @click="closeRightBox"></i>-->
      </div>
      <!--合同信息-->
      <title-des-item :tdiData="tdiData2"></title-des-item>
      <!--按钮组-->
      <el-row class="btn-group">
        <el-button type="primary" size="small" @click="showContract">查看合同列表</el-button>
        <el-button type="primary" size="small" @click="showCost">查看费用列表</el-button>
      </el-row>
      <!--分割线-->
      <span class="cut"></span>
      <!--管井信息列表-->
      <InfoList :tdiData="tdiData3"></InfoList>
    </right-box>
  </div>
</template>

<script>
import NavButtonGroup from '@/components/tf-banner/NavButtonGroup.vue' //左上工具栏
import RightBox from '@/components/tf-right-detail/RightBox.vue'//面板组件
import TitleDesItem from '@/components/tf-public/TitleDesItem.vue'//合同列表信息组件
import InfoList from '@/components/tf-public/InfoList.vue'//管井信息列表
import WidgetTabs from '@/components/tf-public/WidgetTabs'//年份切换按钮
import { mapMutations } from 'vuex'//状态管理工具

export default {
  name: 'ShowPipeline',
  data () {
    return {
      btnSelectState: 'btnSelectActive1',//面选择状态
      borderColor: 'redBorder',//管路边框颜色控制
      sectionTableData: [],
      tdiData: {},//tdiData1结束
      tdiData2: [
        {
          tit: '合同数',
          des: '26',
          cy: '个'
        },
        {
          tit: '合同总额',
          des: '220',
          cy: '万元'
        },
        {
          tit: '已收总额',
          des: '120',
          cy: '万元'
        }
      ],
      tdiData3: [
        {
          tit: '检查井数',
          des: '12',
          cy: ''
        },
        {
          tit: '管道材质',
          des: 'PVC',
          cy: ''
        },
        {
          tit: '长度',
          des: '2000',
          cy: 'm'
        },
        {
          tit: '管孔数',
          des: '12',
          cy: ''
        },
        {
          tit: '产权人',
          des: '天保建设',
          cy: ''
        }
      ]//tdidata3结束
    }
  },
  created(){
    this.getMeterData()
  },
  methods: {
    //隐藏右侧面板
    closeRightBox (){
      this.chRightBoxTakeUp(false)
    },
    //展开下面板
    handleClick(obj){
      //点击展开收起底部组件
      this.chfootExhPutCont(!this.footExhPutCont)
      if (this.footExhPutCont) {
        this.updateAlertListStatus(false)
      }
    },
    showContract () {
      console.log('this.$route', this.$route)
      let routeName = this.$router.name
      this.$router.push({
        name: routeName,
        query: {
          deviceID: 111,
          dataIndex: 0,
          hint: new Date().valueOf()
        }
      })
      this.$store.commit('chfootExhPutCont', true)
    },
    showCost () {
      let routeName = this.$router.name
      this.$router.push({
        name: routeName,
        query: {
          deviceID: 111,
          dataIndex: 1,
          hint: new Date().valueOf()
        }
      })
      this.$store.commit('chfootExhPutCont', true)
    },
    getMeterData(){
      this.$post('/checkThePipeWell').then((res)=>{
        this.tdiData2[0].des = res.contractNo
        this.tdiData2[1].des = res.contractAmount
        this.tdiData2[2].des = res.receivedAmount
        this.tdiData3[0].des = res.checkNum
        this.tdiData3[1].des = res.material
        this.tdiData3[2].des = res.length
        this.tdiData3[3].des = res.plumberNum
        this.tdiData3[4].des = res.popertyPerson
        this.tdiData = res.sectionNoStatistics
        this.sectionTableData = this.tdiData.faceA
      })
    },
    ...mapMutations(['chRightBoxTakeUp','chfootExhPutCont', 'updateAlertListStatus'])
  },
  computed: {
    btnSelectActive(){
      return this.btnSelectState
    },
    ColorState(){
      return this.borderColor
    }
  },
  components: {
    InfoList,
    RightBox,
    TitleDesItem,
    NavButtonGroup,
    WidgetTabs
  }
}
</script>

<style scoped>
  btn {
    margin: 0;
  }
  .none {
    height: 30px;
  }
  .data-statistics-head {
    color: white;
    display: flex;
    padding: 10px 16px 0 20px;
    justify-content: space-between;
    align-items: center;
  }
  .el-icon-d-arrow-right {
    cursor: pointer;
    color: #fff;
  }
  .btn-select {
    width: 22.5%;
    height:28px;
    cursor: pointer;
    border:1px solid;
    background: none;
    font-size:12px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(255,255,255,0.85);
    line-height:22px;
    -webkit-background-clip:text;
    margin-right: -4px;
    /*-webkit-text-fill-color:transparent;*/
  }
  /*A面选择效果*/
  .btnSelectActive1 .btn-select:nth-child(1) {
    border-radius:4px 0px 0px 4px;
    border-color: #1890FF;
    color: #1890FF;
  }
  .btnSelectActive1 .btn-select:nth-child(2) {
    border-left: none;
  }
  .btnSelectActive1 .btn-select:nth-child(4){
    border-radius:0px 4px 4px 0px;
  }
  /*B面选择效果*/
  .btnSelectActive2 .btn-select:nth-child(1) {
    border-radius:4px 0px 0px 4px;
    border-right: none;
  }
  .btnSelectActive2 .btn-select:nth-child(2) {
    border-color: #1890FF;
    color: #1890FF;
  }
  .btnSelectActive2 .btn-select:nth-child(3) {
    border-left: none;
  }
  .btnSelectActive2 .btn-select:nth-child(4){
    border-radius:0px 4px 4px 0px;
  }
  /*C面选择效果*/
  .btnSelectActive3 .btn-select:nth-child(1) {
    border-radius:4px 0px 0px 4px;
  }
  .btnSelectActive3 .btn-select:nth-child(2) {
    border-right: none;
  }
  .btnSelectActive3 .btn-select:nth-child(3) {
    border-color: #1890FF;
    color: #1890FF;
  }
  .btnSelectActive3 .btn-select:nth-child(4){
    border-left: none;
    border-radius:0px 4px 4px 0px;
  }
  /*D面选择效果*/
  .btnSelectActive4 .btn-select:nth-child(1) {
    border-radius:4px 0px 0px 4px;
  }
  .btnSelectActive4 .btn-select:nth-child(3) {
    border-right: none;
  }
  .btnSelectActive4 .btn-select:nth-child(4){
    border-color: #1890FF;
    color: #1890FF;
    border-radius:0px 4px 4px 0px;
  }
  .circle {
    width: 10px;
    height: 10px;
    border-radius: 5px;
  }
  .green {
    background: #3BCD64;
  }
  .red {
    background: #F66060;
  }
  .yellow {
    background: #FFCC00;
  }
  .gray {
    background: rgb(165,165,165);
  }
  .cut {
    display: inline-block;
    width: 90%;
    margin-left:5%;
    border-bottom: 1px solid;
    border-color: rgba(255,255,255,0.2)
  }
  .btn-group {
    margin:20px 0;
    text-align: center;
  }
</style>
