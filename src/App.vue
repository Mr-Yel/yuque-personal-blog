<script>
import service from '@/service'
import { storage } from '@/utils/storage'

export default {
  globalData: {
    phoneHeight: 0
  },
  onLaunch: async function () {
    let phoneHeight = await this.initSafeHeight()// 初始化安全高度
    this.globalData.phoneHeight = phoneHeight  
    let res = await service.getUserInfo()
    if(res && res.data && res.data.data) {
      const userInfo = res.data.data
      storage.set('userInfo', userInfo)
      storage.set('userId', userInfo && userInfo.id)
      console.log('App Launch')
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods: {
    initSafeHeight () {
      return new Promise(function(resolve, reject){
        uni.getSystemInfo({
          success: function (res) {
            resolve(res.statusBarHeight)
          }
        })
      });
     
    }
  }
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
/*每个页面公共css */
// @import './static/css/base.css';
//   /* scss公共类 */
@import "./scss/base/setting.scss";
@import "./scss/font/iconfont-weapp-icon.css";
@import "./scss/base/bg.scss";
page::before {
  content: '';
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background: $light-bg;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
/*每个页面公共css */
</style>
