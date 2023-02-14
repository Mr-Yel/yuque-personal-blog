<template>
  <CardFrame class="ArticleCard">
    <view v-if="!loading" class="ArticleCard_img" @click="goToArticleDetail">
      <u--image :showLoading="true" :src="articleDetail.cover"></u--image>
    </view>
    <view v-if="!loading" class="ArticleCard_info">
      <view class="ArticleCard_title">{{ articleDetail.title }}</view>
      <view class="ArticleCard_content">
        <text v-if="articleDetail.created_at !== undefined">⏰发布于 {{ UpdateTime }} |</text>
        <text v-if="articleDetail.updated_at !== undefined">⏳️最后更新 {{ createTime }} |</text>
        <text v-if="articleDetail.word_count !== undefined">📄文章字数 {{ articleDetail.word_count }} |</text>
        <text v-if="articleDetail.likes_count !== undefined">{{ articleDetail.likes_count }}个赞👍 |</text>
        <text v-if="articleDetail.comments_count !== undefined">{{ articleDetail.comments_count }}条评论</text>
      </view>
    </view>
    <u-loading-icon v-if="loading" text="加载中" textSize="18"></u-loading-icon>
  </CardFrame>
</template>
  
<script>
import CardFrame from '@/components/CardComponents/CardFrame'
import service from '@/service'

export default {
  name: "ArticleCard",
  components: {
    CardFrame
  },
  props: {
    item: {
      default: {},
      type: Object
    }
  },
  data () {
    return {
      loading: true,
      articleDetail: {}
    };
  },
  computed: {
    UpdateTime () {
        return this.$dayjs(this.articleDetail && this.articleDetail.updated_at).format('YYYY-MM-DD')
    },
    createTime () {
        return this.$dayjs(this.articleDetail && this.articleDetail.created_at).format('YYYY-MM-DD')
    }
  },
  async mounted () {
    this.loading = true
    const { nameSpace, slug } = this.item
    let res = await service.getArticleDetail(nameSpace, slug)
    if (res && res.data && res.data.data) {
      this.loading = false
      this.articleDetail = res.data.data
      console.log(this.articleDetail);
      
    }
  },
  methods: {
    goToArticleDetail() {
      console.log(1111);
      console.log(this.item);
      if(this.item && this.item.nameSpace && this.item.slug) {
        const { nameSpace, slug } = this.item
        uni.navigateTo({ url: `../articleDetail/articleDetail?nameSpace=${nameSpace}&slug=${slug}`,
        fail:(error)=>console.log(error)})
      }
    }
  }
}
</script>

<style lang="scss">
@mixin mul-text-truncate($lines: 2) {
  /* 控制宽度 */
  width: 490rpx;
  max-width: 490rpx;
  /* 显示多行 */
  display:-webkit-box; 
  overflow:hidden; 
  /* 5为显示的行数 */
  -webkit-line-clamp:$lines;
  -webkit-box-orient:vertical;
}
.ArticleCard_info {
  margin-bottom: 10px;
  .ArticleCard_title {
    text-align: center;
    color: #4c4948;
    font-weight: bold;
    word-break: break-all;
    font-size: 18px;
    line-height: 24px;
    height: 48px;
    display: flex;
    align-items: center;
    text {
      @include mul-text-truncate(2);
    }
  }
}
</style>