// 判断是否有值
module.exports.isFlag = function(val) {
  if (Object.prototype.toString.call(val) == '[object Null]' || Object.prototype.toString
    .call(val) == '[object Undefined]') { return false } else { return true }
}
