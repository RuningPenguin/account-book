const uniID = require("uni-id-common")
const { Service } = require("uni-cloud-router");
const { mpWxLogin, mpWxRegister } = require("../../dto/user/login.js")
const { code2Session } = require("../../utils/weixin.js")
const { log } = require("console");

module.exports = class LoginService extends Service {
  async login() {
    const { ctx: { context, event, data } } = this;
    const { code } = data;

    const { openid } = await code2Session(code);
    const res = await mpWxLogin(openid);

    if (res.length > 0) {
      return res;
    } else {
      return mpWxRegister(openid)
    }
  }
};
