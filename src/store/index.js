import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

// 创建一个新的 store 实例
export default new Vuex.Store({
  state () {
    return {
      count: 0,
      pageRouter: ['/pages/index/index'], // 初始为首页
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    routerPush(state, url) {
      state.pageRouter.push(url)
      console.log('state.pageRouter',state.pageRouter);
    },
    routerPop(state) {
      state.pageRouter.pop()
      console.log('state.pageRouter',state.pageRouter);
    }
  },
  getters: {
    prevPage (state) {
      if(state.pageRouter.length > 1) {
        return state.pageRouter[state.pageRouter.length-2]
      }
      return ''
    },
    curPage (state) {
      return state.pageRouter[state.pageRouter.length-1]
    },
    curPageLength (state) {
      return state.pageRouter.length-1
    }
  }
})

