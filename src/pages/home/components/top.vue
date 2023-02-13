<template>
  <div class="top">
    <div class="label">
      <div class="label_title">{{ $u.timeFormat(datetime, 'yyyy-mm').split('-')[0] }}年</div>
      <div class="label_title">收入</div>
      <div class="label_title">支出</div>
    </div>
    <div class="content_box">
      <div class="content" @click="datetimePickerShow=true">
        <span class="f-48">{{ $u.timeFormat(datetime, 'yyyy-mm').split('-')[1] }}</span>
        <span>月</span>
        <u-icon name="arrow-down-fill" color="#333" style="display: inline-block; margin-left: 10px"/>
      </div>
      <div class="content">
        <span
            v-for="(num, idx) in createMoneyArray(allMoney.expenditure)"
            :key="idx"
            :class="{'f-36':idx===0, 'f-28':idx===1}"
        >
          {{ idx === 1 ? "." : "" }}{{ num }}
        </span>
      </div>
      <div class="content">
				<span
            v-for="(num, idx) in createMoneyArray(allMoney.income)"
            :key="idx"
            :class="{'f-36':idx===0, 'f-28':idx===1}"
        >
          {{ idx === 1 ? "." : "" }}{{ num }}
        </span>
      </div>
    </div>
  </div>

  <u-datetime-picker
      v-model="datetime"
      title="选择月份"
      mode="year-month"
      confirmColor="#f9db61"
      visibleItemCount="10"
      :show="datetimePickerShow"
      :maxDate="Number(new Date())"
      :closeOnClickOverlay="true"
      @cancel="closeDatetimePicker"
      @confirm="confirmDatetimePicker"
  />
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps({
  allMoney: {required: true, type: Object, default: () => ({})}
})

const emits = defineEmits(['confirm'])

let baseNavbarBgColor = ref<String>("#f9db61"); // 头部背景颜色
let datetimePickerShow = ref<Boolean>(false); // 日期选择弹框
let datetime = ref<Number>(Number(Date.now())); // 头部背景颜色

// 关闭日期弹框
const closeDatetimePicker = () => {
  datetimePickerShow.value = false;
}
// 确认日期
const confirmDatetimePicker = ({value}: any) => {
  closeDatetimePicker();
  datetime.value = value;
  emits('confirm', uni.$u.timeFormat(datetime.value, 'yyyy-mm'))
}

//
const createMoneyArray = (num: number) => {
  return (String(num).includes('.') ? String(num) : String(num) + '.00').split('.')
}
</script>

<style lang="scss" scoped>
.top {
  padding: 20rpx 32rpx 0;
  height: 240rpx;
  background-image: linear-gradient(to bottom, $qie-color 80%, #fff 100%);

  .label {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .label_title {
      flex: 0 0 30%;
      font-size: 24rpx;
      color: #836d18;
    }
  }

  .content_box {
    margin-top: 10rpx;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    .content {
      flex: 0 0 30%;
      position: relative;

      &:first-child::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 20%;
        background: #333;
        width: 2rpx;
        height: 100%;
      }
    }
  }
}
</style>
