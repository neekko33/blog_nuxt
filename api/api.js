import axios from 'axios'
import base from 'ant-design-vue/lib/base'

const baseUrl = 'http://212.64.78.155:7001/api/v4/'

export const getArticle = (pageNum, pageSize) => {
  return axios({
    method: 'get',
    url: baseUrl + `article?pageNum=${pageNum}&pageSize=${pageSize}`
  })
}

export const getNotice = () => {
  return axios({
    method: 'get',
    url: baseUrl + 'notice'
  })
}

export const getArticleByType = (id, pageNum, pageSize) => {
  return axios({
    method: 'get',
    url:
      baseUrl + `article?typeId=${id}&pageNum=${pageNum}&pageSize=${pageSize}`
  })
}

export const getArticleById = id => {
  return axios({
    method: 'get',
    url: baseUrl + 'article/' + id
  })
}

export const getType = () => {
  return axios({
    method: 'get',
    url: baseUrl + 'type'
  })
}

export const getMsg = async () => {
  return axios({
    method: 'get',
    url: baseUrl + 'message'
  })
}

export const addMsg = data => {
  return axios({
    method: 'post',
    url: baseUrl + 'message',
    data
  })
}

export const getYystvData = () => {
  return axios({
    method: 'get',
    url: baseUrl + 'yysTV'
  })
}

export const getUserInfo = (id) => {
  return axios({
    method: 'get',
    url: baseUrl + `user/${id}`
  })
}
