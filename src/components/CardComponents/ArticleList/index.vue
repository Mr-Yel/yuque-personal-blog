<template>
  <CardFrame class="ArticleList">
    <view class="ArticleList_content">
      <u-swiper
        :loading="!data.length"
        :list="data"
        keyName="image"
        circular
        :autoplay="true"
        previousMargin="30"
        nextMargin="30"
        @change="e => current = e.current"
      >
      </u-swiper>
      <view
        slot="indicator"
        class="indicator"
      >
        <view
          class="indicator__dot"
          v-for="(item, index) in data"
          :key="index"
          :class="[index === current && 'indicator__dot--active']"
        >
        </view>
      </view>
      <view class="ArticleList_item time">{{ currentUpdateTime }}</view>
      <view class="ArticleList_item title">{{ data[current].title }}</view>
      <view class="ArticleList_item description">{{ data[current].description }}</view>
      <button class="ArticleList_item button" @click="goToArticleDetail">详情</button>
    </view>
  </CardFrame>
</template>
  
<script>
import CardFrame from '@/components/CardComponents/CardFrame'
import service from '@/service'

export default {
  name: "ArticleList",
  components: {
    CardFrame
  },
  props: {
    data: {
      default: [],
      type: Array
    }
  },
  data () {
    return {
      current: 0,
    };
  },
  computed: {
    currentUpdateTime () {
        return this.$dayjs(this.data[this.current] && this.data[this.current].created_at).format('YYYY-MM-DD')
    }
  },
  methods: {
    goToArticleDetail() {
      const articleItem = this.data[this.current]
      if(articleItem && articleItem.slug && articleItem.namespace) {
        const { slug, namespace } = articleItem
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
    @include mul-text-truncate(2);
  }
  &.description {
    color: #4c4948;
    font-size: 14px;
    line-height: 20px;
    word-break: break-all;
    height: 60px;
    display: flex;
    align-items: center;
    @include mul-text-truncate(3);
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