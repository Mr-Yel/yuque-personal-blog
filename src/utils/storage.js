export const storage = {
	// 设置永久缓存
	set(key, val, successCallback) {
		const item = {
			data: val
		}
		uni.setStorage({
			key,
			data: JSON.stringify(item),
			success: successCallback && successCallback()
		})
	},
	// 获取永久缓存
	async get(key, successCallback) {
		return new Promise((resolve, reject)=>{
			uni.getStorage({
				key,
				success: (res)=>{
					try {
						const item = JSON.parse(res.data)
						resolve(item.data)
					} catch (error) {
						reject(res)
					}
				}
			});
		})
	},
	// 移除永久缓存
	remove(key, successCallback) {
		uni.removeStorage({
			key,
			success: successCallback && successCallback()
		});
	},
	// 移除全部永久缓存
	clear() {
		uni.clearStorage();
	}
}