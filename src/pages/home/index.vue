<template>
  <div class="data_box">
    <base-navbar :bgColor="baseNavbarBgColor"/>
    <Top :allMoney="allMoney" @confirm="confirm"/>
    <Budget ref="budget" :canOpenModalStatus="canOpenModalStatus" @setExpenditure="setExpenditure"/>
  </div>
  <List v-show="list.length > 0" :customNavHeight="customNavHeight" :status="status" :list="list"
        :loadmore="getAccountList"/>
</template>

<script setup lang="ts">
import {computed, ref, toRefs} from 'vue';
import {onLoad} from '@dcloudio/uni-app';
import {getElement} from '@/tools/element.tools';
import Top from "@/pages/home/components/top.vue";
import Budget from './components/budget.vue';
import List from './components/list.vue';
import useHomeStore from "@/store/home";

const {state, getAccountList, updateAccountParams, updateList} = useHomeStore();
const {accountParams, list, status, allMoney} = toRefs(state);

const budget = ref();
const nowYear = uni.$u.timeFormat(Date.now(), 'yyyy')
const nowMonth = uni.$u.timeFormat(Date.now(), 'mm')

let customNavHeight = ref<Number>(0); // index-list 的排除高度
let baseNavbarBgColor = ref<String>('#f9db61'); // 头部背景颜色


// 是否能打开预算弹框
const canOpenModalStatus = computed(() => accountParams.value.year === nowYear && accountParams.value.month === nowMonth);

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

// 设置预算
const setExpenditure = (money: number) => {
  console.log(money)
  budget.value.close()
  // createBudgetApi({money:100})
};

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
