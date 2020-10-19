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
//获取单位奖项模块
export function queryCategoryDan (queryData) {
  return fetch({
    url: `/kukacms/visitor/categoryV2/selectid.htm`,
    // url: `/kukacms/visitor/categoryV2/selectmerge.htm`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//首页轮播图
export function queryCarousel (queryData) {
  return fetch({
    // url: `/kukacms/visitor/carousel/selectListAndOrgin.htm`,
    url: `/kukacms/visitor/carousel/selectList.htm`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//首页轮播图/
export function selectDepartAndPersonByDepartCode (queryData) {
  return fetch({
    url: `/kukacms/visitor/a01/selectDepartAndPersonByDepartCode.htm`,
    // url: `/kukacms/visitor/carousel/selectList.htm`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
