<!--合同管理 -- 合同列表  ####王震-->
<template>
  <div>
    <ContractListFilterItem/>
    <BaseTable :tableData="tableData" :tableHeads="tableHeads"/>
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable.vue'
import ContractListFilterItem from '@/components/ContractListFilterItem'
export default {
  name: 'ContractList',
  components: {
    BaseTable,
    ContractListFilterItem
  },
  data: function () {
    return {
      tableData: [{
        contracName: '灵魂契约',
        projectPosition: '第七便利店',
        contracObject: '赵雷',
        dayNumber: '196',
        contracNumber: '6221444022',
        beginTime: '2018-12-12',
        endTime: '2019-12-12',
        tenantNumber: '1500亩',
        amountTotal: '176亿',
        founder: '刘天',
        operation: '查看bim'
      },{
        contracName: '灵魂契约',
        projectPosition: '第七便利店',
        contracObject: '赵雷',
        dayNumber: '196',
        contracNumber: '6221444022',
        beginTime: '2018-12-12',
        endTime: '2019-12-12',
        tenantNumber: '1500亩',
        amountTotal: '176亿',
        founder: '刘天',
        operation: '查看bim'
      },{
        contracName: '灵魂契约',
        projectPosition: '第七便利店',
        contracObject: '赵雷',
        dayNumber: '196',
        contracNumber: '6221444022',
        beginTime: '2018-12-12',
        endTime: '2019-12-12',
        tenantNumber: '1500亩',
        amountTotal: '176亿',
        founder: '刘天',
        operation: '查看bim'
      }],
      tableHeads: {
        contracName: '合同名称',
        projectPosition: '项目地址',
        contracObject: '承租人/公司',
        dayNumber: '剩余天数',
        contracNumber: '合同编号',
        beginTime: '起始时间',
        endTime: '结束时间',
        tenantNumber: '承租量',
        amountTotal: '总金额',
        founder: '创始人',
        operation: '操作'
      }
    }
  }
}
</script>

<style scoped lang="less">
  .ruler{
    width: 100px;
  }
</style>
<!--<template>-->
  <!--<div id="contractList">-->
    <!--&lt;!&ndash; 查询搜索框 &ndash;&gt;-->
    <!--<div class="searchAndReset">-->
      <!--<label>合同名称：</label>-->
      <!--<input type="text" v-model="contracName" placeholder="合同名称">-->
      <!--<label>合同编号：</label>-->
      <!--<input type="text" v-model="contracNumber" placeholder="合同编号">-->
      <!--<label>承租人/公司：</label>-->
      <!--<input type="text" v-model="contracObject" placeholder="承租人/公司">-->
      <!--&lt;!&ndash;时间选择器&ndash;&gt;-->
      <!--<input type="text" v-model="enTime" placeholder="起始时间">-->
      <!--<span style="color:#fff;">至</span>-->
      <!--<input type="text" v-model="ouTime" placeholder="结束时间">-->
      <!--<button class="confirm" @click="confirmbtnClick">确定</button>-->
      <!--<button class="reset" @click="resetbtnClick">重置</button>-->
    <!--</div>-->
    <!--&lt;!&ndash; 列表 &ndash;&gt;-->
    <!--<table class="parkingsheet">-->
      <!--<tr class="oddColor">-->
        <!--<th>合同名称</th>-->
        <!--<th>项目位置</th>-->
        <!--<th>承租人/公司</th>-->
        <!--<th>剩余天数</th>-->
        <!--<th>合同编号</th>-->
        <!--<th>起始时间</th>-->
        <!--<th>终止时间</th>-->
        <!--<th>承租量</th>-->
        <!--<th>总金额</th>-->
        <!--<th>创建人</th>-->
        <!--<th>操作</th>-->
      <!--</tr>-->
      <!--<tr v-for="(item, key) in list" :class="{'oddColor':key%2 != 0}">-->
        <!--<td>{{item.province}}</td>-->
        <!--<td>{{item.projectName}}</td>-->
        <!--<td>{{item.Building}}</td>-->
        <!--<td>{{item.floor}}</td>-->
        <!--<td>{{item.parking}}</td>-->
        <!--<td>{{item.resourceCategory}}</td>-->
        <!--<td>{{item.resourceTepy}}</td>-->
        <!--<td>{{item.roomUse}}</td>-->
        <!--<td>{{item.roomArea}}m²</td>-->
        <!--<td><a href="#" class="positioning">定位</a></td>-->
      <!--</tr>-->
    <!--</table>-->
    <!--&lt;!&ndash;<PageNumber :total="list.length" :currentPage='current' @pagechange="pagechange"></PageNumber>&ndash;&gt;-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--//import PageNumber from '@/components/bim-list/PageNumber'//注册分页组件-->
