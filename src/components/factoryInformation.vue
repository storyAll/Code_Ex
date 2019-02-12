// 设备管理厂房监控面板
<template>
  <div id="factoryInfo">
    <!-- 标题 -->
    <div class="factoryTitle">
      <span>厂房信息</span>
    </div>
    <!-- 图片 -->
    <div class="factoryImg">
      <!-- 地址及图片 -->
      <div class="adressImg">
        <div class="img">
          <img src="../assets/images/206.png">
        </div>
        <div class="adress">
          <h1>5号厂房</h1>
          <h4>tfkj-1101</h4>
          <p>天津市东丽区空港商务园西区</p>
        </div>
      </div>
      <!-- GIS/BIM切换按钮 -->
      <div class="GBchange">
        <button>查看BIM</button>
      </div>
    </div>
    <!-- 设备数 -->
    <div class="equipmentNum">
      <div>
        <p>设备总数</p>
        <p><span class="big">56</span>个</p>
      </div>
      <div>
        <p>故障设备</p>
        <p><span class="big">12</span>个</p>
      </div>
    </div>
    <!-- 详情 -->
    <div class="details">
      <div class="detailsCon">
        <p class="mid">厂方名称</p>
        <span class="midnum">1号厂房</span>
      </div>
      <div class="detailsCon">
        <p class="mid">面积</p>
        <span class="midnum">1.8万平方米</span>
      </div>
      <div class="detailsCon">
        <p class="mid">产权人</p>
        <span class="midnum">天保建设</span>
      </div>
      <div class="detailsCon">
        <p class="mid">承租方</p>
        <span class="midnum">汉王集团科技有限公司</span>
      </div>
      <div class="detailsCon">
        <p class="mid">行业</p>
        <span class="midnum">制造业</span>
      </div>
      <div class="detailsCon">
        <p class="mid">施工时间</p>
        <span class="midnum">2018-7-20</span>
      </div>
      <div class="detailsCon">
        <p class="mid">竣工时间</p>
        <span class="midnum">2018-7-20</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'factoryInformation',
  data() {
    return {

    }
  }
}
</script>
<style scoped lang='less'>
  #factoryInfo{
    width: 300px;height: 550px;
    padding: 10px;
    background-color: #2F4050;
    color: #fff;
  }
  .factoryTitle{
    width: 280px;height: 40px;
  }
  .factoryTitle span{
    display: block;
    width: 70px;height: 25px;
    box-sizing: border-box;
    text-align: center;
    padding-top: 1px;
    border: 1px solid #1890ff;
    border-radius: 2px;
    font-size: 14px;
    color: #1890ff;
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    -khtml-user-select:none;/*早期浏览器*/
    user-select:none;
  }
  .factoryImg{
    width: 280px;height: 170px;
    box-sizing: border-box;
    border-bottom: 1px solid gray;
  }
  .adressImg{
    width: 280px;height: 100px;
    display: flex;
  }
  .img{
    width: 140px;height: 100px;
  }
  .img img{
    width: 140px;height: 100px;
  }
  .adress{
    width: 140px;height: 100px;
    box-sizing: border-box;
    padding-left: 10px;
    padding-top: 5px;
  }
  h1{
    font-size: 16px;
    font-weight: 600;
  }
  h4{
    font-size: 12px;
    color: gray;
  }
  .GBchange{
    width: 280px;height: 60px;
    box-sizing: border-box;
    text-align: center;
    padding: 15px;
  }
  .GBchange button{
    width: 240px;height: 30px;
    border: 0;
    border-radius: 5px;
    background-color: #1890ff;
    color: white;
  }
  .GBchange button:active{
    background-color: #ff9500;
  }
  .equipmentNum{
    width: 280px;height: 60px;
    display: flex;
    justify-content: space-around;
    padding: 15px 0;
  }
  .big{
    font-size: 26px;
    font-weight: 500;
  }
  .details{
    width: 280px;
    line-height: 30px;
  }
  .detailsCon{
    width: 280px;
    display: flex
  }
  .mid{
    width: 90px;
    padding-right: 30px;
    text-align: right;
    font-size: 16px;
    font-weight: 500;
  }
  .midnum {
    display: block;
    width:160px;
    text-align: center;
  }
</style>
