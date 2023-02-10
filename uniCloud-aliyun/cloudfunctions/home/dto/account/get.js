const { log } = require("console");
const { isFlag } = require("../../utils/index.js")

// 参数验证
function dataVerification(data) {
  let { page, year, month } = data;

  if (!isFlag(page)) throw "page 是必传的";
  if (!isFlag(year)) throw "year 是必传的";
  if (!isFlag(month)) throw "month 是必传的";

  if (page <= 0) { page = 1 }

  return { page, year, month }

}

module.exports.get = async ctx => {
  const { context, event, data } = ctx;
  const { uid } = event;
  const { page, year, month } = dataVerification(data);

  const limit = 2;
  const skip = limit * (page - 1)

  const dbJQL = uniCloud.databaseForJQL({ event, context });
  const Account = dbJQL.collection("qie-account");

  const res = Account.where({ uid })
    .groupBy('dateToString(add(new Date(0),last_update_date),"%Y-%m-%d-%u") as date') // 分组字段
    .groupField(
      `count(*) as total,
        sum(money) as all_money,
        push({money:money, account_type:account_type, remark:remark, bill_type:bill_type, date:date,last_update_date:last_update_date}) as list`
    ) // 数据分组
    .orderBy("list.last_update_date", "desc") // 时间倒序
    .skip(skip) // 跳过前n条
    .limit(limit) // 获取n条
    .get();

  // const res = Account.aggregate()
  //   .where({ uid })
  //   // .field(
  //   //   'money, account_type, remark, bill_type, last_update_date, dateToString(add(new Date(0),last_update_date),"%Y-%m-%d-%u") as date'
  //   // ) // 字段处理

  //   .groupBy('dateToString(add(new Date(0),last_update_date),"%Y-%m-%d-%u") as date') // 分组字段
  //   .groupField(
  //     `count(*) as total,
  //       sum(money) as all_money,
  //       push({money:money, account_type:account_type, remark:remark, bill_type:bill_type, date:date,last_update_date:last_update_date}) as list`
  //   ) // 数据分组
  //   .orderBy("last_update_date", "desc") // 时间倒序
  //   .skip(skip) // 跳过前n条
  //   .limit(limit) // 获取n条
  //   .get();

  // const accountData = res.data;

  return res;

}
