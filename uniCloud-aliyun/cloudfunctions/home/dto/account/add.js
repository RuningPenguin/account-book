const { log } = require("console");

module.exports.create = async ctx => {
  const { context, event, data } = ctx;
  const { uid } = event;

  const { money, account_type, remark, bill_type } = data;

  const dbJQL = uniCloud.databaseForJQL({ event, context });
  const Account = dbJQL.collection("qie-account");

  return Account.add({ uid, money, account_type, remark, bill_type });

}
