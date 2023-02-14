import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
var dayjs = require('dayjs');
import "./scss/main.scss";

Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.$dayjs = dayjs;

Vue.mixin({
  onPageScroll (res) {
    // TODO: 节流
    Vue.prototype.scrollTop = res.scrollTop
    uni.$emit('onPageScroll', res.scrollTop);//传递参数
  }
})
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
