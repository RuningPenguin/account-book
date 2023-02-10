const { log } = require("console");
const db = uniCloud.database();
const User = db.collection("uni-id-users");

module.exports.getUserInfo = async ctx => {
  const { context, event: { uid } } = ctx;

  if (uid) {
    const { data } = await User.where({ _id: uid }).get();
    return data;
  } else {
    return "token"
  }
}
