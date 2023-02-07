<template>
  <div class="data_box">
    <base-navbar :bgColor="baseNavbarBgColor"/>
    <Top/>
    <div class="budget">
      <Budget/>
    </div>
  </div>
  <List :customNavHeight="customNavHeight"/>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {onLoad} from '@dcloudio/uni-app';
import {getElement} from '@/tools/element.tools';
import Top from './components/top.vue';
import Budget from './components/budget.vue';
import List from './components/list.vue';

let customNavHeight = ref<Number>(0); // index-list 的排除高度

let baseNavbarBgColor = ref<String>('#f9db61'); // 头部背景颜色

onLoad(async () => {
  const {height}: anyObj = await getElement('.data_box');
  customNavHeight.value = height;
  uniCloud.callFunction({
    name: "home"
  }).then(res => {
    console.log(res)
  })
});
</script>

<style>
/*隐藏list右边快速选项*/
::v-deep .u-index-list__letter {
  display: none !important;
}
</style>
<style lang="scss" scoped>
.budget {
  margin-top: -80rpx;
}
</style>
