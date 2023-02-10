<template>
  <div class="data_box">
    <base-navbar :bgColor="baseNavbarBgColor"/>
    <Top/>
    <div class="budget">
      <Budget/>
    </div>
  </div>
  <List v-if="list.length > 0" :customNavHeight="customNavHeight" :list="list"/>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import {onLoad, onPageScroll, onShow} from '@dcloudio/uni-app';
import {getElement} from '@/tools/element.tools';
import Top from './components/top.vue';
import Budget from './components/budget.vue';
import List from './components/list.vue';
import uniApi from "@/tools/uniCloudRequest";

let customNavHeight = ref<Number>(0); // index-list 的排除高度
let baseNavbarBgColor = ref<String>('#f9db61'); // 头部背景颜色


// 获取账单列表数据
let list = ref<anyObj[]>([{}]);
const accountParams = reactive<anyObj>({page: 0, year: '2023', month: '2'});
const getAccountList = () => {
  accountParams.page++;
  uniApi('account/get_account_list', accountParams).then((res: any) => {
    list.value = res
  })
}

onLoad(async () => {
  const {height}: anyObj = await getElement('.data_box');
  customNavHeight.value = height;
});

onShow(() => {
  accountParams.page = 0;
  getAccountList();
})
onPageScroll(getAccountList)
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
