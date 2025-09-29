<template>
  <view class="music">
    <Header v-model="state.navIndex"/>
    <Model1 v-if="state.navIndex == 0" @playItem="playItem"/>
    <Model2 v-if="state.navIndex == 1" @playItem="playItem"/>
    <Model3 v-if="state.navIndex == 2" @playItem="playItem"/>
    <Model4 v-if="state.navIndex == 3" @playItem="playItem"/>
    <Music :playItem="state.playItem"/>
  </view>
</template>

<script setup>
import {reactive} from 'vue'
import Header from './model/header.vue'
import Music from './model/music.vue'
import Model1 from './model/model1.vue'
import Model2 from './model/model2.vue'
import Model3 from './model/model3.vue'
import Model4 from './model/model4.vue'
import {videoItem} from "./utils/server";

const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = false;

const state = reactive({
  navIndex: 0,
  playItem: uni.getStorageSync('playItem') || {},
})

function playItem(item){
  innerAudioContext.pause();
  state.playItem = item;
  videoItem({rid:item.DC_TARGETID}).then(res=>{
    state.playItem.src = res.url;
    innerAudioContext.src = res.url;
    innerAudioContext.play();
    uni.setStorageSync('playItem', item);
  })
}
</script>

<style>
page {
  background-image: url("/static/music/music.png");
  background-size: 100% 100%;
}
</style>

<style scoped lang="scss">

</style>