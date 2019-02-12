<template>
  <div class="header">
    <div class="logo">
      <!--<img :src="logoUrl" style="width: 200px;" alt="">-->
      <embed src="logo_left_top_tianbao.svg" style="width: 300px;">
    </div>
    <div class="tabs-wrapper">
      <el-tabs class="tabs" v-model="tabActive" @tab-click="handleClick">
        <el-tab-pane v-for='(item,index) in tabs' :key="index" :label="item.value" :name="index + ''"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="tools-wrapper">
      <ul class="tools">
        <li><img :src="searchUrl" alt=""></li>
        <li><img @click="showMessageList" :src="alertUrl" alt=""><i :class="unreadRecord>99?'boldStyle':''"
                                                                    class="unread-record">{{unreadRecord > 99 ? '···' : unreadRecord}}</i>
        </li>
        <li><img :src="userUrl" alt=""></li>
      </ul>
    </div>

  </div>
</template>

<script>
import logo from '@/assets/images/logo_left_top.png'
import search from '@/assets/images/icons/Icon_nav_search.png'
import alert from '@/assets/images/icons/icon_nav_message.png'
import user from '@/assets/images/icons/icon_login_user.png'
import WidgetTabs from '@/components/tf-public/WidgetTabs'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'HeadItem',
  data () {
    return {
      tabActive: this.tabIndex + '',
      logoUrl: logo,
      searchUrl: search,
      alertUrl: alert,
      userUrl: user,
      unreadRecord: 99
    }
  },
  props: {
    tabs: {
      required: true,
      type: Array,
      default: function () {
        return []
      }
    },
    tabIndex: {
      required: true,
      type: Number,
      default: function () {
        return 0
      }
    }
  },
  watch: {
    'tabIndex': function (val) {
      console.log('watch tabIndex=>', val)
      this.tabActive = val + ''
    }
  },
  components: {
    WidgetTabs
  },
  created () {
  },
  mounted () {
  },
  methods: {
    handleClick: function (e) {
      var index = e.index
      this.$emit('changeItem', index)
    },
    showMessageList: function () {
      this.updateAlertListStatus(!this.alertListStatus)
      if (this.alertListStatus) {
        this.chfootExhPutCont(false)
      }
    },
    ...mapMutations([
      'updateAlertListStatus',
      'chfootExhPutCont'
    ])
  },
  computed: {
    ...mapGetters([
      'alertListStatus'
    ])
  }
}
</script>

<style scoped lang="less">
  @bannerHeight: 64px;
  .header {
    /*background: linear-gradient(RGBA(0, 0, 0, 0.2), RGBA(0, 0, 0, 0.2));*/
    background-color: rgba(25, 52, 82, 0.91);
    .comFixed();
    min-width: 1440px;
    width: 100%;
    height: @bannerHeight;
    padding: 0 0;
    margin: 0 0;
    font-size: 14px;
    overflow: hidden;
    .logo {
      display: inline-flex;
      height: @bannerHeight;
      overflow: hidden;
      padding-left: 12px;
      align-items: center;
      vertical-align: top;
    }
    .tabs-wrapper {
      vertical-align: top;
      display: inline-block;
      min-width: @minWidth - 204 - 150 -200;
      width: @minWidth - 204 - 150 - 200;
      height: @bannerHeight;
      .tabs {
        margin: 0 0;
        margin: 0 auto;
        display: flex;
        width: 450px;
        height: @bannerHeight;
        align-items: center;
        justify-content: center;
        li {
          display: block;
          height: 30px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          flex: 1;
          color: white;
          transition: all 0.3s linear;
          border-radius: 15px;
        }
        li:hover {
          box-shadow: 0 0 3px RGBA(23, 87, 135, 1);
          background-color: rgba(255, 250, 250, 0.08);
        }
        .active {
          color: white;
          background: linear-gradient(RGBA(0, 0, 31, 0.3), RGBA(107, 145, 189, 0.2));
          box-shadow: 0 0 1px RGBA(23, 87, 135, 1);
          font-weight: bold;
        }
        .normal {
          color: white;
        }
        /deep/ .el-pager li.active {
          padding: 2px 4px;
          border-radius: 3px;
          background-color: #409EFF;
          color: rgba(255, 255, 255, .85);
          line-height: 24px;
        }
        /deep/ .el-tabs__item {
          color: white;
          font-weight: 800;
          font-size: 20px;
        }
        /deep/ .el-tabs__nav-wrap::after {
          background-color: rgba(0, 0, 0, .25);
          left: 48px;
        }
        /deep/ .el-tabs__nav-scroll {
          padding-left: 48px;
        }
        /deep/ .el-tabs__nav-wrap::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 0px;
          background-color: #e4e7ed;
          z-index: 1;
        }
      }
    }
    .tools-wrapper {
      height: @bannerHeight;
      display: inline-block;
      position: relative;
      width: calc(100% - 1440);
      .tools {
        position: fixed;
        right: 20px;
        height: 28px;
        li {
          position: relative;
          display: inline-block;
          height: @bannerHeight -  3;
          line-height: @bannerHeight;
          margin-right: 5px;
          cursor: pointer;
          .unread-record {
            display: block;
            line-height: 14px;
            text-align: center;
            font-size: 8px;
            position: absolute;
            top: 8px;
            left: 10px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: #e4393c;
            color: rgba(255, 255, 255, .85);
          }
          .boldStyle {
            font-weight: bold;
          }
        }
        li:last-child {
          margin-right: 0px;
        }
      }
    }

  }
</style>
