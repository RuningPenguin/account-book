<template>
  <qie-tabs ref="uTabs" v-bind="tabConfig" :current="current" :list="tabList" @change="tabsChange"/>

  <swiper
      :current="current"
      @transition="transition"
      @animationfinish="animationfinish"
      :style="{height:$u.addUnit(scrollViewHeight)}"
  >
    <swiper-item class="swiper-item" v-for="(item, index) in billList" :key="item">
      <scroll-view scroll-y style="height:100%">
        <u-grid :border="false">
          <u-grid-item
              v-for="(baseListItem,baseListIndex) in item"
              :key="baseListIndex"
              @click="billTypeClick({current,...baseListItem})"
          >
            <u-icon
                :customStyle="{paddingTop:20+'rpx'}"
                :name="baseListItem.name"
                :size="22"
            />
            <text class="grid-text">{{ baseListItem.title }}</text>
          </u-grid-item>
        </u-grid>
      </scroll-view>
    </swiper-item>
  </swiper>


  <u-keyboard
      ref="uKeyboard"
      mode="number"
      :show="keyboardShow"
      :tips="String(Number(money))"
      :showTips="!!Number(money)"
      :showCancel="false"
      :closeOnClickOverlay="true"
      :customStyle="{backgroundColor:'#fff'}"
      @close="close"
      @change="valChange"
      @backspace="backspace"
      @confirm="confirm"
  >
    <u--input
        placeholder="备注"
        border="surround"
        v-model="remark"
        :prefixIcon="prefixIcon"
    />
  </u-keyboard>


</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import billList from "@/config/billType";
import {tabConfig, tabList} from "./data";
import uniApi from "@/tools/uniCloudRequest";

import useHomeStore from "@/store/home";
const {getAccountList, updateAccountParams, updateList} = useHomeStore()

const uTabs = ref(); // tab 实例
const scrollViewHeight = ref<number>(0) // 滑动区域高度 可视高度 - tabs 高度 （默认px）


const current = ref<number>(0); // 当前显示内容索引
const money = ref<string>(''); // 本次记录金额
const keyboardShow = ref<boolean>(false); // 当前显示内容索引
const remark = ref<string>(''); // 备注信息
const prefixIcon = ref<string>('edit-pen'); // 账单类型图标


// 数据初始化
const init = () => {
  scrollViewHeight.value = uni.$u.sys().windowHeight - uTabs.value.height; // 滑动区域高度 可视高度 -  tabs 高度（默认px）
}

onMounted(() => {
  init()
})

// 账单类型点击
const billTypeClick = ({current, name, title}: any) => {
  keyboardShow.value = true;
  prefixIcon.value = name;

  switch (current) {
    case 0: // 支出
      break;
    case 1: // 收入
      break;
  }
}

/**
 * 键盘相关
 */
// 按键被点击(点击退格键不会触发此事件)
const valChange = (val: string) => {
  money.value += val;
  console.log(money.value);
}

// 退格键被点击
const backspace = () => {
  // 删除value的最后一个字符
  if (money.value) money.value = money.value.substr(0, money.value.length - 1);
  console.log(money.value);
}

// 关闭键盘
const close = () => {
  keyboardShow.value = false;
  money.value = '0';
}

// 键盘确认
const confirm = (e: any) => {
  const params = {
    money: Number(money.value),
    account_type: current.value,
    remark: remark.value,
    bill_type: prefixIcon.value
  }

  close();

  uniApi("account/add_data", params).then(() => {
    updateAccountParams({
      year: uni.$u.timeFormat(Date.now(), 'yyyy'),
      month: uni.$u.timeFormat(Date.now(), 'mm')
    })
    updateList([])
    getAccountList()
  })
}

/**
 * 左右滑动相关方法
 */
// tabs通知swiper切换
const tabsChange = (index: number) => current.value = index;

// swiper-item左右移动，通知tabs的滑块跟随移动
const transition = (e: any) => uTabs.value.setDx(e.detail.dx);

// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
const animationfinish = (e: any) => {
  let newCurrent: number = e.detail.current;
  uTabs.value.setFinishCurrent(newCurrent);
  current.value = newCurrent;
}
</script>

<style lang="scss">
.grid-text {
  font-size: 14px;
  color: #909399;
  padding: 10rpx 0 20rpx 0rpx;
}
</style>
