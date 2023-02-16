<template>
  <div class="top q-flex q-flex-aic">
    <u-avatar shape="square"
              :src="userinfo.avatar_file_url"
              @click="goPage('/uni_modules/uni-id-pages/pages/userinfo/userinfo')"/>

    <div class="ml-30 f-30 fw-500 q-flex-1">{{ userinfo.nickname }}</div>
    <div class="tag">企鹅初学者</div>
  </div>

  <div class="budget_wrap">
    <div class="budget q-flex" hover-class="q-hover-class" @click="budget.open()">
      <sapn class="q-flex-1">本月预算: {{ userinfo.budget }}</sapn>
      <u-icon name="arrow-right"/>
    </div>
  </div>

  <div class="module">
    <div class="module_item  q-flex" hover-class="q-hover-class">
      <sapn class="q-flex-1">企鹅开发者</sapn>
      <u-icon name="arrow-right" size="12"/>
    </div>
    <div class="module_item  q-flex" hover-class="q-hover-class">
      <sapn class="q-flex-1">企鹅科学家</sapn>
      <u-icon name="arrow-right" size="12"/>
    </div>
    <div class="module_item  q-flex" hover-class="q-hover-class">
      <sapn class="q-flex-1">企鹅收集者</sapn>
      <u-icon name="arrow-right" size="12"/>
    </div>
  </div>

  <div class="module">
    <div class="module_item  q-flex" hover-class="q-hover-class">
      <sapn class="q-flex-1">企鹅打工人</sapn>
      <u-icon name="arrow-right" size="12"/>
    </div>
    <div class="module_item  q-flex" hover-class="q-hover-class">
      <sapn class="q-flex-1">企鹅美食家</sapn>
      <u-icon name="arrow-right" size="12"/>
    </div>
    <div class="module_item  q-flex" hover-class="q-hover-class">
      <sapn class="q-flex-1">企鹅霸主</sapn>
      <u-icon name="arrow-right" size="12"/>
    </div>
  </div>

  <div class="reloadLogin">
    <u-button text="重新登录" type="warning" style="width:100%" @click="reloadLogin"/>
  </div>

  <Budget ref="budget" :canOpenModalStatus="true" :default-money="3000" :show-progress="false"
          @setExpenditure="setExpenditure"/>


</template>
<script lang="ts" setup>
import {goPage} from "@/tools/utils.tools";
import {createBudgetApi} from "@/apis/home";
import useHomeStore from "@/store/home";
import Budget from "@/pages/home/components/budget.vue";
import {ref, toRefs} from "vue";
import {onLoad} from "@dcloudio/uni-app";
import useUserStore from "@/store/user";

const {state,getUserinfo,setToken} = useUserStore();
const {userinfo} = toRefs(state);

const {reloadList} = useHomeStore();

const budget = ref();
const uniIdCo = uniCloud.importObject('uni-id-co')


const reloadLogin = async () => {
  await uniIdCo.refreshToken()
  setToken()
}

// 设置预算
const setExpenditure = async (money: number) => {
  await createBudgetApi({money})
  budget.value.close()
  reloadList();
};

onLoad(()=>{
  getUserinfo()
})
</script>

<style lang="scss">
.top {
  padding: 20rpx 32rpx;
  background: $qie-color;

  .tag {
    color: #f9db61;
    padding: 5rpx 20rpx;
    background: #ae8e44;
    border-radius: 24rpx;
  }
}

.budget_wrap {
  padding: 0rpx 32rpx;
  background-image: linear-gradient(to bottom, $qie-color 30%, #fafafa 80%);

  .budget {
    padding: 20rpx;
    font-size: 28rpx;
    background: #fff;
    border-radius: 12rpx;
    box-shadow: 0rpx 2rpx 5rpx 2rpx #f5f5f5;
    display: flex;
    align-items: center;

  }
}

.module {
  margin: 40rpx 32rpx;
  background-color: #fff;
  border-radius: 12rpx;
  box-shadow: 0rpx 2rpx 5rpx 2rpx #f5f5f5;

  .module_item {
    padding: 20rpx;
    border-bottom: 1rpx solid #fafafa;

    &:last-child {
      border: none;
    }
  }
}

.reloadLogin {
  width: 100%;
  padding: 0 32rpx;
  position: fixed;
  bottom: 50rpx;
}
</style>
