const { log } = require("console");
const uniID = require('uni-id-common');

// middleware/auth.js
module.exports = () => {
  // 返回中间件函数
  return async function autn(ctx, next) {
    const { context, event } = ctx;

    const uniIDIns = uniID.createInstance({ context });
    const auth = await uniIDIns.checkToken(event.uniIdToken);

    if (auth.uid) {
      // 向 event 添加用户id
      event.uid = auth.uid;
      await next(); // 执行后续中间件
    } else {
      // 校验失败，抛出错误信息
      throw { code: auth.errCode, message: auth.errMsg }
    }
  };
};
