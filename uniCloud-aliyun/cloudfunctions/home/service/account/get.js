const uniID = require("uni-id-common")
const { Service } = require("uni-cloud-router");
const { get, getTopData } = require("../../dto/account/get.js")
const { log } = require("console");

module.exports = class AddService extends Service {
  // 获取账本数据
  async getAccountList() {
    const { ctx } = this;
    const { context, event: { uid }, data } = ctx;

    const res = await get(ctx);

    return {
      code: 200,
      message: '查询成功',
      data: res
    }
  }
};
