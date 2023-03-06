<template>
    <ArticleCard :data="articleDetail"></ArticleCard>
</template>
  
<script>
import ArticleCard from '@/components/CardComponents/ArticleCard'
import service from '@/service'

export default {
  name: "ArticleCardAcquirer",
  components: {
    ArticleCard
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
        return this.$dayjs(this.articleDetail && this.articleDetail.updated_at).format('YYYY-MM-DD')
    },
    createTime () {
        return this.$dayjs(this.articleDetail && this.articleDetail.created_at).format('YYYY-MM-DD')
    }
  },
  async mounted () {
    this.loading = true
    const { nameSpace, slug } = this.data
    let res = await service.getArticleDetail(nameSpace, slug)
    if (res && res.data && res.data.data) {
      this.loading = false
      this.articleDetail = {...res.data.data, nameSpace}
    }
  },
  methods: {
    goToArticleDetail() {
      if(this.data && this.data.nameSpace && this.data.slug) {
        const { nameSpace, slug } = this.data
        uni.redirectTo({ 
          url: `../articleDetail/index?nameSpace=${nameSpace}&slug=${slug}`,
          fail:(error)=>console.log(error)
        })
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