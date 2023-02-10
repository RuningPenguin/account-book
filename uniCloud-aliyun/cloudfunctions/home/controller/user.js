const { Controller } = require("uni-cloud-router");

module.exports = class UserController extends Controller {
  get_userinfo() {
    const data = this.ctx.data;
    return this.service.user.user.getUserInfo();
  }
};
