import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import store from '@/store/index'
import routerCtr from '@/utils/router'
import share from '@/utils/share'
import scroll from '@/utils/scroll'
import "./scss/main.scss";

Vue.mixin(share)
Vue.mixin(scroll)
Vue.use(uView);

var dayjs = require('dayjs');

Vue.config.productionTip = false
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$routerGoBack = routerCtr.routerGoBack;
Vue.prototype.$routerPush = routerCtr.routerPush;

App.mpType = 'app'

const app = new Vue({
  ...App,
  store: store, 
})
app.$mount()
