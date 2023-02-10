const uniID = require("uni-id-common")
const { Service } = require("uni-cloud-router");
const { create } = require("../../dto/account/add.js")
const { log } = require("console");

module.exports = class AddService extends Service {
  // 添加一条账本数据
  async addData() {
    const { ctx } = this;
    const { context, event: { uid }, data } = ctx;

    // 创建一条账单数据
    const res = await create(ctx);

    return {
      code: 200,
      message: '添加成功',
      data: res.id
    }
  }
};
