<template>
  <view class="detailwrapper">
    <view class="copytext" @click="copyLink()">语雀原文链接</view>
    <rich-text v-if="nodes" :nodes="nodes"></rich-text>
  </view>
</template>

<script>
import service from '@/service'

export default {
  data () {
    return {
      loading: true,
      articleDetail: {},
      nodes: '',
    }
  },
  props: {
    nameSpace: {
      default: '',
      type: String
    },
    slug: {
      default: '',
      type: String
    }
  },
  methods: {
    copyLink() {
      const data = `https://www.yuque.com/u21228658/pxde34/${this.slug}`;
      uni.setClipboardData({
        data,
        success: () => {
          uni.showToast({
            title: "链接复制成功",
            duration: 2000,
          });
        },
      });
    },
  },
  async mounted () {
    this.loading = true
    let res = await service.getArticleDetail(this.nameSpace, this.slug)
    if (res && res.data && res.data.data) {
      this.loading = false
      this.articleDetail = res.data.data
      this.nodes = this.articleDetail.body_html.replace("<!doctype html>", "");
      console.log(this.articleDetail);
      
    }
  }
}
</script>

<style lang="scss">
page {
  background: rgba(0, 160, 233, 0.14);
}
.detailwrapper {
  padding: 10upx 20upx;
  font-size: 32rpx;
  margin-bottom: 10upx;
}
.copytext {
  color: #0400ff;
  margin: 10rpx 0;
}
</style>
