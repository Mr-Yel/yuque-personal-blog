<template>
  <CardFrame class="ArticleCard">
    <view v-if="data" class="ArticleCard_img" @click="goToArticleDetail">
      <u-image :showLoading="true" :src="data.cover || ''"></u-image>
    </view>
    <view v-if="data" class="ArticleCard_info">
      <view class="ArticleCard_title">{{ data.title }}</view>
      <view class="ArticleCard_content">
        <text v-if="data.created_at !== undefined"> ⏰ 发布于 {{ UpdateTime }} |</text>
        <text v-if="data.updated_at !== undefined"> ⏳️ 最后更新 {{ createTime }} |</text>
        <text v-if="data.word_count !== undefined"> 📄 文章字数 {{ data.word_count }} |</text>
        <text v-if="data.likes_count !== undefined"> 👍 {{ data.likes_count }}个赞 |</text>
        <text v-if="data.comments_count !== undefined"> 💬 {{ data.comments_count }}条评论</text>
      </view>
    </view>
    <u-loading-icon v-if="!data" text="加载中" textSize="18"></u-loading-icon>
  </CardFrame>
</template>
  
<script>
import CardFrame from '@/components/CardComponents/CardFrame'

export default {
  name: "ArticleCard",
  components: {
    CardFrame
  },
  props: {
    data: {
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
        return this.$dayjs(this.data && this.data.updated_at).format('YYYY-MM-DD')
    },
    createTime () {
        return this.$dayjs(this.data && this.data.created_at).format('YYYY-MM-DD')
    }
  },
  methods: {
    goToArticleDetail() {
      if(this.data && this.data.namespace && this.data.slug) {
        const { namespace, slug } = this.data
        this.$routerPush(`/pages/articleDetail/index?namespace=${namespace}&slug=${slug}`)
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
    @include mul-text-truncate(2);
  }
}
</style>