import fetch from '@/api/fetch.js'
import qs from 'qs'

//获取个人信息
export function queryPerson (queryData) {
  return fetch({
    url: `/kukacms/visitor/a01/selectOne.htm`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}
//获取个人奖项（按时间排序）
export function queryTimePrize (queryData) {
  return fetch({
    url: `/kukacms/visitor/celebrityPersonV2/selectAbstract.htm`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}