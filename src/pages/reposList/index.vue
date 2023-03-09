<template>
  <view>
    <my-navbar :isHomePage="false"></my-navbar>
    <view class="detail-header">
      <view class="title">{{ userInfo.name }}</view>
      <view class="description">{{ userInfo.description }}</view>
    </view>
    <view class="content-list">
      <view class="content-item" v-for="(item, index) in reposListInfo" :key="index">
        <ArticleListAcquirer :data="item"></ArticleListAcquirer>
      </view>
    </view>
    <u-loading-icon v-if="loading" text="加载中" textSize="18"></u-loading-icon>
  </view>
</template>

<script>
import { storage } from '@/utils/storage'
import service from '@/service'
import ArticleListAcquirer from '@/components/ComponentDataAcquirer/ArticleListAcquirer'

export default {
  components: {
    ArticleListAcquirer
  },
  data () {
    return {
      loading: true,
      userInfo: {},
      reposListInfo: [],
    }
  },
  computed: {
  },
  props: {
  },
  methods: {
    async initReposList() {
      this.loading = true
      const id = await storage.get('userId')
      let res = await service.getReposListInfo(id)
      if(res && res.data && res.data.data) {
        this.loading = false
        this.reposListInfo = res.data.data
      }
    },
    async initUserInfo() {
      this.userInfo =  await storage.get('userInfo')
    }
  },
  mounted () {
    this.initReposList()
    this.initUserInfo()
  }
}
</script>

<style lang="scss">
page {
  background: rgba(0, 160, 233, 0.14);
}
.detail-header {
  padding: 40rpx;
  background-color: rgba(0, 0, 0, 0.25);
  .title {
    text-align: center;
    color: #fff;
    font-weight: bold;
    word-break: break-all;
    font-size: 58rpx;
    line-height: 68rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .description {
    padding: 50rpx 0 ;
    text-align: center;
    color: #fff;
    font-weight: bold;
    word-break: break-all;
    font-size: 38rpx;
    line-height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.content-list {
  padding: 40rpx;
}
</style>
