<template>
  <div class="detail">
    <div class="detail-title">
      <div class="title-content">
        <div class="title-icon">
          <img src="../assets/images/common/206.png" alt="">
        </div>
        <div class="title-detail">
          <span>污水泵</span>
          <p>tfkj_1101</p>
          <span>给水系统</span>
          <p>5号厂房</p>
        </div>
      </div>
      <div class="title-gis">
        <span>查看BIM</span>
      </div>
    </div>
    <div class="detail-content">
      <ul>
        <li>生产日期</li>
        <li>2018-07-20</li>
        <li>规格</li>
        <li>eiwh-2018</li>
        <li>型号</li>
        <li>dja-21098</li>
        <li>制造商</li>
        <li>汉王集团科技有限公司</li>
        <li>采购单号</li>
        <li>tfkj-20180710</li>
        <li>创建时间</li>
        <li>2018-07-20</li>
        <li>采购价格</li>
        <li>10000</li>
        <li>入库日期</li>
        <li>2017-0720</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EquipmentInformation',
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
  .detail{
    color: #ffffff;
    .detail-title{
      border-bottom:1px solid darkgray ;
      padding-bottom:20px;
      .title-content{
        height: 90px;
        text-align: left;
        /*border: 1px solid red;*/
        div{
          float: left;
        }
        .title-detail{
          padding-left:10px;
          font-size: 14px;
          height: 100%;
          span,p{
            display:block;
          }
          span:first-child{
            font-size: 16px;
            font-weight:600;
          }
          p:not(:last-child){
            color: gray;
          }
        }
        .title-icon{
          height: 100%;
          img{
            display: inline-block;
            width: 120px;
            height: 100%;
          }
        }
      }
      .title-gis{
        text-align: center;
        padding-top: 20px;
        span{
          padding: 5px 110px;
          border-radius:5px;
          background: #2fa4e7;
        }
      }
    }
    .detail-content{
      padding-top: 20px;
      ul{
        li{
          font-size: 14px;
          /*width: 50%;*/
          height: 30px;
          text-align: center;
          float:left;
        }
        li:nth-of-type(odd){
          width: 40%;
        }
        li:nth-of-type(even){
          width: 60%;
        }
      }
    }
  }
</style>
