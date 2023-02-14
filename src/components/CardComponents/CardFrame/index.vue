<template>
  <view class="CardFrame">
    <slot></slot>
  </view>
</template>
  
<script>
export default {
  name: "CardFrame",
  props: {
    phoneHeight: {
      default: 20,
      type: Number
    }
  },
  data () {
    return {
    };
  },
}
</script>

<style lang="scss">
.CardFrame {
  margin-top: 20rpx;
  padding: 20px;
  background-color: rgba(#fff, 0.9);
  border-radius: 20px;
  border: 1px solid rgba(169, 169, 169, 0.7);
}
</style>