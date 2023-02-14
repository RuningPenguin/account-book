<template>
  <div class="budget_wrap">
    <div class="budget" @click="open">
      <qie-circle-progress
          width="150"
          border-width="10"
          active-color="#f9db61"
          bg-color="transparent"
          :percent="30"
      >
        <div class="q-flex q-flex-col q-flex-center">
          <div>20</div>
          <div>今日剩余</div>
        </div>
      </qie-circle-progress>
      <qie-circle-progress
          width="150"
          border-width="10"
          active-color="#f9db61"
          bg-color="transparent"
          :percent="60"
      >
        <div class="q-flex q-flex-col q-flex-center">
          <div>20</div>
          <div>本月剩余</div>
        </div>
      </qie-circle-progress>
      <div class="q-flex q-flex-col q-flex-aic q-flex-1">
        <div class="mb-20">
          <span
              v-for="(num, idx) in '00.00'.split('.')"
              :key="idx"
              :class="{ 'f-36': idx === 0, 'f-28': idx === 1 }"
          >
            {{ idx === 1 ? '.' : '' }}{{ num }}
          </span>
        </div>
        <div>本月每日可支配余额</div>
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
import {ref, toRefs} from 'vue';

const props = defineProps({
  canOpenModalStatus: {required: true, type: Boolean, default: false}
})

const emits = defineEmits(["setExpenditure"])

const {canOpenModalStatus} = toRefs(props)

let show = ref<boolean>(false);
let money = ref<number>(0);

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
  background-image: linear-gradient(to bottom, $qie-color 0%, #fff 60%);

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
