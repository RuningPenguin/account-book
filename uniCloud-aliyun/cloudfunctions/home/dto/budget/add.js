const { log } = require("console");

module.exports.create = async ctx => {
  const { context, event, data } = ctx;
  const { uid } = event;

  const { money, budget_money, budget_type } = data;

  const dbJQL = uniCloud.databaseForJQL({ event, context });
  const Account = dbJQL.collection("qie-budget");

  return Account.add({ money, budget_money, budget_type });

}
