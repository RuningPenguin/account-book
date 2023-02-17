<template>
  <div class="data_box">
    <Top :showBgImg="budgetDate.month <= 0" :allMoney="allMoney" @confirm="confirm"/>
    <Budget v-if="budgetDate.month > 0" ref="budget" :data="budgetDate" :canOpenModalStatus="canOpenModalStatus"
            @setExpenditure="setExpenditure"/>
  </div>
  <List v-show="list.length > 0" :customNavHeight="customNavHeight" :status="status" :list="list"
        :loadmore="getAccountList"/>
  <u-empty
      v-show="list.length <= 0"
      mode="history"
      icon="http://cdn.uviewui.com/uview/empty/history.png"
      :marginTop="$u.addUnit(customNavHeight - 44,'rpx')"
  />
</template>

<script setup lang="ts">
import {computed, ComputedRef, getCurrentInstance, onMounted, ref, toRefs} from 'vue';
import {getElement} from '@/tools/element.tools';
import Top from "@/pages/home/components/top.vue";
import Budget from './components/budget.vue';
import List from './components/list.vue';
import useHomeStore from "@/store/home";
import {createBudgetApi} from "@/apis/home";

const instance = getCurrentInstance()
const {state, getAccountList, reloadList} = useHomeStore();
const {accountParams, list, status, allMoney, budgetDate} = toRefs(state);

const budget = ref();
const nowYear = uni.$u.timeFormat(Date.now(), 'yyyy')
const nowMonth = uni.$u.timeFormat(Date.now(), 'mm')

let customNavHeight = ref<Number>(0); // index-list 的排除高度
let baseNavbarBgColor = ref<String>('#f9db61'); // 头部背景颜色


// 是否能打开预算弹框
const canOpenModalStatus: ComputedRef<boolean> = computed(() => accountParams.value.year === nowYear && accountParams.value.month === nowMonth);

// 获取选择日期
const confirm = (data: string) => {
  const params = {year: '', month: ''};
  const [year, month] = data.split('-');
  params.year = year;
  params.month = month;

  reloadList(params);
}

// 设置预算
const setExpenditure = async (money: number) => {
  await createBudgetApi({money})
  budget.value.close()

  reloadList();
};

onMounted(async () => {
  await getAccountList();
  const {height}: anyObj = await getElement('.data_box', false, instance);
  customNavHeight.value = height;
});
</script>

<style>
/*隐藏list右边快速选项*/
::v-deep .u-index-list__letter {
  display: none !important;
}
</style>
