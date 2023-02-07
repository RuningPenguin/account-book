<template>
  <div class="mt-10">
    <u-index-list v-if="customNavHeight > 0" :custom-nav-height="customNavHeight">
      <template v-for="(item, index) in indexList" :key="index">

        <u-index-anchor class="index_anchor" bgColor="#fff" height="20" size="10" :text="`${index}月31日 星期三  支出：${200}`"/>

        <u-index-item>
          <view class="list-cell pl-30 pr-30 mb-20 pt-20" v-for="(item, idx) in indexList" :key="idx">
            <div class="q-flex q-flex-aic">
              <u-avatar
                  size="30"
                  text="北"
                  fontSize="12"
                  randomBgColor
              />
              <div class="list_cell_info q-flex-1 q-flex q-flex-jcsb ml-20"
                   :style="indexList.length-1 === idx ? 'border: none' : ''">
                <div>住房</div>
                <div>-{{ item }}</div>
              </div>
            </div>
          </view>
        </u-index-item>
      </template>
    </u-index-list>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const props = defineProps({
  customNavHeight: {required: true, type: Number, default: 0}
})

const indexList = ref<Array>([1, 2, 3, 4, 5, 6, 7, 8, 9])
</script>

<style lang="scss" scoped>
.list-cell {
  .list_cell_info {
    line-height: 60rpx;
    border-bottom: 1rpx solid #f1f1f1;
  }
}
</style>

