<template>
  <view class="model1">
    <input type="text" class="search" placeholder="请输入歌曲名" v-model="state.searchValue">
    <view class="list">
      <z-paging ref="paging" v-model="state.dataList" @query="queryList" :fixed="false">
        <view class="item" v-for="(item,index) in state.dataList" :key="index" @click="gotoPlay(item)">
          <view>
            <view>{{ item.SONGNAME }}</view>
            <view class="ARTIST">{{ item.ARTIST }} · {{ item.ALBUM }}</view>
          </view>
          <image src="/static/music/play.png" class="play"></image>
        </view>
      </z-paging>
    </view>
  </view>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {musicList} from "../utils/server";

const emit = defineEmits(['playItem'])
const paging = ref(null)

const state = reactive({
  searchValue: '周杰伦',
  dataList: []
})

function queryList(num) {
  musicList({
    key: state.searchValue,
    num: num - 1
  }).then(res => {
    paging.value.complete(res.abslist);
  })
}

function gotoPlay(item) {
  const index = state.dataList.findIndex(e=>e.DC_TARGETID==item.DC_TARGETID)
  emit('playList', {
    index,
    list: state.dataList
  })
}
</script>

<style lang="scss">
.model1 {
  .search {
    width: 690rpx;
    margin: 0 auto;
    box-sizing: border-box;
    height: 64rpx;
    border-radius: 40rpx;
    padding: 0 20rpx;
    background: rgba(255, 255, 255, 0.5);
  }

  .list {
    padding: 30rpx;
    height: calc(100vh - var(--status-bar-height) - var(--window-bottom) - 100rpx - 64rpx - 60rpx);
    // 隐藏滚动条
    ::-webkit-scrollbar {
      display: none;
    }

    .item {
      width: 100%;
      box-sizing: border-box;
      height: 116rpx;
      border-radius: 16rpx;
      background: rgba(255, 255, 255, 0);
      backdrop-filter: blur(40rpx);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 32rpx;

      .ARTIST {
        font-size: 24rpx;
        color: rgba(118, 119, 122, 1);
      }

      .play {
        width: 36rpx;
        height: 36rpx;
      }
    }
  }
}
</style>