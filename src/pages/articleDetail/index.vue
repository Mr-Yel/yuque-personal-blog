<template>
  <view>
    <my-navbar :isHomePage="false"></my-navbar>
    <view class="detail-header">
      <view class="title">{{ articleDetail.title }}</view>
      <view class="content">
        <text v-if="articleDetail.created_at !== undefined"> ⏰ 发布于 {{ UpdateTime }} |</text>
        <text v-if="articleDetail.updated_at !== undefined"> ⏳️ 最后更新 {{ createTime }} |</text>
        <text v-if="articleDetail.word_count !== undefined"> 📄 文章字数 {{ articleDetail.word_count }} |</text>
        <text v-if="articleDetail.likes_count !== undefined"> 👍 {{ articleDetail.likes_count }}个赞 |</text>
        <text v-if="articleDetail.comments_count !== undefined"> 💬 {{ articleDetail.comments_count }}条评论</text>
      </view>
      <view class="content">
        
      </view>
    </view>
    <view class="detail-wrapper">
      <view class="copytext" @click="copyLink()">语雀原文链接</view>
      <rich-text v-if="nodes" :nodes="nodes"></rich-text>
    </view>
  </view>
</template>

<script>
import service from '@/service'
import parseHtml from '@/utils/richParse.js'

export default {
  data () {
    return {
      loading: true,
      articleDetail: {},
      nodes: '',
    }
  },
  computed: {
    UpdateTime () {
        return this.$dayjs(this.articleDetail && this.articleDetail.updated_at).format('YYYY-MM-DD')
    },
    createTime () {
        return this.$dayjs(this.articleDetail && this.articleDetail.created_at).format('YYYY-MM-DD')
    }
  },
  props: {
    namespace: {
      default: '',
      type: String
    },
    slug: {
      default: '',
      type: String
    }
  },
  methods: {
    copyLink() {
      const data = `https://www.yuque.com/u21228658/pxde34/${this.slug}`;
      uni.setClipboardData({
        data,
        success: () => {
          uni.showToast({
            title: "链接复制成功",
            duration: 2000,
          });
        },
      });
    },
  },
  async mounted () {
    this.loading = true
    let res = await service.getArticleDetail(this.namespace, this.slug)
    if (res && res.data && res.data.data) {
      this.loading = false
      this.articleDetail = res.data.data
      const nodes = parseHtml(this.articleDetail.body_html.replace("<!doctype html>", ""))
      const nodesDfs = (node) => {
        if(node.name == 'img') {
          node.attrs.style = 'width: 100%'
        }
        if(node.name == 'span' && node.attrs.class == 'ne-text') {
          node.attrs.style = 'wordBreak: break-all;'
        }
        if(node.children) {
          const children = node.children
          for(let i=0;i<children.length;i++) {
            nodesDfs(children[i])
          }
        }
      }
      nodes.forEach((item, index)=>{
        nodesDfs(item)
      })
      this.nodes = nodes
    }
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
    height: 400rpx;
    display: flex;
    align-items: center;
  }
  .content {
    color: #fff; 
  }
}
.detail-wrapper {
  padding: 10rpx 20rpx;
  font-size: 32rpx;
  background: rgba(255,255,255,.6);
  margin: 30rpx;
  border-radius: 30rpx;
  img {
    width: 100px;
  }
}
.copytext {
  color: #0400ff;
  margin: 10rpx 0;
}
</style>
