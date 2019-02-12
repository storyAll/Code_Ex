<!-- 设备管理  管网  查看管井 -->
<template>
  <div class="device-wrapper">
    <right-box>
      <div class="data-statistics-head">
        <widget-tabs
          @handelClick="handelClickHeaderTab"
          :controllers="controllers"
          :btnGroupType="3"
          :btnGroupNormalColor="'#1F3B5B'"
          style="border-radius: 5px;overflow: hidden;border:1px solid rgba(255,255,255,0.2)"
          :tabsWidth="240"
        ></widget-tabs>
      </div>
      <transition name="animationFade" mode="out-in" appear>
        <!-- 设备详情 -->
        <div v-if="controllersIndex == 0" key="0" class="pannel-wrapper">
          <div class="pic-desc-btn">
            <div class="img">
              <img src="../../assets/images/207.png" alt="">
            </div>
            <div class="desc">
              <div class="title">{{list.deviceName}}</div>
              <div class="id">{{list.equipmentNo}}</div>
              <div class="address">{{list.subordinateSystem}}</div>
              <div class="address">{{list.FactoryAddress}}</div>
            </div>
            <div class="btn">
              <widget-tabs class="widget-tabs"
                style="border-radius: 5px;overflow: hidden"
                :controllers="['查看GIS']"
                :btnGroupType="2"
                :tabsWidth="240"
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
            :inspectiondata="maintenanceData"
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
import WidgetInspection from '../../components/tf-public/WidgetInspection'
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'ShowPipe',
  data () {
    return {
      deviceID: 0,
      controllers: ['设备详情', '维保记录'],
      controllersIndex: 0,
      detailData: {}, // 设备详情
      detailDataKey2Alias: { // 设备详情关联key名称
        'wellType': '井类型',
        'holeLength': '井底长',
        'bottomWidth': '井底宽',
        'bottomDeep': '井底深',
        'overSoil': '上覆土',
        'rightPerson': '产权人',
        'coverType': '井盖类型',
        'state': '状态',
        'constructionDate': '施工日期',
        'completionDate': '竣工日期'
      },
      maintenanceData: [], // 维保记录数据
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
    this.getEquipInfoData()
    this.getMiantenInfoData()
    this.deviceID = this.$route.query.deviceID
  },
  methods: {
    ...mapMutations(['chRightBoxTakeUp']),
    closeRightBox () {
      this.chRightBoxTakeUp(false)
    },
    handelClickHeaderTab (index) {
      this.controllersIndex = index
    },
    changeGISBIM(val){
      // this.$store.commit('updateIDeviceIndex', 3)
      // this.$store.commit('updateIViewModeIndex', 0)
      // let clickNode = {
      //   id: 1111,
      //   type: 3,
      //   time: new Date()
      // }
      // this.$store.commit('updateGlobalNodeClick', clickNode)
    },
    getEquipInfoData() {
      this.$post('/viewPipeWellInformationData',{equipmentOID: '1'})
        .then(res => {
          this.list = res
          console.log(this.list)
          console.log('查看管井信息数据')
          this.detailData = this.datause(this.list,
            'wellType', 'holeLength','bottomWidth','bottomDeep','overSoil','rightPerson',
            'coverType','state','constructionDate','completionDate')
          console.log(this.detailData +'你好')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMiantenInfoData() {
      this.$post('/equipmentMaintenanceInformationData',
        {equipmentOID: '1'}).then( res =>{
        this.maintenanceData = res
      }).catch( err =>{
        console.log(err)
      })
    }
  },
  components: {
    RightBox,
    TitleDesItem,
    CommonChart,
    WidgetTabs,
    WidgetKeyValue,
    NavButtonGroup,
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
          font-size: 14px;
          font-weight: bold;
          color: white;
        }
        .id {
          font-size: 11px;
          font-weight: normal;
          color: RGB(173, 204, 204);
        }
        .address {
          font-size: 12px;
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
      overflow-y: scroll;
      overflow-x: hidden;
    }
  }
.img img {
  width:100%;
  height:100%;
}
.widget-tabs{
  background: #1890FF;
  &:hover {
    background: #46a6ff;
  }
  &:active {
    background: #1373cc;
  }
}
</style>
