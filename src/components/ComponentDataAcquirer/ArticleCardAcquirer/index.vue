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
      articleDetail: {}
    };
  },
  async mounted () {
    const { namespace, slug } = this.data
    let res = await service.getArticleDetail(namespace, slug)
    if (res && res.data && res.data.data) {
      this.articleDetail = {...res.data.data, namespace}
    }
  }
}
</script>

<style>
</style>