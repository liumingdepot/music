import axios from '@/common/axios.js'
import {getVideoList} from './getVideoList'

/**
 * 推荐
 */
export const getTuijianVideo = (params) => {
  const url = 'http://cj.lziapi.com/api.php/provide/vod/'
  let type_id = params.type_id;
  return axios({
    url: url + `?t=${type_id}&ac=videolist&pg=${params.pagenum}`
  }).then((res) => {
    const arr = []
    for (let item of res.list) {
      item.vod_play_url_video = getVideoList(item, '量子资源')
      arr.push(item)
    }
    return arr
  })
}

/**
 * 搜索
 */
export const searchVideo = async (videoType) => {
  const videoTypeList = [
    {name: '量子', url: 'http://cj.lziapi.com/api.php/provide/vod/'},
    {name: '新浪', url: 'http://api.xinlangapi.com/xinlangapi.php/provide/vod/'},
  ]
}