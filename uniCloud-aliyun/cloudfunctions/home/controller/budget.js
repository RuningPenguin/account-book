const { Controller } = require("uni-cloud-router");

module.exports = class AccountController extends Controller {
  // 创建预算
  create_budget() {
    return this.service.budget.add.createBudget();
  }
};
