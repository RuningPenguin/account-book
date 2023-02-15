const { log } = require("console");

module.exports.create = async ctx => {
  const { context, event, data } = ctx;
  const { uid } = event;

  const { money, budget_money, budget_type } = data;

  const dbJQL = uniCloud.databaseForJQL({ event, context });
  const Budget = dbJQL.collection("qie-budget");

  return Budget.add({ money, budget_money, budget_type });

}

module.exports.update = async (ctx) => {
  const { context, event, data } = ctx;
  const { uid } = event;

  const { money, budget_money, budget_type, id } = data;

  const dbJQL = uniCloud.databaseForJQL({ event, context });
  const Budget = dbJQL.collection("qie-budget");

  return Budget.where({ _id: id }).update({ money })
}
