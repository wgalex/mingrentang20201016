import fetch from '@/api/fetch.js'
import qs from 'qs'

//获取股份奖项模块
export function queryCategory (orginCategoryCode) {
  return fetch({
    url: `/kukacms/visitor/categoryV2/selectid.htm?orginCategoryCode=43090`,
    method: 'post',
    // data: qs.stringify(department)
  })
}