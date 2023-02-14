<template>
  <view>
    <NavBar :phoneHeight="phoneHeight"/>
    <view 
      class="content"
      :style="{paddingTop: `${phoneHeight + 40}px`}"
    >
      <view class="content-list">
        <view class="content-item" v-for="(item, index) in contentConfig.data" :key="index">
          <ArticleCard v-if="item.type == 'ArticleCard'" :item="item"></ArticleCard>
          <ArticleList v-if="item.type == 'ArticleList'" :item="item"></ArticleList>
          <ReposList v-if="item.type == 'ReposList'" :item="item"></ReposList>
        </view>
      </view>
    </view>
  </view>

</template>

<script>
import service from '@/service'
import NavBar from '@/components/NavBar'
import ArticleCard from '@/components/CardComponents/ArticleCard'
import ArticleList from '@/components/CardComponents/ArticleList'
import ReposList from '@/components/CardComponents/ReposList'
import { contentConfig } from '@/config/contentConfig'

export default {
  components: {
    NavBar,
    ArticleCard,
    ArticleList,
    ReposList,
  },
  data () {
    return {
      dataDetail: {
        items_count: 30,
      },
      hits: 340,
      show: false,
      phoneHeight: 0,
      contentConfig: contentConfig,
    }
  },
  mounted () {
    console.log('2222222',this.phoneHeight1);
    this.initSafeHeight() // 初始化安全高度
  },
  methods: {
    initSafeHeight () {
      let _that = this
      uni.getSystemInfo({
        success: function (res) {
          _that.phoneHeight = res.statusBarHeight
        }
      })
    },
    aaa () {
      uni.navigateTo({ url: '../qqMailbox/index' ,fail:(error)=>console.log(error)})
    }
  }
}
</script>

<style lang="scss">
.content {
  box-sizing: border-box;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  .content-list {
    width: 100%;
    .content-item {
      width: 100%;
    }
  }
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  font-weight: 800;
}

.cardwrapper {
  background: #fff;
  border: 1upx solid rgba(0, 0, 0, 0.1);
  border-radius: 12upx;
  padding: 30upx 30upx;
  /* display: flex;
  justify-content: flex-start;
  align-items: center; */
  cursor: pointer;
  /* flex: 1 1; */
  margin-top: 50upx;
  box-shadow: 0 1upx 3upx rgba(0, 0, 0, 0.01), 0 0 6upx rgba(0, 0, 0, 0.06),
    0 8upx 16upx rgba(0, 0, 0, 0.06);
  position: relative;
}

.cardwrapper .cardcontent {
  width: 550rpx;
  background: #fff;
  border-radius: 12upx;
  padding: 30upx 20upx;
  box-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.01), 0 0 6rpx rgba(0, 0, 0, 0.1),
    0 8rpx 16rpx rgba(0, 0, 0, 0.2);
}

.cardcontent .title {
  font-family: cursive;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-style: normal;
  font-weight: 600;
  font-size: 37rpx;
  color: #000;
  margin-bottom: 6upx;
  display: flex;
  align-items: center;
}

.subtitle {
  text-overflow: ellipsis;
  overflow: hidden;
  font-style: normal;
  font-weight: 600;
  font-size: 38upx;
  color: #000;
  margin-bottom: 20upx;
}

.cardcontent .desc {
  font-size: 28upx;
  color: rgba(0, 0, 0, 0.8);
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 50upx;
}

.numdesc,
.items_count,
.hits {
  width: 100%;
  padding-left: 89rpx;
  box-sizing: border-box;
}
.numdesc {
  font-size: 25upx;
  padding-top: 20upx;
  color: #888;
  font-family: iconfont;
}
.items_count {
  color: #666;
  font-size: 30upx;
}
.hits {
  font-size: 32upx;
  color: #666;
}
</style>
