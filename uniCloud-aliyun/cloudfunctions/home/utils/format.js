const { evaluate } = require("../lib/math.js")

// 获取前一个数字在后一个数字占比
module.exports.perc1to2 = (num1, num2) => {
  return evaluate(`${Number(num1) || 0}/${Number(num2) || 0}`).toFixed(2) * 100;
}

//时间戳转换为时间
module.exports.dateFormat = (timeStamp) => {
  //获取当前时间
  var now = new Date();
  //根据指定时间戳转换为时间格式
  var time = new Date();
  time.setTime(timestamp);
  return time.getFullYear() + "-" +
    ((time.getMonth() + 1) < 10 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1)) + "-" +
    (time.getDate() < 10 ? "0" + time.getDate() : time.getDate()) + " " +
    (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) + ":" +
    (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes());
}
