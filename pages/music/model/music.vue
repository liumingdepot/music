<template>
  <view>
    <wd-action-sheet v-model="show" title="播放列表">
     <view class="list">
       <view
           class="item"
           :class="{active:playIndex == index}"
             v-for="(item,index) in playListData"
             :key="index"
             @click="playItem(item,index)">
         <view>
           <view>{{ item.NAME }}</view>
           <view class="ARTIST">{{ item.ARTIST }}</view>
         </view>
         <image src="/static/music/play.png" class="play"></image>
       </view>
     </view>
    </wd-action-sheet>
    <image :src="imgSrc" class="bofang" @click="show = true"/>
  </view>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import {musicItem} from "@/pages/music/utils/server";

const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = false;

const props = defineProps(['playList']);

const show = ref(false);
const imgSrc = ref('/static/logo.png');
const playIndex = ref(0);
const playListData = ref([]);


function initPlayList(e,op){
  console.log('show',op.show);
  console.log('play',op.play);
  show.value = op.show;
  playListData.value = e.list
  if(op.play){
    playItem(e.list[e.index],e.index)
  }
}

function playItem(item,index) {
  innerAudioContext.pause();
  playIndex.value = index
  uni.setStorageSync('musicPlayList', {
    index,
    list: playListData.value
  });
  if (item.web_albumpic_short) {
    imgSrc.value =  'https://img2.kuwo.cn/star/albumcover/' + item.web_albumpic_short
  } else {
    imgSrc.value = '/static/logo.png'
  }
  musicItem({rid: item.DC_TARGETID}).then(res => {
    innerAudioContext.src = res.url;
    innerAudioContext.play();
  })
}


//暴露函数父组件 ref
defineExpose({
  initPlayList
})
</script>

<style lang="scss" scoped>
// 旋转动画
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.list {
  padding: 30rpx;
  height: 65vh;
  overflow: auto;

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

  .active{
    color: #13eaa3;
  }
}

.bofang {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  position: absolute;
  right: 20rpx;
  bottom: 20rpx;
  animation: rotate 10s linear infinite;
}
</style>