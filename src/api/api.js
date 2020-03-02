// import base from './base' // 导入接口域名列表
// import axios from './http.js' // 导入http中创建的axios实例
// import qs from 'qs' // 根据需求是否导入qs模块
import axios from 'axios'

const base = {
  sq: 'http://www.5qipa.com/',
  bd: 'http://localhost:8888'
}

const api = {
  // 导航
  getNavList () {
    return axios.get(`${base.sq}/app/home/cate`)
  },
  // 搜索
  getSearchList (params) {
    return axios.post(`${base.sq}/app/home/search`, params)
  },
  // 列表
  getListData (params) {
    return axios.post(`${base.sq}/app/home/list`, params)
  },
  // 文章
  getArticleData (params) {
    return axios.post(`${base.sq}/app/article/info`, params)
  },
  // 点评文章
  getAddComment (params) {
    return axios.post(`${base.sq}/app/article/addComment`, params)
  },
  // 获取访问最最高的几条文章
  getHotArtData () {
    return axios.get(`${base.sq}/app/public/hotArt`)
  },
  // 获取最新发布的几条文章
  getNewArtData () {
    return axios.get(`${base.sq}/app/public/newArt`)
  },
  // 获取最新的几条点评
  getNewCommentData () {
    return axios.get(`${base.sq}/app/public/newComment`)
  },
  // 关于
  getAbout () {
    return axios.get(`${base.sq}/app/home/about`)
  },
  // 搜索栏目中 显示的文章条数
  getArticleCount () {
    return axios.get(`${base.sq}/app/public/articleCount`)
  },
  // 文章阅读总数
  getArticleReadCount () {
    return axios.get(`${base.sq}/app/public/articleReadCount`)
  }
}

export default api
