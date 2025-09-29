<template>
  <view>
    <image :src="imgSrc" class="bofang"/>
  </view>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps(['playItem'])

const imgSrc = computed(() => {
  if (props.playItem.web_albumpic_short) {
    return 'https://img2.kuwo.cn/star/albumcover/' + props.playItem.web_albumpic_short
  } else {
    return '/static/logo.png'
  }
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