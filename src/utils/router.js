import store from '@/store/index'

function routerGoBack() {
  let url = store.getters.prevPage
  uni.navigateBack({ 
  // uni.redirectTo({ 
    url,
    success: () => { store.commit('routerPop') },
    fail:(error)=>console.log(error)
  })
}

function routerPush(url) {
  uni.navigateTo({
  // uni.redirectTo({ 
    url,
    success: () => { store.commit('routerPush', url) },
    fail:(error) => console.log(error)
  })
}

export default { 
  routerGoBack,
  routerPush
}