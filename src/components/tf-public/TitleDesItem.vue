<template>
  <div class="title-des-items" :class="tdiDataClass||tdiTypeClass">
    <div class="title-des-item" v-for="(tdiDa,index) in tdiData" :key="index">
      <div class="titleDes-item-title">{{tdiDa.tit}}</div>
      <div class="titleDes-item-des">
        {{tdiDa.des | NumFormat}}<span>{{tdiDa.cy}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TitleDesItem',
  data() {
    return {}
  },
  computed: {
    tdiTypeClass() {
      switch (this.tdiData.length) {
        case 2: {
          return 'sma2'
        }
        case 8:
          return 'sma8'
        case 5:
          return 'sma5'
        case 3:
          return 'sma5'
        case 6:
          return 'sma6'
      }
    }
  },
  props: {
    tdiData: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    tdiDataClass: {
      type: String,
      default: ''
    }
  },
  created() {
    // console.log(this.tdiData)
  }
}
</script>

<style lang="less" scoped>
  .textColor() {
    color: RGB(204, 204, 204);
  }

  .title-des-items {
    display: flex;
    flex-wrap: wrap;
    .textColor();
    .title-des-item {
      .titleDes-item-title {
        color: #CCCCCC;
      }
    }
  }

  .title-des-items.sma8, .title-des-items.sma2 {
    padding: 10px 0 10px 40px;
    text-align: left;
    .title-des-item {
      flex-basis: 50%;
      padding-top: 10px;
    }
    .titleDes-item-title, .titleDes-item-des span {
      font-size: 14px;
    }
    .titleDes-item-des {
      font-size: 30px;
      color: #fff;
    }
  }

  .title-des-items.sma6 {
    padding: 10px;
    text-align: center;
    .title-des-item {
      flex-basis: 33.33%;
      padding-top: 10px;
    }
    .titleDes-item-title, .titleDes-item-des span {
      font-size: 14px;
    }
    .titleDes-item-des {
      font-size: 30px;
      color: #fff;
    }
  }

  .title-des-items.sma5 {
    padding-top: 10px;
    text-align: center;
    .title-des-item {
      flex-basis: 33.33%;
      padding-top: 10px;
    }
    .titleDes-item-title, .titleDes-item-des span {
      font-size: 14px;
    }
    .titleDes-item-des {
      font-size: 30px;
      color: #fff;
    }
  }
</style>
