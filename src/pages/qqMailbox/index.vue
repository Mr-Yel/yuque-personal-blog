<template>
  <view>
    <web-view
      :webview-styles="webviewStyles"
      src="https://res.abeim.cn/api/qq/?qq=1845194320"
    ></web-view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      webviewStyles: {
        progress: {
          color: '#FF3333'
        }
      }
    }
  }
}
</script>

<style>
</style>