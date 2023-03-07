<template>
  <view class="header"
    :style="{height: headerHeight}"
  >
    <view
      class="nav"
      :style="{paddingTop: `${safeHeight}px`}"
      :class="navVisible ? 'nav-visible' : ''"
    >
      <view class="nav-left">
        <text
          class="more"
          @click="aaa"
        >🤣</text>
        <text class="setting">⚙️</text>
        <text class="search">🔍</text>
      </view>
      <view class="nav-content" @click="goHome()">Yellll🍦</view>
      <view class="nav-right"></view>
    </view>
    <view v-if="isHomePage" class="site-info">
      <view class="site-title">😀😀😀</view>
      <!-- <Typing :text="text" /> -->
      <view class="typing">{{subtitle}}</view>
      <view class="icon-box">
        <text
          class='t-icon t-icon-yel-weixin'
          @click="showWeiXin = true"
        ></text>
        <text
          class='t-icon t-icon-yel-qq'
          @click="showQQ()"
        ></text>
      </view>
    </view>
    <view v-if="isHomePage" class="scroll-down" @click="pageScrollToContent()">
      <text
        class='iconfont icon-yel-unfold'
      ></text>
    </view>
    <u-overlay
      :show="showWeiXin"
      @click="showWeiXin = false"
    >
      <view class="warp">
        <image
          class="image"
          src="https://mr-yel.github.io/assets/yel-uni-app-blog/yel.jpg"
          @tap.stop
          :show-menu-by-longpress="true"
        ></image>
      </view>
    </u-overlay>
  </view>
</template>
  
<script>
import { debounce } from '@/utils'
import { methods } from 'uview-ui/libs/mixin/mixin';
import { Typing } from '@/utils/Typing.js'
export default {
  name: "my-navbar",
  data () {
    return {
      navVisible: false,
      text: [
        'Welcome to Yelll\'s Personal blog!🤣🤣🤣',
        'Hope you have a nice day!🍭🍭🍭',
      ],
      subtitle: '',
      showWeiXin: false,
      safeHeight: getApp().globalData.phoneHeight,
      typing: null,
    };
  },
  props: {
    isHomePage: {
      default: true,
      type: Boolean
    }
  },
  computed: {
    headerHeight() {
      return `${this.isHomePage ? '100vh;' : `${40 + this.safeHeight}px;`}`
    }
  },
  mounted () {
    this.onScroll()       // 监听滚动条事件
    if(this.isHomePage) {
      this.newTyping()      // 初始化打字机效果
    }
  },
  destroyed () {
    this.typing && this.typing.stopWriting()
  },
  methods: {
    onScroll () {
      let _that = this
      uni.$on('onPageScroll', function (scrollTop) {//接收参数
        const isScrollMoreThanZero = scrollTop > 0;
        scrollTop > 56
          ? (isScrollMoreThanZero
            ? _that.navVisible && (_that.navVisible = false)
            : _that.navVisible || (_that.navVisible = true),
            (_that.navVisible = true))
          : 0 === scrollTop &&
          (_that.navVisible = false);
      });
    },
    newTyping () {
      this.typing = new Typing({
        strings: this.text,
        changeCallback: (text) => { this.subtitle = text },
        startDelaySpeed: 150,
        deleteSpeed: 50,
        shouldDelete: true,
      });
    },
    showQQ () {
      console.log('show QQ');
    },
    pageScrollToContent () {
      uni.pageScrollTo({selector: '.content'})
    },
    goHome () {
      this.$routerPush(`/pages/index/index`)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../scss/base/mixin.scss';
.header {
  width: 100vw;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.25) !important;
    z-index: -1;
  }
}
.nav {
  height: 40px;
  width: 100%;
  padding: 0 24rpx;
  transition: none !important;
  opacity: 1;
  filter: none;
  animation: headerNoOpacity 1s;
  display: flex;
  align-items: center;
  z-index: 999;
  .nav-left {
    position: absolute;
  }
  .nav-content {
    flex: 1;
    text-align: center;
    text-shadow: 2rpx 2rpx 4rpx rgba($color: #000000, $alpha: 0.15);
    font-weight: 700;
    color: #fff;
  }
  &.nav-visible {
    position: fixed;
    background: linear-gradient(60deg, #ffd7e4 0, #c8f1ff 93%);
    opacity: 0.95;
    backdrop-filter: var(--backdrop-filter);
    .nav-content {
      color: #4c4948;
      text-shadow: none;
    }
  }
}
.site-info {
  position: absolute;
  top: 43%;
  padding: 0 10px;
  width: 100%;
  color: #fff;
  .site-title {
    font-size: 30px;
    text-align: center;
    // text-shadow: 2px 2px 4px rgba(0 0 0 / 15%);
    line-height: 1.5;
  }
  .typing {
    padding-top: 10rpx;
    font-size: 18px;
    text-align: center;
    min-height: 30rpx;
  }
  .icon-box {
    padding-top: 10rpx;
    text-align: center;
    .t-icon {
      width: 30px;
      height: 30px;
    }
    text:not(last-of-type) {
      margin-right: 10rpx;
    }
  }
}
.scroll-down {
  position: absolute;
  bottom: 0;
  padding: 10px;
  width: 100%;
  text-align: center;
  font-size: 30px;
  .iconfont {
    color: #fff;
    position: relative;
    @include animation(flashFloat 1s infinite alternate)
  }
}
.warp {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .image {
    height: 320px;
    width: 320px;
  }
}

@keyframes flashFloat {
  from {
    top: 10rpx;
    opacity: 0;
  }
  to {
    top: -10rpx;
    opacity: 1;
  }
}

@media screen and (max-width: 768rpx) {
  #nav {
    padding: 0 16rpx;
  }
}
</style>