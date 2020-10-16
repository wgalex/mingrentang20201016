import fetch from '@/api/fetch.js'
import qs from 'qs'

//获取股份奖项模块
export function queryCategory (queryData) {
  return fetch({
    // url: `/kukacms/visitor/categoryV2/person/selectNext.htm`,
    url: `/kukacms/visitor/celebrityPersonV2/selectV10.htm`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取奖项筛选条件
export function queryRules (queryData) {
  return fetch({
    url: `/kukacms/visitor/categoryV2/selectChice.htm`,
    // url: `/kukacms/visitor/categoryV2/selectOne.htm`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
// //获取股份奖项模块
// export function queryCategory (queryData) {
//   return fetch({
//     url: `/kukacms/visitor/categoryV2/selectid.htm`,
//     method: 'post',
//     data: qs.stringify(queryData)
//   })
// }