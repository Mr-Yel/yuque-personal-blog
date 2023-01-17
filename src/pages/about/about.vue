<template>
  <view class="content">
    <image
      class="logo"
      src="/static/logo.png"
    ></image>
    <Text class='exe exe-search'></Text>
    <view>
      <u-button>按钮</u-button>
			<u-button text="渐变色按钮" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button>
    </view>

    <view>
      <text class="title">{{title}}</text>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      title: 'Hello',
      list: [{
        text: '点赞',
        color: 'blue',
        fontSize: 28
      }, {
        text: '分享'
      }, {
        text: '评论'
      }],
      show: true
    }
  },
  onLoad () {

  },
  methods: {

  },
  mounted() {
    console.log(111);
  }
}
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo {
    height: 300rpx;
    width: 200rpx;
    margin: 200rpx auto 50rpx auto;
  }
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  // color: $color-primary;
}
</style>
