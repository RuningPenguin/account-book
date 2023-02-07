module.exports.code2Session = async (js_code) => {
  const { data } = await uniCloud.httpclient.request("https://api.weixin.qq.com/sns/jscode2session", {
    method: 'GET',
    dataType: "json",
    data: {
      js_code,
      appid: 'wxe01f582812d9d742',
      secret: 'f6b3f184765875cea96696d6ff367cae',
      grant_type: "authorization_code"
    }
  })

  const { session_key, openid } = data;
  return session_key && openid ? data : {}
}
