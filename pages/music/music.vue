<template>
  <view class="music">
    <Header v-model="state.navIndex"/>
    <Model1 v-if="state.navIndex == 0" @playList="playList"/>
<!--    <Model2 v-if="state.navIndex == 1" @playItem="playItem"/>-->
    <Model3 v-if="state.navIndex == 2" @playList="playList"/>
<!--    <Model4 v-if="state.navIndex == 3" @playItem="playItem"/>-->
    <Music :playList="state.playList"/>
  </view>
</template>

<script setup>
import {reactive} from 'vue'
import Header from './model/header.vue'
import Music from './model/music.vue'
import Model1 from './model/model1.vue'
// import Model2 from './model/model2.vue'
import Model3 from './model/model3.vue'
// import Model4 from './model/model4.vue'

const state = reactive({
  navIndex: 0,
  playList:{},
})

function playList(e){
  console.log(e);
  uni.setStorageSync('playList', e);
  state.playList = e
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