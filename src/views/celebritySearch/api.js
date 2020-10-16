import fetch from '@/api/fetch.js'
import qs from 'qs'

//获取股份奖项模块
export function searchAny (queryData) {
  return fetch({
    url: `/kukacms/visitor/celebrityPersonV2/selectContent.htm`,
    method: 'post',
    data: qs.stringify(queryData)
  })
}