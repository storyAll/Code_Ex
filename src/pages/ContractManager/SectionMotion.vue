<!--断面示意图-->
<template>
  <div class="contract-list-stic">
    <right-box>
      <div class="data-statistics-head">
        断面示意图
        <i class="green circle"></i><label>&lt;20%</label>
        <i class="red circle"></i><label>80%</label>
        <i class="yellow circle"></i><label>20%-80%</label>
        <!--<i class="el-icon-d-arrow-right" @click="closeRightBox"></i>-->
      </div>
      <!--断面图表-->
      <section-table :tdiData="tdiData"></section-table>
      <!--分割线-->
      <hr class="cut">
      <!--合同信息-->
      <title-des-item :tdiData="tdiData2"></title-des-item>
      <!--按钮组-->
      <el-row class="btn-group">
        <el-button type="primary" size="small">查看合同列表</el-button>
        <el-button type="primary" size="small">查看费用列表</el-button>
      </el-row>
      <!--分割线-->
      <hr class="cut">
      <InfoList :tdiData="tdiData3"></InfoList>
    </right-box>
  </div>
</template>

<script>
import RightBox from '@/components/tf-right-detail/RightBox.vue'//面板组件
import SectionTable from '@/components/tf-public/SectionTable.vue'
import TitleDesItem from '@/components/tf-public/TitleDesItem.vue'//列表信息组件
import { mapMutations } from 'vuex'
import InfoList from '@/components/tf-public/InfoList.vue'
//状态管理工具

export default {
  name: 'SectionMotion',
  data () {
    return {
      tdiData: [
        {
          id: 3,
          percent: 10,
          color: 'red'
        },
        {
          id: 4,
          percent: 15,
          color: 'red'
        },
        {
          id: 3,
          percent: 10,
          color: 'red'
        },{
          id: 4,
          percent: 10,
          color: 'red'
        },
        {
          id: 3,
          percent: 10,
          color: 'yellow'
        },
        {
          id: 4,
          percent: 10,
          color: 'yellow'
        },
        {
          id: 3,
          percent: 10,
          color: 'yellow'
        },{
          id: 3,
          percent: 10,
          color: 'yellow'
        },
        {
          id: 5,
          percent: 10,
          color: 'green'
        },
        {
          id: 5,
          percent: 10,
          color: 'green'
        },
        {
          id: 5,
          percent: 10,
          color: 'green'
        },{
          id: 5,
          percent: 10,
          color: 'green'
        }
      ],
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
      ],
      chartOption: {},
      chartOption2: {}
    }
  },
  methods: {
    //隐藏右侧面板
    closeRightBox (){
      this.chRightBoxTakeUp(false)
    },
    ...mapMutations(['chRightBoxTakeUp'])
  },
  components: {
    InfoList,
    SectionTable,
    RightBox,
    TitleDesItem
  }
}
</script>

<style scoped>
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
  .circle {
    width: 10px;
    height: 10px;
    border-radius: 5px;
  }
  .green {
    background: #08f86d;
  }
  .red {
    background: #ff0000;
  }
  .yellow {
    background: #ffff00;
  }
  .cut {
    width: 90%;
    border-bottom: 1px solid
  }
  .btn-group {
    margin:20px 0;
    text-align: center;
  }
</style>
