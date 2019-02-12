<!-- 查看管路 断面示意图-->
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
      <!--断面图表 排列12矩阵-->
      <section-table :tdiData="sectionTableData" style="margin-top: 20px"></section-table>
      <!--分割线-->
      <span class="cut"></span>
      <!--合同信息-->
      <title-des-item :tdiData="tdiData2"></title-des-item>
      <!--按钮组-->
      <el-row class="btn-group">
        <el-button type="primary" size="small" @click="showContract">{{ contractTypeFn }}</el-button>
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
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'ShowPipeline',
  data() {
    return {
      btnSelectState: 'btnSelectActive1',//面选择状态
      borderColor: 'redBorder',//管路边框颜色控制
      sectionTableData: [],
      //contractType: '查看合同列表',
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
      tdiData3: []//tdidata3结束
    }
  },
  created() {
    this.chioseGet()
  },
  methods: {
    chioseGet() {
      if (this.$route.query.type && this.$route.query.type === 7) {
        // 管孔
        this.getTubeHole()
      } else if (this.$route.query.type && this.$route.query.type === 8) {
        // 子管孔
        this.getSonTubeHole()
      } else {
        // 管段
        this.getMeterData()
      }
    },
    getTdiData3() {
      return [
        {
          tit: '管段名称',
          des: '中环西路ZH管段',
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
        }
      ]
    },
    //隐藏右侧面板
    closeRightBox() {
      this.chRightBoxTakeUp(false)
    },
    showContract() {
      if (this.contractTypeFn === '查看合同列表') {
        console.log('this.$route', this.$route)
        let type = ''
        if (this.$route.query.type) {
          type = this.$route.query.type
          type = type.toString()
        }
        if (type === '8') {
          this.$router.push({name: '合同详情管网GIS'})
        } else {
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
        }
      } else {
        this.hLightPipepart()
        this.$router.push({
          name: '合同详情管网GIS'
        })
      }
    },
    /*
   * 高亮管段
   * */
    hLightPipepart: function (val) {
      val = ['pipepart0', 'pipepart1', 'pipepart2', 'pipepart3', 'pipepart4', 'pipepart5', 'pipepart6']
      let pos = this.getPipepartCenterPos(val)
      this.$store.commit('LocateCurrentView', {type: 5, id: val, pos: pos})
    },
    /*
    * 获取管段中心
    * */
    getPipepartCenterPos: function (partIdArr) {
      let pipePartDetailData = this.iPipePartDetailData
      let iPipeDetailData = this.iPipeDetailData
      // 统计所有的管井id
      var pipeIds = []
      for (let partId of partIdArr) {
        for (let pipepart of pipePartDetailData) {
          if (partId === pipepart.id) {
            pipeIds = pipeIds.concat(pipepart.PointsPath)
          }
        }
      }
      var posCount = {
        x: 0,
        y: 0
      }
      // 获取所有坐标
      for (let pipeId of pipeIds) {
        for (let pipe of iPipeDetailData) {
          if (pipe.id === pipeId) {
            posCount.x += pipe.X
            posCount.y += pipe.Y
          }
        }
      }
      var pos = {}
      pos.x = posCount.x / pipeIds.length
      pos.y = posCount.y / pipeIds.length
      return pos
    },
    showCost() {
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
    btnSelect(obj) {
      switch (obj) {
        case 'A':
          this.btnSelectState = 'btnSelectActive1'
          break
        case 'B':
          this.btnSelectState = 'btnSelectActive2'
          break
        case 'C':
          this.btnSelectState = 'btnSelectActive3'
          break
        case 'D':
          this.btnSelectState = 'btnSelectActive4'
          break
        default :
          this.btnSelectState = 'btnSelectActive1'
      }
    },
    /**
     * 获取管段数据
     */
    getMeterData() {
      this.tdiData3 = this.getTdiData3()
      this.$post('/checkTheLine').then((res) => {
        this.tdiData2[0].des = res.contractNo
        this.tdiData2[1].des = res.contractAmount
        this.tdiData2[2].des = res.receivedAmount
        this.tdiData3[0].des = res.channelName
        this.tdiData3[1].des = res.material
        this.tdiData3[2].des = res.length
        this.tdiData3[3].des = res.plumberNum
        this.tdiData = res.sectionNoStatistics
        this.sectionTableData = this.tdiData
      })
    },
    /**
     * 获取管孔数据
     */
    getTubeHole() {
      this.tdiData3 = [
        {
          tit: '管孔名称',
          des: 'ZH01-02-01',
          cy: ''
        },
        {
          tit: '管段名称',
          des: '中环西路ZH管段',
          cy: ''
        },
        {
          tit: '管道材质',
          des: 'PVC',
          cy: ''
        },
        {
          tit: '管段长度',
          des: '2000',
          cy: 'm'
        }
      ]
      this.$post('/obtainingHoleData').then((res) => {
        this.tdiData2[0].des = res.contractNo
        this.tdiData2[1].des = res.contractAmount
        this.tdiData2[2].des = res.receivedAmount
        this.tdiData3[0].des = res.holeName
        this.tdiData3[1].des = res.sectionName
        this.tdiData3[2].des = res.material
        this.tdiData3[3].des = res.sectionLength
        this.tdiData = res.sectionNoStatistics
        this.sectionTableData = this.tdiData
      })
    },
    /**
     * 获取子管孔数据
     */
    getSonTubeHole() {
      this.tdiData3 = [
        {
          tit: '子管孔名称',
          des: 'ZH01-02-01-01',
          cy: ''
        },
        {
          tit: '管孔名称',
          des: 'ZH01-02-01',
          cy: ''
        },
        {
          tit: '管段名称',
          des: '中环西路ZH管段',
          cy: ''
        },
        {
          tit: '管道材质',
          des: 'PVC',
          cy: ''
        },
        {
          tit: '管段长度',
          des: '2000',
          cy: 'm'
        }
      ]
    },
    ...mapMutations(['chRightBoxTakeUp'])
  },
  computed: {
    ...mapGetters([
      'footExhPutCont',
      'footTitle',
      'iTabsIndex',
      'iTabsData',
      'currentListTitle',
      'iPipePartDetailData',
      'iPipeDetailData'
    ]),
    btnSelectActive() {
      return this.btnSelectState
    },
    ColorState() {
      return this.borderColor
    },
    contractTypeFn() {
      let type = ''
      //console.log(this.$route.query.type )
      if (this.$route.query.type) {
        type = this.$route.query.type
        type = type.toString()
      }
      if (type === '8') {
        return '查看合同详情'
      } else {
        return '查看合同列表'
      }
    }
  },
  watch: {
    '$route'() {
      this.chioseGet()
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
