const { log } = require("console");
const { isFlag } = require("../../utils/index.js")

// 参数验证
function dataVerification(data) {
  let { year, month } = data;

  if (!isFlag(year)) throw "year 是必传的";
  if (!isFlag(month)) throw "month 是必传的";

  return { year, month }
}

// 获取时间区间
function createTimeSection(year, month) {
  const prev = Date.parse(`${year}-${month}-01 00:00:00`);
  const next = Date.parse(`${year}-${Number(month) + 1}-01 00:00:00`);
  return [Number(prev), Number(next)]
}

module.exports.get = async ctx => {
  const { context, event, data } = ctx;
  const { uid } = event;
  const { year, month } = dataVerification(data);
  const [prve, next] = createTimeSection(year, month);

  // 返回数据
  const accountDate = { expenditure: 0, income: 0, groupList: [] }

  // jql 操作数据库
  const dbJQL = uniCloud.databaseForJQL({ event, context });
  const Account = dbJQL.collection("qie-account");

  const res = await Account
    .where(`uid == "${uid}" && last_update_date >= ${prve} && last_update_date < ${next}`) // 查询更新时间在当月范围的数据
    .groupBy('dateToString(add(new Date(0),last_update_date),"%Y-%m-%d-%u") as date') // 分组字段
    .groupField(
      `count(*) as total,
      push({money:money, account_type:account_type, remark:remark, bill_type:bill_type, date:date,last_update_date:last_update_date}) as list`
    ) // 数据分组
    .orderBy('date', 'desc')
    .get();

  res.data.forEach(item => {
    item.expenditure = item.list.map(v => v.account_type == 0 ? v.money : 0).reduce((prev, cur) => prev + cur,
      0) // 支出
    item.income = item.list.map(v => v.account_type == 1 ? v.money : 0).reduce((prev, cur) => prev + cur,
      0) // 收入
    accountDate.expenditure += item.expenditure // 总支出
    accountDate.income += item.income // 总收入
    item.list.sort((a, b) => b.last_update_date - a.last_update_date) // 单个分组数据倒序
  })

  accountDate.groupList = res.data

  return accountDate;
}
