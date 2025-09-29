<template>
  <view class="model4">
    model4
  </view>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {musicListAll} from "../utils/server";

const emit = defineEmits(['playItem'])
const paging = ref(null)

const state = reactive({
  navIndex: 0,
  searchValue: '周杰伦',
  dataList: []
})

function queryList(num) {
  if (state.navIndex == 0) {
    videoList({
      key: state.searchValue,
      num: num - 1
    }).then(res => {
      console.log(res);
      paging.value.complete(res.abslist);
    })
  }
}

function gotoPlay(item) {
  emit('playItem', item)
}
</script>

<style lang="scss">
.model4 {
  height: 100vh;
}
</style>