const { log } = require("console");
const { isFlag } = require("../../utils/index.js")

const { evaluate } = require('../../lib/math.js')

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

// 计算预算
function calcBudget(money, expenditure) {
  const obj = { day: "0", month: "0", everyDay: "0" }
  if (!isFlag(money)) return obj

  const days = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

  obj.month = money.toFixed(2)
  obj.day = evaluate(`${money} / ${days}`).toFixed(2);
  obj.everyDay = evaluate(`(${money} - ${expenditure}) / (${days} - ${new Date().getDate()})`).toFixed(2);

  return obj
}

module.exports.get = async ctx => {
  const { context, event, data } = ctx;
  const { uid } = event;
  const { year, month } = dataVerification(data);
  const [prev, next] = createTimeSection(year, month);

  // 返回数据
  const accountDate = { expenditure: 0, income: 0, groupList: [], budget: { day: 0, month: 0, everyDay: 0 } }

  // jql 操作数据库
  const dbJQL = uniCloud.databaseForJQL({ event, context });
  const Account = dbJQL.collection("qie-account");
  const Budget = dbJQL.collection("qie-budget");

  const accountres = await Account
    .where(`uid == "${uid}" && last_update_date >= ${prev} && last_update_date < ${next}`) // 查询更新时间在当月范围的数据
    .groupBy('dateToString(add(new Date(0),last_update_date),"%Y-%m-%d-%u") as date') // 分组字段
    .groupField(
      `count(*) as total,
      push({money:money, account_type:account_type, remark:remark, bill_type:bill_type, date:date,last_update_date:last_update_date}) as list`
    ) // 数据分组
    .orderBy('date', 'desc')
    .get();

  const budgetres = await Budget
    .where(
      `uid == "${uid}" && budget_type == "all" && create_date >= ${prev} && create_date < ${next}`
    ) // 查询创建时间在当月范围的数据
    .field('money')
    .get();

  accountres.data.forEach(item => {
    item.expenditure = item.list.map(v => v.account_type == 0 ? v.money : 0).reduce((prev, cur) => evaluate(
      `${prev}+${cur}`), 0) // 支出
    item.income = item.list.map(v => v.account_type == 1 ? v.money : 0).reduce((prev, cur) => evaluate(
      `${prev}+${cur}`), 0) // 收入
    accountDate.expenditure += item.expenditure // 总支出
    accountDate.income += item.income // 总收入
    item.expenditure = item.expenditure.toFixed(2)
    item.income = item.income.toFixed(2)
    item.list.sort((a, b) => b.last_update_date - a.last_update_date) // 单个分组数据倒序
  })

  accountDate.expenditure = accountDate.expenditure.toFixed(2)
  accountDate.income = accountDate.income.toFixed(2)
  accountDate.groupList = accountres.data
  accountDate.budget = calcBudget(budgetres.data[0] && budgetres.data[0].money, accountDate.expenditure)

  return accountDate;
}
