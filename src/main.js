import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import store from '@/store/index'
import routerCtr from '@/utils/router'
import "./scss/main.scss";

Vue.use(uView);

var dayjs = require('dayjs');

Vue.config.productionTip = false
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$routerGoBack = routerCtr.routerGoBack;
Vue.prototype.$routerPush = routerCtr.routerPush;

Vue.mixin({
  onPageScroll (res) {
    // TODO: 节流
    Vue.prototype.scrollTop = res.scrollTop
    uni.$emit('onPageScroll', res.scrollTop);//传递参数
  }
})
App.mpType = 'app'

const app = new Vue({
  ...App,
  store: store, 
})
app.$mount()
