import axios from '@/common/axios.js'
import kwDES from './kwDES'

// 搜索
export const musicList = (params) => {
  return axios({
    url: `https://www.kuwo.cn/search/searchMusicBykeyWord?vipver=1&client=kt&ft=music&cluster=0&strategy=2012&encoding=utf8&rformat=json&mobi=1&issubtitle=1&show_copyright_off=1&pn=${params.num}&rn=20&all=${params.key}`,
  })
}

// 排行榜
export const musicPhbListAll = (params) => {
  return axios({
    url: `http://wapi.kuwo.cn/api/pc/bang/list`,
  })
}

// 排行榜详情
export const musicPhbListItem = (params) => {
  return axios({
    url: `http://kbangserver.kuwo.cn/ksong.s?from=pc&type=bang&id=${params.id}&pn=0&rn=1000`,
  })
}

// 获取音乐详情
export const musicItem = (params) => {
  const q = kwDES.encryptQuery(`user=0&android_id=0&prod=kwplayerhd_ar_4.3.0.8&corp=kuwo&vipver=4.3.0.8&source=kwplayerhd_ar_4.3.0.8_tianbao_T1A_qirui.apk&notrace=0&type=convert_url2&br=2000&format=flac&sig=0&rid=${params.rid}&priority=bitrate&loginUid=0&network=WIFI&loginSid=0&mode=down`)
  return axios({
    url: `https://nmobi.kuwo.cn/mobi.s?f=kuwo&q=${q}`,
  }).then(res=>{
    return kwDES.parseParamsToJson(res)
  })
}

// 获取歌词
export const getlyric = (params) => {
  return axios({
    url: `https://www.kuwo.cn/openapi/v1/www/lyric/getlyric?musicId=${params.rid}&httpsStatus=1&reqId=d21938f0-9cd9-11f0-9861-2369cae1e1cc&plat=web_www&from=`,
  })
}