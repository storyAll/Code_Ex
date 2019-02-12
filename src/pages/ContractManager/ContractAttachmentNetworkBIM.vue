//合同管理   合同详情 附件文档 管网路由 按钮查看GIS
<template>
  <div class="ContractAttachmentNetwork">
    <nav-button-group></nav-button-group>
    <right-box>
      <!-- 按钮切换 -->
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
        <!-- 合同详情 -->
        <div v-if="controllersIndex == 0" key="0" class="pannel-wrapper">
          <div class="pic-desc-btn">
            <div class="desc">
              <div class="contract">施洛特园区通信管网合同</div>
              <div class="address">
                合同编号<i>:</i>TFKJ-20180620
              </div>
              <div class="address">
                承租方<i>:</i>移动通信
              </div>
            </div>
            <div class="btn">
              <widget-tabs class="widget-tabs"
                style="border-radius: 5px;overflow: hidden;margin-left:15px;"
                :controllers="[iViewModeIndex === 0 ?'查看GIS' : '查看BIM']"
                :btnGroupType="2"
                :tabsWidth="260"
                @handelClick="changeGISBIM"
              ></widget-tabs>
            </div>
          </div>
          <div class="moneybtn">
            <title-des-item :tdiData="tdiData"></title-des-item>
            <div class="btn">
              <widget-tabs class="widget-tabs"
                style="border-radius: 5px;overflow: hidden;margin:auto;margin-top:5px;"
                :controllers="['查看费用列表']"
                :btnGroupType="2"
                :tabsWidth="130"
              ></widget-tabs>
            </div>
          </div>
          <div class="widgetkeylist">
            <widget-key-value
            :keyValueData="detailData"
            :keyAliasMap="detailDataKey2Alias"
            ></widget-key-value>
          </div>
        </div>
        <!-- 附件文档 -->
        <div v-else-if="controllersIndex == 1" key="1" class="pannel-wrapper">
          <div class="workshopImg">
            <div class="Img">
              <img src="../../assets/images/fjwdImg.png">
            </div>
            <div class="imgfont">{{networkMap}}</div>
          </div>
          <div class="workshoptable">
            <Contract-Public-Table :PublicTabledata="PublicTabledata"></Contract-Public-Table>
          </div>
        </div>
        <!-- 管网路由 -->
        <div v-else-if="controllersIndex == 2" key="2" class="pannel-wrapper">
          <div class="desc">
            <div class="contract">01-06</div>
            <div class="address">
              管孔数<i>:</i>2
            </div>
            <div class="address">
              管孔编号<i>:</i>tfkj-100010
            </div>
          </div>
          <div class="networkrouting">
            <Network-Routing-Line :netroutingdata="netroutingdata"></Network-Routing-Line>
          </div>
        </div>
      </transition>
    </right-box>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import NavButtonGroup from '@/components/tf-banner/NavButtonGroup.vue'
import RightBox from '@/components/tf-right-detail/RightBox.vue'
import WidgetTabs from '@/components/tf-public/WidgetTabs'
import WidgetKeyValue from '@/components/tf-public/WidgetKeyValue'
import TitleDesItem from '@/components/tf-public/TitleDesItem.vue'
import ContractPublicTable from '@/components/tf-public/ContractPublicTable.vue'
import NetworkRoutingLine from '@/components/tf-public/NetworkRoutingLine'

