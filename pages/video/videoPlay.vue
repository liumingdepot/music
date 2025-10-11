<template>
	<view class="box">
		<web-view :src="src" class="video" @message="fullscreenchange"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
			}
		},
		onUnload() {
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary')
			// #endif
		},
		onLoad() {
			const videoItem = uni.getStorageSync('videoList');
			this.src = `/hybrid/html/index.html?url=${videoItem.url}&title=${videoItem.title}&poster=${videoItem.poster}`
			console.log(this.src);
			uni.setNavigationBarTitle({
				title: videoItem.title
			});
		},
		methods: {
			fullscreenchange(e) {
				const fullScreen = e.detail.data[0].isFullscreen
				if (fullScreen == 1) {
					plus.screen.lockOrientation('landscape-primary')
				} else {
					plus.screen.lockOrientation('portrait-primary')
				}
			},
		}
	}
</script>

<style>
	.box {
		height: 100vh;
		background-color: #000;
	}
</style>
