const { Controller } = require("uni-cloud-router");
module.exports = class HelloController extends Controller {
  sayHello() {
    const data = this.ctx.data;
    return this.service.hello.sayHello();
  }
};
