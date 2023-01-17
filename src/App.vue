<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
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
body {
  color: $color-primary;
}
/*每个页面公共css */
</style>
