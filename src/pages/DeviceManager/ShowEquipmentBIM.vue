// 设备管理  1号厂房  设备级可切换button  按钮为查看GIS   BBIM053接口
<template>
  <div class="device-wrapper">
    <!--<nav-button-group></nav-button-group>-->
    <right-box>
      <div class="data-statistics-head">
        <widget-tabs
          @handelClick="handelClickHeaderTab"
          :controllers="controllers"
          :tabsWidth="240"
          :btnGroupType="3"
          :btnGroupNormalColor="'#1F3B5B'"
          style="border-radius: 5px;overflow: hidden;border:1px solid rgba(255,255,255,0.2)"
        ></widget-tabs>
      </div>
      <transition name="animationFade" mode="out-in" appear>
        <!-- 设备信息 -->
        <div v-if="controllersIndex == 0" key="0" class="pannel-wrapper">
          <div class="pic-desc-btn">
            <div class="img">
              <img src="../../assets/images/207.png" alt="">
            </div>
            <div class="desc">
              <div class="title">{{this.list.deviceName}}</div>
              <div class="id">{{this.list.equipmentNo}}</div>
              <div class="address">{{this.list.subordinateSystem}}</div>
              <div class="address">{{this.list.subordinateFactories}}</div>
            </div>
            <div class="btn">
              <widget-tabs
                style="border-radius: 5px;overflow: hidden"
                :controllers="[iViewModeIndex === 0 ?'查看GIS' : '查看BIM']"
                :btnGroupType="2"
                :tabsWidth="240"
                :btnGroupNormalColor="'#1890FF'"
                @handelClick="changeGISBIM"
              ></widget-tabs>
            </div>
          </div>
          <widget-key-value
            :keyValueData="detailData"
            :keyAliasMap="detailDataKey2Alias"
          ></widget-key-value>
        </div>
        <!-- 维保记录 -->
        <div v-else-if="controllersIndex == 1" key="1" class="pannel-wrapper">
          <widget-inspection
            :inspectiondata="MaindataList"
          ></widget-inspection>
        </div>
      </transition>
    </right-box>
  </div>
</template>

