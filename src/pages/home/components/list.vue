<template>
  <u-index-list v-if="h > 0" :custom-nav-height="h">
    <template v-for="(item, index) in list" :key="index">
      <qie-index-anchor
          class="index_anchor"
          bgColor="#fafafa"
          height="20"
          size="10"
      >
        <div class="index-anchor q-flex pr-30">
          <div class="q-flex-1">
            {{
              `${getFormatDate(item.date, 1)}月${getFormatDate(item.date, 2)}日 星期${formatWeek(getFormatDate(item.date, 3))}`
            }}
          </div>
          <span class="mr-20" v-if="item.income > 0">{{ `收入：${item.income}` }}</span>
          <span v-if="item.expenditure > 0">{{ `支出：${item.expenditure}` }}</span>
        </div>
      </qie-index-anchor>

      <u-index-item>
        <view
            class="list-cell pl-30 pr-30 mb-20 pt-20"
            v-for="(val, idx) in item.list"
            :key="idx"
        >
          <div class="q-flex q-flex-aic">
            <u-avatar size="30" fontSize="24" randomBgColor :icon="val.bill_type"/>
            <div
                class="list_cell_info q-flex-1 q-flex q-flex-jcsb ml-20"
                :style="item.list.length - 1 === idx ? 'border: none' : ''"
            >
              <div>{{ val.remark || getDefaultRemark(val) }}</div>
              <div>{{ !!val.account_type ? '+' : '-' }} {{ val.money }}</div>
            </div>
          </div>
        </view>
      </u-index-item>
    </template>
    <!--    <u-loadmore :line="true" :status="status" @loadmore="loadmore"/>-->
  </u-index-list>

</template>

<script lang="ts" setup>
import billType from "@/config/billType";
import {formatWeek} from "@/tools/format.tools";
import {ref, toRefs, watch} from "vue";

const props = defineProps({
  status: {required: true, type: String, default: 'loadmore'},
  customNavHeight: {required: true, type: Number, default: 0},
  list: {required: true, type: Array, default: () => []},
  loadmore: {
    type: Function, default: () => {
    }
  },
});

const {customNavHeight} = toRefs(props)

let h = ref(0)
watch(customNavHeight, (a) => {
  h.value = a
  console.log(h.value,a,2)
}, {immediate: true})


// 获取默认值
const getDefaultRemark = (item: any): string | undefined => {
  const obj = billType[!!item.account_type ? 'incomeList' : 'expenditureList'].find(v => v.name === item.bill_type);
  return obj && obj.title
}

// 获取格式化日期
const getFormatDate = (str: string, index: number): string => {
  try {
    return str.split("-")[index];
  } catch (e) {
    return ''
  }
}
</script>

<style lang="scss" scoped>
.index-anchor {
  width: 100%;
  color: #606266;
  font-size: 20rpx;
}

.list-cell {
  .list_cell_info {
    line-height: 60rpx;
    border-bottom: 1rpx solid #f1f1f1;
  }
}
</style>
