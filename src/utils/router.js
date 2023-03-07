import store from '@/store/index'

function routerGoBack() {
	console.log(store);
}

function routerPush(url) {
  console.log(store);
  console.log(store.getters.curPage);
  store.commit('routerPush', url)
  uni.redirectTo({ 
    url,
    fail:(error)=>console.log(error)
  })
}

export default { 
  routerGoBack,
  routerPush
}