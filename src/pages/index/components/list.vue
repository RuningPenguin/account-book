<template>
  <div class="mt-10">
    <u-index-list v-if="customNavHeight > 0" :custom-nav-height="customNavHeight">
      <template v-for="(item, index) in list" :key="index">
        <qie-index-anchor
            class="index_anchor"
            bgColor="#fff"
            height="20"
            size="10"
        >
          <div class="index-anchor q-flex pr-30">
            <div class="q-flex-1">
              {{
                `${getFormatDate(item.date, 1)}月${getFormatDate(item.date, 2)}日 星期${formatWeek(getFormatDate(item.date, 3))}`
              }}
            </div>

<!--            {{ `支出：${getAllMoney(item.list)}` }}-->
            {{ `支出：${item.all_money}` }}

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
    </u-index-list>
  </div>
</template>

<script lang="ts" setup>
import billType from "@/config/billType";
import {formatWeek} from "@/tools/format.tools";

const props = defineProps({
  customNavHeight: {required: true, type: Number, default: 0},
  list: {required: true, type: Array, default: () => []},
});

// 获取默认值
const getDefaultRemark = (item: any): string | undefined => {
  const obj = billType[!!item.account_type ? 'incomeList' : 'expenditureList'].find(v => v.name === item.bill_type);
  return obj && obj.title
}

// 获取格式化日期
const getFormatDate = (str: string, index: number): string => {
  return str.split("-")[index];
}

// 获取总支出
const getAllMoney = (list: Array): number => {
  return list.map(v => v.money).reduce((prev, cur) => prev + cur, 0)
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
