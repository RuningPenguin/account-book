const uniID = require("uni-id-common")
const { Service } = require("uni-cloud-router");
const { log } = require("console");

module.exports = class HelloService extends Service {
  async sayHello() {
    const { ctx: { context, event } } = this;

    const uniIDIns = uniID.createInstance({ context })

    const payload = await uniIDIns.checkToken(event.uniIdToken)
    if (payload.code) {
      return payload
    }
  }
};
