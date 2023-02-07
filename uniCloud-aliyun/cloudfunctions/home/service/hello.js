const uniID = require("uni-id-common")
const { Service } = require("uni-cloud-router");

module.exports = class HelloService extends Service {
  async sayHello() {
    const { ctx } = this;
    const uniIDIns = uniID.createInstance({
      context: ctx
    })

    const payLoad = await uniIDIns.checkToken(ctx.event.uniIdToken)
    if (payload.code) {
      return payload
    }
  }
};
