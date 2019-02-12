<!--查看管井 断面示意图  ****王震-->
<template>
  <div class="contract-list-stic">
    <right-box>
      <!--标题-->
      <div class="data-statistics-head">
        断面示意图
        <i class="green circle"></i><label>可用</label>
        <i class="red circle"></i><label>不可用</label>
        <i class="yellow circle"></i><label>待定</label>
        <i class="gray circle"></i><label>线缆</label>
        <!--<i class="el-icon-d-arrow-right" @click="closeRightBox"></i>-->
      </div>
      <!--面选择按钮组-->
      <el-row class="btn-group" :class="btnSelectActive">
        <button class="btn-select" @click="btnSelect('A')">A</button>
        <button class="btn-select" @click="btnSelect('B')">B</button>
        <!--<button class="btn-select" @click="btnSelect('C')">C</button>-->
        <!--<button class="btn-select" @click="btnSelect('D')">D</button>-->
      </el-row>
      <!--断面图表 排列12矩阵-->
      <section-table :tdiData="sectionTableData"></section-table>
      <!--分割线-->
      <span class="cut"></span>
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
import SectionTable from '@/components/tf-public/SectionTable.vue'//断面示意图
import TitleDesItem from '@/components/tf-public/TitleDesItem.vue'//合同列表信息组件
import InfoList from '@/components/tf-public/InfoList.vue'//管井信息列表
import {mapMutations, mapGetters} from 'vuex'//状态管理工具

export default {
  name: 'ShowPipeline',
  data () {
    return {
      btnSelectState: 'btnSelectActive1',//面选择状态
      borderColor: 'redBorder',//管路边框颜色控制
      sectionTableData: [],
      PipePartID: [],
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
          tit: '井宽',
          des: '1.2',
          cy: 'm'
        },
        {
          tit: '净空高',
          des: '1.5',
          cy: 'm'
        },
        {
          tit: '井长',
          des: '1.3',
          cy: 'm'
        },
        {
          tit: '管孔数',
          des: '',
          cy: ''
        },
        {
          tit: '产权人',
          des: '',
          cy: ''
        }
      ]//tdidata3结束
    }
  },
  watch: {
    '$route' (to, from) {
      this.matchDevice(to)
    }
  },
  created () {
    this.getMeterData()
    this.matchDevice()
  },
  methods: {
    matchDevice (to) {
      to = to === undefined ? this.$route : to
      console.log('matchDevice=>', to)
      // let type = to.query.type
      let type = 3 // 暂时写死为3
      let id = to.query.deviceID
      if (type === 3) { // 判定为管井
        let iPipeDetailData = this.iPipeDetailData
        for (let pipe of iPipeDetailData) {
          if (pipe.id === id) {
            console.log('pipe=>', pipe)
            this.PipePartID = pipe.PipePartID
          }
        }
      }
    },
    //隐藏右侧面板
    closeRightBox () {
      this.chRightBoxTakeUp(false)
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
    //面选择
    btnSelect (obj) {
      switch (obj) {
        case 'A':
          this.btnSelectState = 'btnSelectActive1'
          this.sectionTableData = this.tdiData.faceA
          this.$store.commit('LocateCurrentView', {
            id: this.PipePartID[0],
            level: 20,
            type: 5
          })
          break
        case 'B':
          this.btnSelectState = 'btnSelectActive2'
          this.sectionTableData = this.tdiData.faceB
          this.$store.commit('LocateCurrentView', {
            id: this.PipePartID[1],
            level: 20,
            type: 5
          })
          break
        case 'C':
          this.btnSelectState = 'btnSelectActive3'
          this.sectionTableData = this.tdiData.faceC
          break
        case 'D':
          this.btnSelectState = 'btnSelectActive4'
          this.sectionTableData = this.tdiData.faceD
          break
        default :
          this.btnSelectState = 'btnSelectActive1'
      }
    },
    getMeterData () {
      this.$post('/checkThePipeWell').then((res) => {
        this.tdiData2[0].des = res.contractNo
        this.tdiData2[1].des = res.contractAmount
        this.tdiData2[2].des = res.receivedAmount
        this.tdiData3[0].des = res.wellWidth
        this.tdiData3[1].des = res.clearHeight
        this.tdiData3[2].des = res.wellLong
        this.tdiData3[3].des = res.controlNo
        this.tdiData3[4].des = res.popertyPerson
        this.tdiData = res.sectionNoStatistics
        this.sectionTableData = this.tdiData.faceA
      })
    },
    ...mapMutations(['chRightBoxTakeUp', 'chfootExhPutCont', 'updateAlertListStatus'])
  },
  computed: {
    ...mapGetters(['iPipeDetailData']),
    btnSelectActive () {
      return this.btnSelectState
    },
    ColorState () {
      return this.borderColor
    }
  },
  components: {
    InfoList,
    SectionTable,
    RightBox,
    TitleDesItem,
    NavButtonGroup
  }
}
</script>

<style scoped>
  btn {
    margin: 0;
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
    height: 28px;
    cursor: pointer;
    border: 1px solid;
    background: none;
    font-size: 12px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
    line-height: 22px;
    -webkit-background-clip: text;
    margin-right: -4px;
    /*-webkit-text-fill-color:transparent;*/
  }

  /*A面选择效果*/
  .btnSelectActive1 .btn-select:nth-child(1) {
    border-radius: 4px 0px 0px 4px;
    border-color: #1890FF;
    color: #1890FF;
  }

  .btnSelectActive1 .btn-select:nth-child(2) {
    border-left: none;
  }

  .btnSelectActive1 .btn-select:nth-child(4) {
    border-radius: 0px 4px 4px 0px;
  }

  /*B面选择效果*/
  .btnSelectActive2 .btn-select:nth-child(1) {
    border-radius: 4px 0px 0px 4px;
    border-right: none;
  }

  .btnSelectActive2 .btn-select:nth-child(2) {
    border-color: #1890FF;
    color: #1890FF;
  }

  .btnSelectActive2 .btn-select:nth-child(3) {
    border-left: none;
  }

  .btnSelectActive2 .btn-select:nth-child(4) {
    border-radius: 0px 4px 4px 0px;
  }

  /*C面选择效果*/
  .btnSelectActive3 .btn-select:nth-child(1) {
    border-radius: 4px 0px 0px 4px;
  }

  .btnSelectActive3 .btn-select:nth-child(2) {
    border-right: none;
  }

  .btnSelectActive3 .btn-select:nth-child(3) {
    border-color: #1890FF;
    color: #1890FF;
  }

  .btnSelectActive3 .btn-select:nth-child(4) {
    border-left: none;
    border-radius: 0px 4px 4px 0px;
  }

  /*D面选择效果*/
  .btnSelectActive4 .btn-select:nth-child(1) {
    border-radius: 4px 0px 0px 4px;
  }

  .btnSelectActive4 .btn-select:nth-child(3) {
    border-right: none;
  }

  .btnSelectActive4 .btn-select:nth-child(4) {
    border-color: #1890FF;
    color: #1890FF;
    border-radius: 0px 4px 4px 0px;
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
    background: rgb(165, 165, 165);
  }

  .cut {
    display: inline-block;
    width: 90%;
    margin-left: 5%;
    border-bottom: 1px solid;
    border-color: rgba(255, 255, 255, 0.2)
  }

  .btn-group {
    margin: 20px 0;
    text-align: center;
  }
</style>