export default {
  name: 'ContractAttachmentNetwork',
  data () {
    return {
      deviceID: 0,
      controllers: ['合同详情', '附件文档', '管网路由'],
      controllersIndex: 0,
      networkMap: '管网实景图',
      tdiData: [
        {
          tit: '合同总额',
          des: '220',
          cy: '万元'
        },
        {
          tit: '已收金额',
          des: '120',
          cy: '万元'
        },
        {
          tit: '代收金额',
          des: '100',
          cy: '万元'
        }
      ],
      detailData: {
        id: 0,
        name: '1800m',
        area: '2',
        holder: '2018-07-20',
        tenantry: '李志金',
        industry: '158888888',
        startTime: '2018-07-20',
        endTime: '2018-07-20',
        daynumber: '2018-07-20',
        founder: '小明'
      },
      detailDataKey2Alias: {
        'name': '管网长',
        'area': '管孔数',
        'holder': '签订时间',
        'tenantry': '签订人',
        'industry': '联系电话',
        'startTime': '合同开始日期',
        'endTime': '合同结束日期',
        'daynumber': '合同天数',
        'founder': '合同创始人'
      },
      PublicTabledata: [
        {
          documentname: '管网承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        },
        {
          documentname: '管网承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        },
        {
          documentname: '管网承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        },
        {
          documentname: '管网承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        },
        {
          documentname: '管网承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        },
        {
          documentname: '管网承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        },
        {
          documentname: '管网承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        },
        {
          documentname: '管网承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        }
      ],
      netroutingdata: [
        {
          name: '01管井',
          title: 'tfkj-100011'
        },
        {
          name: '02管井',
          title: 'tfkj-100012'
        },
        {
          name: '03管井',
          title: 'tfkj-100013'
        },
        {
          name: '04管井',
          title: 'tfkj-100014'
        },
        {
          name: '05管井',
          title: 'tfkj-100015'
        },
        {
          name: '06管井',
          title: 'tfkj-100016'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['leftBoxTakeUp', 'iTabsData', 'iTabsIndex', 'iDeviceIndex', 'iDeviceID', 'iViewModeIndex'])
  },
  methods: {
    handelClickHeaderTab(index) {
      this.controllersIndex = index
    },
    changeGISBIM(){
      this.$store.commit('updateIViewModeIndex', 1 - this.iViewModeIndex)
    }
  },
  components: {
    NavButtonGroup,
    RightBox,
    WidgetTabs,
    WidgetKeyValue,
    TitleDesItem,
    ContractPublicTable,
    NetworkRoutingLine
  }
}
</script>

<style scoped lang="less">
@imgHeight: 100px;
.ContractAttachmentNetwork {
  .data-statistics-head {
    height: 60px;
    padding: 5px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pic-desc-btn {
    width: @tfAsideRightWidth;
    height: 145px;
    padding: 0 10px;
    .btn {
      height: 160 - @imgHeight;
      width: 100%;
      padding: 0px 0px;
      margin:-10px 0 0 0;
      display: flex;
      align-items: center;
      // justify-content: center;
      border-bottom: 1px solid RGBA(121, 121, 121, 0.8);
      &:hover {
        color:#46a6ff;
      }
      &:active {
        color:#1373cc;
      }
    }
  }
  .desc {
    display: block;
    width: 90%;
    padding-left: 25px;
    padding-bottom: 10px;
    // background-color: RGBA(17, 34, 57, 0.0);
    .contract {
      font-size: 16px;
      font-weight: 600;
      color: white;
    }
    .address {
      font-size: 14px;
      font-weight: 500;
      color: white;
      padding: 4px 0;
      i {
        padding: 0 5px;
      }
    }
  }
  .widgetkeylist {
    width:100%;
    margin:auto;
    // height:233px;
    overflow: auto;
  }
  .moneybtn {
    height:125px;
    width:300px;
    margin:auto;
    border-bottom: 1px solid RGBA(121, 121, 121, 0.8);
  }
  .workshopImg {
    width:90%;
    height:230px;
    margin:auto;
    .Img {
      width:100%;
      height:160px;
      img {
        width:100%;height:100%;
      }
    }
    .imgfont {
      font-size: 15px;
      text-align: center;
      height: 70px;
      line-height: 70px;
    }
  }
  .workshoptable {
    width:100%;
    height:300px;
    margin:auto;
    overflow-y: auto;
  }
  .networkrouting {
    width:100%;
    margin:auto;
    height:400px;
    overflow: auto;
  }
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
