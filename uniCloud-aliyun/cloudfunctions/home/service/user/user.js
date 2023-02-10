const uniID = require("uni-id-common")
const { Service } = require("uni-cloud-router");
const { getUserInfo } = require("../../dto/user/user.js")
const { log } = require("console");

module.exports = class UserService extends Service {
  // 获取用户数据
  async getUserInfo() {
    const { ctx } = this;

    const data = await getUserInfo(ctx)

    return {
      code: 200,
      message: '查询成功',
      data: data[0]
    }
  }
};
