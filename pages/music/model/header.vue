<template>
  <view class="header">
    <view class="status_bar"></view>
    <view class="navs">
      <view
          v-for="item in navs"
          :key="item.id"
          class="item"
          :class="{active: model === item.id}"
          @click="model = item.id">
        {{ item.name }}
      </view>
    </view>
  </view>
</template>

<script setup>
const model = defineModel();

const navs = [
  {name: '首页', id: 0},
  {name: '推荐', id: 1},
  {name: '排行榜', id: 2},
  {name: '歌单', id: 3},
]
</script>

<style scoped lang="scss">
.header {
  .status_bar {
    height: var(--status-bar-height);
  }

  .navs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100rpx;
    padding: 0 80rpx;

    .item {
      font-size: 28rpx;
    }

    .active {
      font-size: 30rpx;
      font-weight: bolder;
    }
  }
}
</style>