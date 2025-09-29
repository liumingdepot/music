<template>
  <view>
    <wd-action-sheet v-model="show" title="标题">
      <view class="box">
        <view v-for="(item, index) in playList" :key="index"></view>
      </view>
    </wd-action-sheet>
    <image :src="imgSrc" class="bofang" @click=""/>
  </view>
</template>

<script setup>
import {computed, ref} from 'vue'
import {musicItem} from "@/pages/music/utils/server";

const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = false;

const show = ref(false);

const props = defineProps(['playList']);

const imgSrc = computed(() => {
  // if (props.playItem.web_albumpic_short) {
  //   return 'https://img2.kuwo.cn/star/albumcover/' + props.playItem.web_albumpic_short
  // } else {
  //   return '/static/logo.png'
  // }
})


const playList = computed(() => {
  console.log(props.playList);
  if (props.playList?.index) {
    show.value = true;
    uni.setStorageSync('playIndex', props.playList.index);
    return props.playList.list
  } else {
    show.value = false;
    return []
  }
})


function playItem(e) {
  innerAudioContext.pause();
  state.playItem = item;
  musicItem({rid: item.DC_TARGETID}).then(res => {
    state.playItem.src = res.url;
    innerAudioContext.src = res.url;
    innerAudioContext.play();

  })
}
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

.box {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 75vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
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