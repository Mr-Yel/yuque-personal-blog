<template>
   <ArticleList :data="articleList"></ArticleList>
</template>
  
<script>
import ArticleList from '@/components/CardComponents/ArticleList'
import service from '@/service'

export default {
  name: "ArticleListAcquirer",
  components: {
    ArticleList
  },
  props: {
    data: {
      default: {},
      type: Object
    }
  },
  data () {
    return {
      articleList: [],
    };
  },
  async mounted () {
    const nameSpace = this.data.nameSpace
    let res = await service.getArticleListInfo(nameSpace)
    if (res && res.data && res.data.data) {
      this.articleList = res.data.data.map(item => ({
        ...item,
        image: item.cover,
        nameSpace,
      }))
    }
  }
}
</script>

<style>
</style>