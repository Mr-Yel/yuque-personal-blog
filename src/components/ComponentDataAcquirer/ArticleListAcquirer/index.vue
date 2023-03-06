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
.indicator {
  justify-content: center;
  display: flex;
  padding-bottom: 10px;
  
  .indicator__dot {
    width: 11px;
    height: 11px;
    display: block;
    border-radius: 10px;
    background: #858585;
    opacity: .2;
    transition: all .3s;
    margin: 8px 5px 0;
    &.indicator__dot--active {
      background-color: rgb(57, 197, 187);
      opacity: 1;
      width: 30px;
    }
  }
}
.ArticleList_content {
  padding: 0 20px
}
.ArticleList_item {
  margin-bottom: 10px;
  text-align: center;
  &.time {
    color: #4c4948;
    font-weight: 500;
  }
  &.title {
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
  &.description {
    color: #4c4948;
    font-size: 14px;
    line-height: 20px;
    word-break: break-all;
    height: 60px;
    display: flex;
    align-items: center;
    text {
      @include mul-text-truncate(3);
    }
  }
  &.button {
    background-color: rgb(57, 197, 187);
    color: #fff;
    height: 40px;
    line-height: 40px;
    border: none;
  }
}
</style>