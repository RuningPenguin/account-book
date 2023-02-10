<template>
  <view class="wrap">
    <view class="top"></view>
    <view class="content">
      <view class="title">欢迎登录</view>
      <view class="tips">未注册的微信号验证后自动创建账号</view>
      <u-button color="#f9db61" text="微信一键登录" :customStyle="{color:'#333'}" @click="wxLogin"/>

    </view>
  </view>
</template>

<script setup lang="ts">
import useUserStore from "@/store/user";
import {onMounted} from "vue";
import uniApi from "@/tools/uniCloudRequest";

const {setToken, setUserinfo} = useUserStore();


// 获取用户信息
const getUserInfo = async () => {
  uniApi("user/get_userinfo").then(res => {
    setToken();
    setUserinfo(res)
  })
}

onMounted(getUserInfo)

</script>

<style lang="scss" scoped>
.wrap {
  font-size: 28rpx;

  .content {
    width: 600rpx;
    padding: 80rpx 0 0;
    margin: auto;

    .title {
      text-align: left;
      font-size: 60rpx;
      font-weight: 500;
      margin-bottom: 100rpx;
    }

    .tips {
      color: #909399;
      margin-bottom: 60rpx;
      margin-top: 8rpx;
    }

  }
}
</style>
