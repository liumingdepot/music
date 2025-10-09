<template>
  <view>
    <Header v-model="state.navIndex"/>
    <Model1 v-if="state.navIndex == 0" @playList="playList"/>
    <Model2 v-if="state.navIndex == 1" @playList="playList"/>
  </view>
</template>

<script setup>
import {reactive} from 'vue'
import Model1 from "./model/model1.vue";
import Model2 from "./model/model2.vue";
import Header from "./model/header.vue";

const state = reactive({
  navIndex: 0,
})

const playList = (e) => {
  console.log(e)
}
</script>

<style scoped lang="scss">

</style>