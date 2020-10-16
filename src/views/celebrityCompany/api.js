import fetch from '@/api/fetch.js'
import qs from 'qs'

//获取股份奖项模块
export function queryCategory (queryData) {
  return fetch({
    url: `/kukacms/visitor/categoryV2/selectid.htm`,
    // url: `/kukacms/visitor/categoryV2/selectmerge.htm`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}