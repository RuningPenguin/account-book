<template>
  <div class="budget_wrap" v-if="showProgress">
    <div class="budget" @click="open">
      <qie-circle-progress
          width="150"
          border-width="10"
          active-color="#f9db61"
          bg-color="transparent"
          :percent="data.dayP"
      >
        <div class="q-flex q-flex-col q-flex-center" v-if="!data.overBudget && data.dayS >= 0">
          <div>{{ data.dayS }}</div>
          <div>今日剩余</div>
        </div>
        <div v-else class="f-red">超预算</div>
      </qie-circle-progress>
      <qie-circle-progress
          width="150"
          border-width="10"
          active-color="#f9db61"
          bg-color="transparent"
          :percent="data.monthP"
      >
        <div class="q-flex q-flex-col q-flex-center" v-if="!data.overBudget">
          <div>{{ data.monthS }}</div>
          <div>本月剩余</div>
        </div>
        <div v-else class="f-red">超预算</div>
      </qie-circle-progress>

      <div class="q-flex q-flex-col q-flex-aic q-flex-1" v-if="!data.overBudget">
        <div class="mb-20">
          <span
              v-for="(num, idx) in (data.everyDay || '0').split('.')"
              :key="idx"
              :class="{ 'f-36': idx === 0, 'f-28': idx === 1 }"
          >
            {{ idx === 1 ? '.' : '' }}{{ num }}
          </span>
        </div>
        <div>本月每日可支配余额</div>
      </div>

      <div class="q-flex q-flex-col q-flex-aic q-flex-1" v-else>
        <div class="mb-20">
          <span
              v-for="(num, idx) in (Math.abs(data.monthS) || '0').toFixed(2).split('.')"
              :key="idx"
              :class="{ 'f-36': idx === 0, 'f-28': idx === 1 }"
          >
            {{ idx === 1 ? '.' : '' }}{{ num }}
          </span>
        </div>
        <div class="f-red">已超预算</div>
      </div>
    </div>
  </div>

  <u-modal
      :show="show"
      :closeOnClickOverlay="true"
      :asyncClose="true"
      title="请设置预算"
      confirmColor="#f9db61"
      @close="close"
      @confirm="$emit('setExpenditure', Number(money))"
  >
    <u--input type="number" border="bottom" v-model="money"/>
  </u-modal>
</template>

<script setup lang="ts">
import {ref, toRefs, watch} from 'vue';

const props = defineProps({
  showProgress: {type: Boolean, default: true},
  defaultMoney: {type: Number, default: 0},
  data: {type: Object, default: () => ({})},
  canOpenModalStatus: {required:true, type: Boolean, default: false}
})

const emits = defineEmits(["setExpenditure"])

const {data, showProgress, defaultMoney, canOpenModalStatus} = toRefs(props)

let show = ref<boolean>(false);
let money = ref<any>(defaultMoney || 0);

showProgress && (watch(data, (a, b) => {
  money.value = Number(a.month)
}, {immediate: true}))

// 关闭弹框
const close = () => {
  show.value = false
}

// 打开弹框
const open = () => {
  canOpenModalStatus.value && (show.value = true)
}

defineExpose({open, close})

</script>

<style lang="scss" scoped>
.budget_wrap {
  padding: 0 32rpx 20rpx;
  background-image: linear-gradient(to bottom, $qie-color 0%, #fafafa 60%);

  .budget {
    padding: 10rpx 20rpx;
    background: #fff;
    border-radius: 24rpx;
    box-shadow: 0rpx 2rpx 5rpx 2rpx #f5f5f5;
    display: flex;
    align-items: center;
  }
}
</style>
