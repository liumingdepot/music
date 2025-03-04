<template>
	<view class="content">
		<input type="text" v-model="state.q">
		<button @click="initData">搜索</button>

		<view class="grid">
			<view class="item" v-for="(item,index) in state.dataList" :key="index">
				<image :src="item.item_basic_info.pict_url" mode=""></image>
				<view class="title">{{item.item_basic_info.shop_title}}</view>
				<view class="title">{{item.item_basic_info.short_title}}</view>
				<view class="title">{{item.item_basic_info.provcity}}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onMounted, reactive } from 'vue';

	const { taobao } = uniCloud.importObject('mlyc')

	const state = reactive({
		q: '女装',
		dataList: []
	})


	onMounted(() => {
		initData()
	})


	const initData = () => {
		taobao({
			url: 'taobao.tbk.dg.material.optional.upgrade',
			option: {
				page_size: 20,
				page_no: 1,
				q: state.q,
				material_id:'17004',
				cat:'50000697',
				adzone_id: '111599450329',
			}
		}).then(res => {
			console.log(res.result_list.map_data);
			state.dataList = res.result_list.map_data
		})
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #eee;
	}

	input {
		border: 2rpx solid #ccc;
		margin: 12rpx 24rpx;
		padding: 8rpx 16rpx;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20rpx;
		padding: 24rpx;

		.item {
			background-color: #fff;

			.title {
				padding: 12rpx;
			}

			image {
				width: 100%;
				height: 300rpx;
			}
		}
	}
</style>