const { Controller } = require("uni-cloud-router");

module.exports = class AccountController extends Controller {
  // 创建一条账单数据
  create_data() {
    const data = this.ctx.data;
    return this.service.account.add.createData();
  }

  // 获取首页数据 + 列表
  get_account_list() {
    const data = this.ctx.data;
    return this.service.account.get.getAccountList();
  }
};
