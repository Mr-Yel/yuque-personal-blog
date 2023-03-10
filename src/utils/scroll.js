export default {
	data() {
		return {
		}
	},
  onPageScroll (res) {
    // TODO: 节流
    uni.$emit('onPageScroll', res.scrollTop);//传递参数
  }
}