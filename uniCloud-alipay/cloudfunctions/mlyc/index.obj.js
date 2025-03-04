const union = require('@blueislandx/island-union-sdk')

const client = new union.taobao.Client({
    appKey: '33025424',
    secretKey: '3e033023bd1c200458ac80882b2f589f'
});

module.exports = {
	_before: function () {

	},
	async taobao(params) {
		const result = await client.execute(params.url,params.option);
		return result
	}
}
