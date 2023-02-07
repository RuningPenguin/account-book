// middleware/auth.js
module.exports = () => {
  // 返回中间件函数
  return async function autn(ctx, next) {
    await next(); // 执行后续中间件
  };
};