<!--// export default {-->
<!--//   //name: 'ContractList',-->
<!--//   data() {-->
<!--//     return {-->
<!--//       // 初始数据-->
<!--//       // contracName: "合同编号",-->
<!--//       // contracNumber:"2",-->
<!--//       // contracObject:"",-->
<!--//       // perNum:"",-->
<!--//       // perName:"",-->
<!--//       // enTime:"",-->
<!--//       // ouTime:"",-->
<!--//       // list: [],-->
<!--//       // current:1,-->
<!--//     }-->
<!--//   },-->
<!--//   created(){-->
<!--//     this.getEntranceGuardData()//获取服务器数据-->
<!--//   },-->
<!--//   components:{-->
<!--//     //PageNumber//引入分页组件-->
<!--//   },-->
<!--//   methods: {-->
<!--//     getNumberForParent(key){-->
<!--//     },-->
<!--//     // 分页组件变更触发方法-->
<!--//     pagechange:function(currentPage){-->
<!--//       // 向后台发送 currentPage, 来获取对应的数据-->
<!--//     },-->
<!--//     // 获取服务器数据方法-->
<!--//     getEntranceGuardData(){-->
<!--//       //原mock数据accessControlRecord-->
<!--//       //新接口：/entranceGuard/getEntranceGuard.rest-->
<!--//       this.$post('/entranceGuard/getEntranceGuard.rest',{equipmentType:111,pageNO:1,pageCount:10})-->
<!--//         .then((res)=>{-->
<!--//           this.list=res;-->
<!--//         })-->
<!--//         .catch((err)=>{-->
<!--//-->
<!--//         })-->
<!--//     },-->
<!--//     //确定按钮-->
<!--//     confirmbtnClick(){-->
<!--//       var confirm = document.querySelector(".confirm");-->
<!--//       var reset = document.querySelector(".reset");-->
<!--//       confirm.style.background = "#66b1ff";-->
<!--//       confirm.style.borderColor = "#66b1ff";-->
<!--//       reset.style.color = "#606266";-->
<!--//     },-->
<!--//     // 重置按钮按下-->
<!--//     resetbtnClick(){-->
<!--//       var confirm = document.querySelector(".confirm");-->
<!--//       var reset = document.querySelector(".reset");-->
<!--//       confirm.style.background = "#409EFF";-->
<!--//       confirm.style.borderColor = "#409EFF";-->
<!--//       reset.style.color = "#409EFF";-->
<!--//       // 重置-->
<!--//       this.contracName = "";-->
<!--//       this.contracNumber = "";-->
<!--//       this.contracObject = "";-->
<!--//       this.carStatus = "";-->
<!--//       this.enTime = "";-->
<!--//       this.ouTime = "";-->
<!--//     }-->
<!--//   },-->
<!--//   computed: {-->
<!--//-->
<!--//   },-->
<!--//   mounted() {-->
<!--//-->
<!--//   }-->
<!--// };-->
<!--</script>-->

<!--<style scoped>-->
  <!--*{-->
    <!--padding: 0;-->
    <!--margin: 0;-->
    <!--font-size: 14px;-->
    <!--font-family: "微软雅黑";-->
  <!--}-->
  <!--#entranceGuard{-->
    <!--width: 100%;-->
    <!--height: auto;-->
    <!--padding: 2px 10px;-->
  <!--}-->
  <!--.searchAndReset{-->
    <!--margin: 12px;-->
  <!--}-->
  <!--.searchAndReset label{-->
    <!--color: #fff;-->
  <!--}-->
  <!--.searchAndReset input{-->
    <!--border-style: none;-->
    <!--padding: 2px 0;-->
    <!--width:100px;-->
  <!--}-->
  <!--.searchAndReset .confirm,.searchAndReset .reset{-->
    <!--color: #fff;-->
    <!--background: #169BD5;-->
    <!--border-radius: 4px;-->
    <!--border-style: none;-->
    <!--width: 45px;-->
    <!--height: 24px;-->
  <!--}-->

  <!--.parkingname{-->
    <!--font-size: 20px;-->
    <!--color: #fff;-->
    <!--padding: 10px 0;-->
  <!--}-->
  <!--.parkingname span{-->
    <!--font-size: 20px;-->
    <!--border-bottom: 3px #169BD5 solid;-->
    <!--padding: 9px 0;-->
  <!--}-->
  <!--.parkingsheet{-->
    <!--width: 100%;-->
    <!--height: auto;-->
    <!--color: #fff;-->
    <!--margin-bottom: 10px;-->
  <!--}-->

  <!--.parkingsheet tr th,.parkingsheet tr td{-->
    <!--/*width: 10%;*/-->
    <!--padding: 5px 10px;-->
    <!--text-align: left;-->
    <!--color: #fff;-->
  <!--}-->
  <!--hr{-->
    <!--height:1px;-->
    <!--border:none;-->
    <!--border-top:1px solid #797979;-->
    <!--margin-bottom: 15px;-->
  <!--}-->
  <!--.PatrolSite {-->
    <!--background: rgba(25, 52, 82, 0.94);-->
  <!--}-->
  <!--.oddColor{-->
    <!--background:rgba(0,0,0,0.08);-->
  <!--}-->
  <!--.searchAndReset select {-->
    <!--height: 32px;-->
    <!--border-radius: 4px;-->
    <!--border: 1px solid rgba(217,217,217,1);-->
  <!--}-->
  <!--.searchAndReset input {-->
    <!--height: 28px;-->
    <!--border-radius: 4px;-->
    <!--border: 1px solid rgba(217,217,217,1);-->
  <!--}-->
  <!--.searchAndReset .confirm {-->
    <!--color: #fff;-->
    <!--background: #169BD5;-->
    <!--border-radius: 4px;-->
    <!--border-style: none;-->
    <!--width: 45px;-->
    <!--height: 32px;-->
  <!--}-->
  <!--.searchAndReset .reset {-->
    <!--color: #666;-->
    <!--background: #fff;-->
    <!--border-radius: 4px;-->
    <!--border-style: none;-->
    <!--width: 45px;-->
    <!--height: 32px;-->
  <!--}-->
<!--</style>-->
