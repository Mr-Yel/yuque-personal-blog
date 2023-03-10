export default {
	data() {
		return {
			// 默认的全局分享内容
			share: {
				title: 'hxk的个人博客',
				// path: '/pages/index/index',    // 全局分享的路径，比如 首页
				// desc: 'hxk的个人博客',    // 全局分享的路径，比如 首页
				imageUrl: '',    // 全局分享的图片(可本地可网络)
			}
		}
	},
	// 定义全局分享
	// 1.发送给朋友
	onShareAppMessage(res) {
		return {
			title: this.share.title,
			path: this.share.path,
			desc: this.share.desc,
			imageUrl: this.share.imageUrl,
		}
	},
	//2.分享到朋友圈
	onShareTimeline(res) {
		return {
			title: this.share.title,
			path: this.share.path,
			desc: this.share.desc,
			imageUrl: this.share.imageUrl,
		}
	},
}