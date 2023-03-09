import httpService from './HttpService.js';
import { CONFIG } from '../config'

const service = {
  getArticleList(url, data) {
    return httpService.get({
      url: `${CONFIG.API}/repos/u21228658/qu01y9/docs`,
      data
    })
  },
  getArticleListInfo(namespace) {
    return httpService.get({
      url: `${CONFIG.API}/repos/${namespace}/docs`,
    })
  },
  getArticleDetail(namespace, slug) {
    return httpService.get({
      url: `${CONFIG.API}/repos/${namespace}/docs/${slug}`,
    })
  },
  getUserInfo() {
    // 需要 X-Auth-Token
    return httpService.get({
      url: `${CONFIG.API}/user`,
    })
  },
  getReposListInfo(id) {
    const data = {
      id
    }
    return httpService.get({
      url: `${CONFIG.API}/users/${id}/repos`,
      data
    })
  },
  getReposDetail(namespace) {
    return httpService.get({
      url: `${CONFIG.API}/repos/${namespace}`,
    })
  },
}
export default service
