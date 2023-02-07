const { log } = require("console");

const db = uniCloud.database();
const User = db.collection("uni-id-users");

module.exports.mpWxLogin = async openid => {
  const { data } = await User.where({ 'wx_openid.mp': openid }).get()
  return data
}
module.exports.mpWxRegister = async openid => {
  const { id } = await User.add({ wx_openid: { mp: openid } })
  return id
}
