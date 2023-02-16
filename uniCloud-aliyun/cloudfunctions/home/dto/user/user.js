const { log } = require("console");

// 获取时间区间
function createTimeSection() {
  const prev = Date.parse(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-01 00:00:00`);
  const next = Date.parse(`$${new Date().getFullYear()}-${new Date().getMonth() + 2}-01 00:00:00`);
  return [Number(prev), Number(next)]
}

module.exports.getUserInfo = async ctx => {
  const { context, event, data } = ctx;
  const { uid } = event;

  const [prev, next] = createTimeSection();

  const dbJQL = uniCloud.databaseForJQL({ event, context });

  const User = dbJQL.collection('uni-id-users')
    .where({ _id: uid })
    .field("_id,last_login_date,last_login_ip,nickname,register_date,avatar_file")
    .getTemp();

  const Budget = dbJQL.collection("qie-budget")
    .where({ budget_type: "all" })
    .field('create_date,money,uid')
    .getTemp()

  const res = await dbJQL.collection(User, Budget)
    .where(`_id["qie-budget"].create_date >= ${prev} && _id["qie-budget"].create_date < ${next}`)
    .field(
      'mobile,username,email,last_login_date,last_login_ip,nickname,register_date,avatar_file.url as avatar_file_url,_id["qie-budget"].money as budget'
    )
    .get()

  const userinfo = res.data[0];
  userinfo.budget = userinfo.budget[0] ? userinfo.budget[0].toFixed(2) : '0';
  userinfo._id = userinfo._id._value;

  return userinfo

}
