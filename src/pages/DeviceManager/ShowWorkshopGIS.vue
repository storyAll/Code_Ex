// 设备管理  天宝建设  1号厂房   按钮为查看BIM
<template>
  <div class="device-wrapper">
    <!--查看厂房BIM-->
    <!--<nav-button-group></nav-button-group>-->
    <right-box>
      <div class="data-statistics-head">
        <widget-tabs
          :controllers="['厂房信息']"
          :tabsWidth="55"
          :btnGroupNormalColor="this.commonBg"
        ></widget-tabs>
        <!--<i class="el-icon-d-arrow-right" @click="closeRightBox"-->
           <!--style="color: white;font-size: 16px;display: inline-block;height:30px;position: absolute;right:10px;top:10px;cursor: pointer"></i>-->
      </div>
      <div class="pic-desc-btn" style="margin-top: 20px">
        <div class="img">
          <img src="../../assets/images/206.png" alt="">
        </div>
        <div class="desc">
          <div class="title">{{this.list.factoryName}}</div>
          <div class="id">{{this.list.factoryNumber}}</div>
          <div class="address">{{this.list.factoryAddress}}</div>
        </div>
        <div class="btn">
          <widget-tabs class="widget-tabs"
                       style="border-radius: 5px;overflow: hidden"
                       :controllers="[iViewModeIndex === 0 ?'查看GIS' : '查看BIM']"
                       :btnGroupType="2"
                       :tabsWidth="240"
                       :btnGroupNormalColor="'#1890FF'"
                       @handelClick="changeGISBIM"
          ></widget-tabs>
        </div>
      </div>
      <div class="titledesitem">
        <title-des-item :tdiData="tdiData"></title-des-item>
      </div>
      <widget-key-value
        :keyValueData="detailData"
        :keyAliasMap="detailDataKey2Alias"
      ></widget-key-value>
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
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'ShowWorkshopGIS',
  data () {
    return {
      deviceID: 0,
      tdiData: [
        {
          tit: '设备总数',
          des: '',
          cy: '个'
        },
        {
          tit: '故障设备',
          des: '',
          cy: '公里'
        }
      ],
      detailData: {},
      detailDataKey2Alias: {
        'factoryName': '厂房名称',
        'area': '面积',
        'propertyPerson': '产权人',
        'lessee': '承租方',
        'industry': '制造业',
        'constructionTime': '施工时间',
        'completionTime': '竣工时间'
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
    this.getData()
    this.deviceID = this.$route.query.deviceID
  },
  methods: {
    ...mapMutations(['chRightBoxTakeUp']),
    closeRightBox () {
      this.chRightBoxTakeUp(false)
    },
    changeGISBIM () {
      this.$store.commit('updateIViewModeIndex', 1 - this.iViewModeIndex)
    },
    getData() {
      console.log(this.$route.query.id)
      this.$post('/plantInformationData',
        {workshopOID: 'wb_0'})
        .then(res => {
          this.list = res
          this.tdiData[0].des = res.totaldevices
          this.tdiData[1].des = res.faultEquipment
          console.log('厂房信息组件输出数据')
          this.detailData = this.datause(this.list, 'factoryName', 'area','propertyPerson','lessee','industry','constructionTime','completionTime')
          console.log(this.detailData)
        })
        .catch(err => {
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
    NavButtonGroup
  }
}
</script>

<style scoped lang="less">
  @imgHeight: 100px;
  .device-wrapper {
    .data-statistics-head {
      color: white;
      display: flex;
      padding: 10px 16px 0 20px;
      justify-content: space-between;
      align-items: center;
      .el-icon-d-arrow-right {
        cursor: pointer;
      }
    }
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
    .titledesitem {
      padding: 10px 0 0;
    }
    .workShowDetail {
      margin-top: 10px;
    }
    .workShowDetail > div {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 10px;
      color: white;
      height: 30px;
      overflow: hidden;
      .label {
        flex: 1;
        font-size: 14px;
        font-weight: 400;
        text-align: right;
        padding-right: 30px;
      }
      .content {
        flex: 2;
        text-align: center;
      }
    }
  }

  .img img {
    width: 100%;
    height: 100%;
  }

  .widget-tabs {
    background: #1890FF;
    &:hover {
      background: #46a6ff;
    }
    &:active {
      background: #1373cc;
    }
  }
</style>
