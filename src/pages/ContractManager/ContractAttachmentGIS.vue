// 合同详情 附件文档 管网路由   按钮查看GIS
<template>
  <div class="ContractAttachmentNetwork">
    <nav-button-group></nav-button-group>
    <right-box>
      <!-- 按钮切换 -->
      <div class="data-statistics-head">
        <widget-tabs
          @handelClick="handelClickHeaderTab"
          style="border-radius: 5px;overflow: hidden;border:1px solid rgba(255,255,255,0.2)"
          :controllers="controllers"
          :btnGroupNormalColor="'#1F3B5B'"
          :btnGroupType="3"
          :tabsWidth="240"
        ></widget-tabs>
      </div>
      <transition name="animationFade" mode="out-in" appear>
        <!-- 合同详情 -->
        <div v-if="controllersIndex == 0" key="0" class="pannel-wrapper">
          <div class="pic-desc-btn">
            <div class="desc">
              <div class="contract">{{list.contractName}}</div>
              <div class="address">
                合同编号<i>:</i>{{list.contractNo}}
              </div>
              <div class="address">
                承租方<i>:</i>{{list.lessee}}
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
                           @handelClick="showCost"
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
      controllers: ['合同详情', '附件文档'],
      controllersIndex: 0,
      networkMap: '厂房实景图',
      tdiData: [
        {
          tit: '合同总额',
          des: '',
          cy: '万元'
        },
        {
          tit: '已收金额',
          des: '',
          cy: '万元'
        },
        {
          tit: '代收金额',
          des: '',
          cy: '万元'
        }
      ],
      detailData: {},
      detailDataKey2Alias: {
        'area': '面积',
        'signtime': '签订时间',
        'signMan': '签订人',
        'contactNumber': '联系电话',
        'contractStartDate': '合同开始日期',
        'contractEndDate': '合同结束日期',
        'contractNumber': '合同天数',
        'contractFounder': '合同创始人'
      },
      PublicTabledata: [
        {
          documentname: '1号厂房承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        },
        {
          documentname: '1号厂房承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        },
        {
          documentname: '1号厂房承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        },
        {
          documentname: '1号厂房承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        },
        {
          documentname: '1号厂房承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        },
        {
          documentname: '1号厂房承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        },
        {
          documentname: '1号厂房承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        },
        {
          documentname: '1号厂房承租合同',
          type: 'PDF',
          operation: {
            event: {
              preview: '预览',
              download: '下载'
            }
          }
        }
      ],
      list: ''
    }
  },
  computed: {
    ...mapGetters(['leftBoxTakeUp', 'iTabsData', 'iTabsIndex', 'iDeviceIndex', 'iDeviceID', 'iViewModeIndex'])
  },
  created () {
    this.getData()
  },
  methods: {
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
    handelClickHeaderTab (index) {
      this.controllersIndex = index
    },
    changeGISBIM () {
      this.$store.commit('updateIDeviceIndex', 9)
      this.$store.commit('updateIViewModeIndex', 1 - this.iViewModeIndex)
    },
    getData () {
      this.$post('/checkTheBIMoftheplant',
        {contractOID: '1'}).then(res => {
        this.tdiData[0].des = res.totalAmount
        this.tdiData[1].des = res.receivedAmount
        this.tdiData[2].des = res.collectedAmount
        this.list = res
        this.detailData = this.datause(this.list,
          'area', 'signtime', 'signMan', 'contactNumber', 'contractStartDate', 'contractEndDate', 'contractNumber', 'contractFounder')
      }).catch(err => {
        console.log(err)
      })
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
      height: 135px;
      padding: 0 10px;
      .btn {
        height: 150 - @imgHeight;
        width: 100%;
        padding: 0px 0px;
        margin: -10px 0 0 0;
        display: flex;
        align-items: center;
        // justify-content: center;
        border-bottom: 1px solid RGBA(121, 121, 121, 0.8);
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
      width: 100%;
      margin: auto;
      min-height: 195px;
      max-height: 250px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .moneybtn {
      height: 125px;
      width: 300px;
      margin: auto;
      border-bottom: 1px solid RGBA(121, 121, 121, 0.8);
    }
    .workshopImg {
      width: 90%;
      height: 230px;
      margin: auto;
      .Img {
        width: 100%;
        height: 160px;
        img {
          width: 100%;
          height: 100%;
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
      width: 100%;
      // min-height:185px;
      max-height: 260px;
      // margin:auto;
      overflow-y: scroll;
    }
    .networkrouting {
      width: 100%;
      margin: auto;
      height: 400px;
      overflow: auto;
    }
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
