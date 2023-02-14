import { AuthToken } from '@/config/index'

/**
 * 基于uni.request 的 请求拦截器和响应拦截器
 * @author huang xiangkun
 * @date 2023-01-16
 */
const baseConfig = {
	baseUrl: "",
	dataType: "json",
	headers: {
		"authorization": "",
		"content-type": "application/json",
		"X-Auth-Token": AuthToken,
		"Content-Type": "application/json",
	}
}

const deepCloneAndAssignObject = (obj1, obj2) => {
	return JSON.parse(JSON.stringify(Object.assign(obj1, obj2)));
}

class HttpService {
	constructor(config = {}) {
		this.config = deepCloneAndAssignObject(baseConfig, config);
		this.interceptor = {
			beforeRequest(config) {
				uni.showLoading();
				return config
			},
			beforeResponse(res) {
				uni.hideLoading();
				return res
			},
			beforeResponseError(e) {
				uni.hideLoading();
				return e
			},
		}
	}
	
	// 发起请求
	request(method = 'GET', url = '', data = {}, refresh) {
		return new Promise((resolve, reject) => {
			// 检查传参
			const requestError = getRequestError(method,url,data)
			if(requestError instanceof Error) {
				this.interceptor.beforeResponseError(requestError);
				reject(requestError.message)
				return
			}
			// 拼接url
			if(/^(http|https):/.test(this.config.baseUrl)) {
				url = this.config.baseUrl + url
			}
			let config = {
				method,
				url,
				data,
				dataType: this.config.dataType,
				header: this.config.headers,
			}
			// 发起请求前
			config = deepCloneAndAssignObject(config,this.interceptor.beforeRequest(config))
			uni.request({
				...config,
				success: (res) => {
					if([200].includes(res.statusCode)) {
						// 请求成功后
						const response = this.interceptor.beforeResponse(res); 
						resolve(response)
					} else {
						// 请求失败后
						this.interceptor.beforeResponseError(res.statusCode);
						reject(res.statusCode)
					}
				},
				// 调用接口失败后
				fail: (e) => {
					this.interceptor.beforeResponseError(-1);
					reject(e)
				}, 
			});
		})
	}
	
	get(option, refresh = true) {
		return this.request('GET', option.url, option.data, refresh)
	}
	
	post(option, refresh = true) {
		return this.request('POST', option.url, option.data, refresh)
	}
}

export default new HttpService();

// 验证请求配置
function getRequestError(method, url, data) {
	if(typeof method !== 'string' || !['GET','POST'].includes(method.toUpperCase())) {
		return new Error('this request mode is not supported:' + method)
	} else if(typeof url !== 'string') {
		return new Error('request url error:' + url)
	} else if(typeof data !== 'object') {
		return new Error('request parameter must be object:', data)
	} else {
		return true
	}
}
