const { Controller } = require("uni-cloud-router");

module.exports = class LoginController extends Controller {
  wxlogin() {
    const data = this.ctx.data;
    return this.service.user.login.login();
  }
};
