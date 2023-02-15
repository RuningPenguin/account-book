'use strict';

const { log } = require("console");

exports.main = async (event, context) => {
  let signStr = ''

  const res = await uniCloud.httpclient.request('https://wa.ewanghuiju.com/activity/sign_in', {
    method: "POST",
    contentType: 'json', // 指定以application/json发送data内的数据
    dataType: 'json', // 指定返回值为json格式，自动进行parse
    headers: {
      token: "cFALl2rJ9Du3yK.SsIjsTFc4UzV6ZfaZUe-3.MLOXtY!"
    }
  })

  const { data: { data }, status } = res;

  if (data.code === 2000) {
    if (data.gift_type == 0) {
      signStr = `红包: ${data.red_envelope}`
    } else {
      signStr = data.good_title
    }
  }

  return signStr
};
