<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AsideController',
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
  @import "../common";
  .wrapper {
    position: relative;
    top:0;
    border-radius: 0;
    height:40px;
    width:@asideWidth;
  }
</style>