<script>
import NavButtonGroup from '@/components/tf-banner/NavButtonGroup.vue'
import TitleDesItem from '@/components/tf-public/TitleDesItem.vue'
import RightBox from '@/components/tf-right-detail/RightBox.vue'
import CommonChart from '@/components/tf-public/tf-charts/CommonChart.vue'
import WidgetTabs from '@/components/tf-public/WidgetTabs'
import WidgetKeyValue from '@/components/tf-public/WidgetKeyValue'
import NameDesesList from '@/components/tf-public/NameDesesList.vue'
import WidgetInspection from '../../components/tf-public/WidgetInspection'
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'ShowEquipmentBIM',
  data () {
    return {
      deviceID: 0,
      controllersIndex: 0,
      controllers: ['设备详情', '维保记录'],
      detailData: {}, // 设备详情
      MaindataList: {}, // 维保记录数据
      detailDataKey2Alias: { // 设备详情关联key名称
        'productionDate': '生产日期',
        'specifications': '规格',
        'model': '型号',
        'manufacturers': '制造商',
        'purchaseOrderNo': '采购单号',
        'creatTime': '创建时间',
        'founder': '创建人',
        'purchaseDate': '采购日期',
        'purchasePrice': '采购价格',
        'inboundDate': '入库日期'
      },
      list: ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.deviceID = this.$route.query.deviceID
    }
  },
  computed: {
    ...mapGetters(['leftBoxTakeUp', 'iTabsData', 'iTabsIndex', 'iDeviceIndex', 'iDeviceID', 'iViewModeIndex'])
  },
  created () {
    this.getEquipData()
    this.getMaintenData()
    console.log('ShowEquipmentBIM=>created')
    this.deviceID = this.$route.query.deviceID
  },
  beforeDestroy () {

  },
  methods: {
    ...mapMutations(['chRightBoxTakeUp']),
    closeRightBox () {
      this.chRightBoxTakeUp(false)
    },
    handelClickHeaderTab (index) {
      this.controllersIndex = index
    },
    changeGISBIM(){
      this.$store.commit('updateIViewModeIndex', 1 - this.iViewModeIndex)
    },
    getEquipData() {
      console.log(this.$route.query.id)
      this.$post('/equipmentDetails',
        {workshopOID: '6575270'})
        .then(res => {
          this.list = res
          console.log('设备详情  查看GIS')
          this.detailData = this.datause(this.list,
            'productionDate', 'specifications','model','manufacturers','purchaseOrderNo','creatTime','founder','purchaseDate','purchasePrice','inboundDate')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMaintenData() { // 维保信息数据
      this.$post('/equipmentMaintenanceInformationData',
        {equipmentOID: '1'}).then( data => {
        this.MaindataList = data
        console.log('维保记录数据'+this.MaindataList)
        this.iViewModeIndex = 1
      }).catch((err) => {
        console.log(err)
      })
    },
    getDataList1 () {
      return [
        {
          name: '设备名称',
          des: '1号电梯'
        },
        {
          name: '工单名称',
          des: '牵引机油杯液位检查'
        },
        {
          name: '工单类型',
          des: '报事报修'
        },
        {
          name: '工单状态',
          des: '已完成'
        },
        {
          name: '开始时间',
          des: '2018-08-20 9:00'
        },
        {
          name: '结束时间',
          des: '2018-08-20 11:00'
        },
        {
          name: '工单描述',
          des: '牵引机油杯液位正常，但距离警戒值较近，添加50ml润滑油'
        },
        {
          name: '现场图片',
          des: `<img src="${require('../../assets/images/common/206.png')}" alt="" style="width: 50px;height: 46px;">
          <img src="${require('../../assets/images/common/206.png')}" alt="" style="width: 50px;height: 46px;">
          <img src="${require('../../assets/images/common/206.png')}" alt="" style="width: 50px;height: 46px;">
          <img src="${require('../../assets/images/common/206.png')}" alt="" style="width: 50px;height: 46px;">`
        }
      ]
    }
  },
  components: {
    RightBox,
    TitleDesItem,
    CommonChart,
    WidgetTabs,
    WidgetKeyValue,
    NavButtonGroup,
    NameDesesList,
    WidgetInspection
  }
}
</script>

<style scoped lang="less">
  @imgHeight: 100px;
  .device-wrapper {
    .pic-desc-btn {
      width: @tfAsideRightWidth;
      height: 170px;
      padding: 0 15px;
      border-bottom: white;
      border-bottom: 2px red;
      .img {
        display: inline-flex;
        width: 145px;
        height: @imgHeight;
        border-width: 3px;
        border-color: RGB(17, 34, 57);
        background-color: RGB(17, 34, 57);
      }
      .desc {
        display: inline-block;
        overflow: hidden;
        width: 145px;
        height: @imgHeight;
        background-color: RGBA(17, 34, 57, 0.0);
        padding-left: 5px;
        .title {
          font-size: 16px;
          font-weight: bold;
          color: white;
        }
        .id {
          font-size: 11px;
          font-weight: normal;
          color: RGB(173, 204, 204);
        }
        .address {
          font-size: 13px;
          font-weight: normal;
          color: white;
        }
      }
      .btn {
        height: 170 - @imgHeight;
        width: @tfAsideRightWidth;
        padding: 0px 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid RGBA(121, 121, 121, 0.8);
      }
    }
    .data-statistics-head {
      height: 60px;
      padding: 5px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pannel-wrapper {
      overflow: hidden;
    }
    .widget-block-list {
      height: 460px;
      overflow: scroll;
      overflow-x: hidden;
    }
  }
.img img {
  width:100%;
  height:100%;
}
.controllersbtn {
  margin-top:60px;
  .widget-tabs {
    color: #fff;
  }
}
</style>
