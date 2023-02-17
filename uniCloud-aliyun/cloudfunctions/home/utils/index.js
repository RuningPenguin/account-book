// 判断是否有值
module.exports.isFlag = function(val) {
  if (Object.prototype.toString.call(val) == '[object Null]' || Object.prototype.toString
    .call(val) == '[object Undefined]') { return false } else { return true }
}

// 获取时间区间
module.exports.createTimeSection = function(year = new Date().getFullYear(), month = new Date().getMonth() + 1, day =
  new Date().getDate(), type = 'm') {
  if (typeof year === 'object') {
    month = year.month || new Date().getMonth() + 1
    day = year.day || new Date().getDate()
    type = year.type || 'm'
    year = year.year || new Date().getFullYear()
  }
  let prev = ""
  let next = "";
  switch (type) {
    case 'y':
      prev = Date.parse(`${year}-01-01 00:00:00`);
      next = Date.parse(`${Number(year) + 1}-01-01 00:00:00`);
      break;
    case 'd':
      prev = Date.parse(`${year}-${month}-${day} 00:00:00`);
      next = Date.parse(`${year}-${month}-${day + 1} 00:00:00`);
      break;
    default:
      prev = Date.parse(`${year}-${month}-01 00:00:00`);
      next = Date.parse(`${year}-${Number(month) + 1}-01 00:00:00`);
  }

  return [Number(prev), Number(next), new Date().getTime()]
}
