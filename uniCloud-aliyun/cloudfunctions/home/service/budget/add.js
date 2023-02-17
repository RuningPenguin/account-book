const { Service } = require("uni-cloud-router");
const { create, update } = require("../../dto/budget/add.js")
const { log } = require("console");
const { createTimeSection } = require("../../utils/index.js")

module.exports = class AddService extends Service {
  // 添加一条预算
  async createBudget() {
    const { ctx } = this;
    const { context, event, data } = ctx;
    const [prev, next] = createTimeSection();
    let result = null;

    const dbJQL = uniCloud.databaseForJQL({ event, context });
    const Budget = dbJQL.collection("qie-budget");

    const res = await Budget
      .where(`budget_type == "all" && create_date >= ${prev} && create_date < ${next}`)
      .get();

    if (res.affectedDocs > 0) {
      data.id = res.data[0]._id;
      result = await update(ctx);
      log(result, 99)
      return {
        code: 200,
        message: '修改成功',
        data: res.data[0]._id
      }
    } else {
      result = await create(ctx);
      return {
        code: 200,
        message: '添加成功',
        data: result.id
      }
    }
  }
};
