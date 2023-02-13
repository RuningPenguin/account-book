const { Controller } = require("uni-cloud-router");

module.exports = class AccountController extends Controller {
  add_data() {
    const data = this.ctx.data;
    return this.service.account.add.addData();
  }

  get_account_list() {
    const data = this.ctx.data;
    return this.service.account.get.getAccountList();
  }

  get_top_data() {
    return this.service.account.get.getTopData();
  }
};
