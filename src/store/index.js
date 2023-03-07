import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

// 创建一个新的 store 实例
export default new Vuex.Store({
  state () {
    return {
      count: 0,
      pageRouter: [],
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    routerPush(state, url) {
      state.pageRouter.push(url)
      console.log('state.pageRouter',state.pageRouter);
    }
  },
  getters: {
    curPage (state) {
      return state.pageRouter[state.pageRouter.length-1]
    }
  }
})

