import httpService from './HttpService.js';
import { CONFIG } from '../config'

const service = {
  getArticleList(url, data) {
    return httpService.get({
      url: `${CONFIG.API}/repos/u21228658/qu01y9/docs`,
      data
    })
  },
  getArticleListInfo(nameSpace) {
    return httpService.get({
      url: `${CONFIG.API}/repos/${nameSpace}/docs`,
    })
  },
  getArticleDetail(nameSpace, slug) {
    return httpService.get({
      url: `${CONFIG.API}/repos/${nameSpace}/docs/${slug}`,
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
  getReposDetail(nameSpace) {
    return httpService.get({
      url: `${CONFIG.API}/repos/${nameSpace}`,
    })
  },
}
export default service
