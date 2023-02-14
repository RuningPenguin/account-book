const { Service } = require("uni-cloud-router");
const { create } = require("../../dto/budget/add.js")
const { log } = require("console");

module.exports = class AddService extends Service {
  // 添加一条预算
  async createBudget() {
    const { ctx } = this;
    const { context, event: { uid }, data } = ctx;

    const res = await create(ctx);

    return {
      code: 200,
      message: '添加成功',
      data: res.id
    }
  }
};
