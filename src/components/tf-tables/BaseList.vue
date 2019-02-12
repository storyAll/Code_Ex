<template>
    <div>
      <slot name="设备列表"></slot>
      <slot name="合同列表"></slot>
      <slot name="费用列表"></slot>
      <slot name="维保记录"></slot>
      <slot name="计划任务"></slot>
      <slot name="2"></slot>
      <slot name="3"></slot>
    </div>
</template>

<script>

export default {
  name: 'BaseList'
}
</script>

<style scoped lang="less">
</style>
