import httpService from './HttpService.js';
import { CONFIG } from '../config'

const service = {
  getArticleList(url, data) {
    return httpService.get({
      url: `https://www.yuque.com/api/v2/repos/u21228658/qu01y9/docs`,
      data
    })
  }
}
export default service
