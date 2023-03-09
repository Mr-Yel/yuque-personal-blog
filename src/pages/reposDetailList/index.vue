<template>
  <view>
    <my-navbar :isHomePage="false"></my-navbar>
    <view class="detail-header">
      <view class="title">{{ reposDetail.name }}</view>
      <view class="description">{{ reposDetail.description }}</view>
      <view class="content">
        <text v-if="reposDetail.created_at !== undefined"> ⏰ 发布于 {{ createTime }} |</text>
        <text v-if="reposDetail.updated_at !== undefined"> ⏳️ 最后更新 {{ updateTime }} |</text>
        <text v-if="reposDetail.items_count !== undefined"> 📄 文章个数 {{ reposDetail.items_count }} |</text>
        <text v-if="reposDetail.likes_count !== undefined"> 👍 {{ reposDetail.likes_count }}个赞</text>
      </view>
    </view>
    <view class="content-list">
      <view class="content-item" v-for="(item, index) in reposDetailList" :key="index">
        <ArticleCard :data="item"></ArticleCard>
      </view>
    </view>
    <u-loading-icon v-if="loading" text="加载中" textSize="18"></u-loading-icon>
  </view>
</template>

<script>
import service from '@/service'
import ArticleCard from '@/components/CardComponents/ArticleCard'

export default {
  components: {
    ArticleCard
  },
  data () {
    return {
      loading: true,
      reposDetail: {},
      reposDetailList: [],
    }
  },
  computed: {
    updateTime () {
        return this.$dayjs(this.reposDetail && this.reposDetail.updated_at).format('YYYY-MM-DD')
    },
    createTime () {
        return this.$dayjs(this.reposDetail && this.reposDetail.created_at).format('YYYY-MM-DD')
    }
  },
  props: {
    namespace: {
      default: '',
      type: String
    }
  },
  methods: {
    async initReposDetail() {
      this.loading = true
      let res = await service.getReposDetail(this.namespace)
      if (res && res.data && res.data.data) {
        this.loading = false
        this.reposDetail = res.data.data
      }
    },
    async initReposDetailList() {
      this.loading = true
      let res = await service.getArticleListInfo(this.namespace)
      if (res && res.data && res.data.data) {
        this.loading = false
        this.reposDetailList = res.data.data.map(e=>({...e, namespace: this.namespace}))
      }
    },
  },
  mounted () {
    this.initReposDetail()
    this.initReposDetailList()
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
  }
  .content {
    color: #fff; 
    padding: 50rpx 0 ;
  }
}
.content-list {
  padding: 40rpx;
}
</style>
