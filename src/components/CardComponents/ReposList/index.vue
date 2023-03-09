<template>
  <CardFrame class="ReposList">
    <view class="ReposList_title">我的知识库</view>
    <view class="ReposList_content">
      <view class="ReposList_item" v-for="(repos, index) in reposListInfo.slice(0,5)" :key="index">
        <view class="repos_card" @click="goToReposDetailList(repos)">
         <view class="repos_title">{{repos.name}}({{repos.items_count}})</view> 
         <text class="iconfont icon-enter"></text> 
        </view>  
      </view>
      <view class="look_more" v-if="reposListInfo.length > 5" @click="goToReposList()">查看更多</view>
    </view>
    <u-empty 
      v-if="reposListInfo.length == 0"
      icon="http://cdn.uviewui.com/uview/empty/data.png"
    ></u-empty>
  </CardFrame>
</template>
  
<script>
import CardFrame from '@/components/CardComponents/CardFrame'
import service from '@/service'
import { storage } from '@/utils/storage'

export default {
  name: "ReposList",
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
      reposListInfo: [],
    };
  },
  async mounted () {
    const id = await storage.get('userId')
    let res = await service.getReposListInfo(id)
    if(res && res.data && res.data.data) {
      this.reposListInfo = res.data.data
    }
  },
  methods: {
    goToReposDetailList(repos) {
      const { namespace } = repos
      this.$routerPush(`/pages/reposDetailList/index?namespace=${namespace}`)
    },
    goToReposList() {
      this.$routerPush(`/pages/reposList/index`)
    }
  }
}
</script>

<style scoped lang="scss">
.ReposList {
  font-size: 16px;
  .ReposList_title {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
  }
}
.repos_card {
  display: flex;
  padding: 10px 20px;
  background: #e9e9e9;
  border-radius: 8px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
}
.look_more {
  text-align: center;
}
</style>