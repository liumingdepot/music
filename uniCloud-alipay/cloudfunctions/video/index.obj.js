// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
	_before: function() { // 通用预处理器
		this.option = {
			contentType: 'json',
			dataType: 'json'
		}
	},
	async getVideos(key,pg) {
		let videoTypeList = [
			'https://search.lziapi.com/json-api/?dname=liangzi&count=50&key=' + key,
			'https://search.bfzyapi.com/json-api/?dname=baofeng&count=50&key=' + key,
		]
		if(pg){
			videoTypeList = ['https://lbapi9.com/api.php/provide/vod/?ac=videolist&limit=20&pg=' + pg + '&wd=' + key]
		}
		const arr = []
		for (let url of videoTypeList) {
			const item = await uniCloud.httpclient.request(url, this.option)
			if(!item.data.posts){
				item.data.posts = []
			}
			if(!item.data.list){
				item.data.list = []
			}
			for (let v of item.data.posts) {
				arr.push(v)
			}
			for (let v of item.data.list) {
				arr.push(v)
			}
		}
		return arr
	},
	async videoList(num) {
		const url = `https://cj.lziapi.com/api.php/provide/vod/from/lzm3u8/?t=46&ac=videolist&pg=${num}`
		const res = await uniCloud.httpclient.request(url, this.option)
		return res.data.list
	},
	async getTuijianVideo(option) {
		const src = 'https://cj.lziapi.com/api.php/provide/vod/from/lzm3u8/'
		const url = src + `?t=${option.type_id}&ac=videolist&pg=${option.pagenum}`
		const res = await uniCloud.httpclient.request(url, this.option)
		return res.data.list
	}
}