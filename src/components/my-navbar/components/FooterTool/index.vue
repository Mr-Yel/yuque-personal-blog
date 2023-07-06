<template>
  <view class="FooterTool">
    <!-- <button
      v-if="footerToolCtr.todo"
      class="button todo"
      @click="goToToDo"
    >
      <text>todo</text>
    </button> -->
    <button
      v-if="footerToolCtr.share"
      class="button share"
      open-type="share"
    >
      <text class="iconfont icon-share"></text>
    </button>
    <button
      v-if="footerToolCtr.top"
      class="button top"
      @click="goTop"
    >
      <text class="iconfont icon-packup"></text>
    </button>
    <button
      v-if="footerToolCtr.bottom"
      class="button bottom"
      @click="goBottom"
    >
      <text class="iconfont icon-unfold"></text>
    </button>
  </view>
</template>
  
<script>
export default {
  name: "FooterTool",
  data () {
    return {
    };
  },
  props: {
    footerToolCtr: {
      type: Object,
      default: () =>({ 
        todo: true,
        share: true,
        top: true,
        bottom: true,
      }),
    }
  },
  computed: {
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    goToToDo () {
      this.$routerPush(`/pages/todo/index`)
    },
    goTop () {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    },
    goBottom () {
      uni.pageScrollTo({
        scrollTop: 99999,
        duration: 300
      });
    }
  }
}
</script>

<style scoped lang="scss">
.FooterTool {
  position: fixed;
  bottom: 20rpx;
  right: 20rpx;
  z-index: 9999;
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 76rpx;
    height: 76rpx;
    font-size: 36rpx;
    border-radius: 12rpx;
    background-color: rgb(57, 197, 187);
    color: #fff;
    &:not(:last-of-type) {
      margin-bottom: 10rpx;
    }
  }
  .todo {
    font-size: 24rpx;
  }
}
</style>