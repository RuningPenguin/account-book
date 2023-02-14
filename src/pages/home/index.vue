<template>
  <div class="data_box">
    <base-navbar :bgColor="baseNavbarBgColor"/>
    <Top :allMoney="allMoney" @confirm="confirm"/>
    <div class="budget">
      <Budget/>
    </div>
  </div>
  <List v-show="list.length > 0" :customNavHeight="customNavHeight" :status="status" :list="list"
        :loadmore="getAccountList"/>
</template>

<script setup lang="ts">
import {ref, toRefs} from 'vue';
import {onLoad} from '@dcloudio/uni-app';
import {getElement} from '@/tools/element.tools';
import Top from './components/top.vue';
import Budget from './components/budget.vue';
import List from './components/list.vue';
import useHomeStore from "@/store/home";

const {state, getAccountList, updateAccountParams, updateList} = useHomeStore();
const {accountParams, list, status, allMoney} = toRefs(state);

let customNavHeight = ref<Number>(0); // index-list 的排除高度
let baseNavbarBgColor = ref<String>('#f9db61'); // 头部背景颜色


// 获取选择日期
const confirm = (data: string) => {
  const params = {year: '', month: ''};
  const [year, month] = data.split('-');
  params.year = year;
  params.month = month;

  updateAccountParams(params)
  updateList([])
  getAccountList();
}

// 获取下一月 或 上一月
// const getMonth = (year: string|number, month: string|number, type:'next'|'prev'):[string] => {
//   const d = new Date();
//   const result = []
//   const monthList = [1,2,3,4,5,6,7,8,9,10,11,12];
//   const days = getMonthDay(year,month);
//   const nowYear = d.getFullYear();
//   const nowMonth = d.getMonth() + 1;
// }


onLoad(async () => {
  const {height}: anyObj = await getElement('.data_box');
  customNavHeight.value = height;

  getAccountList();
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
