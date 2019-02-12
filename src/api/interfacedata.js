// 接口返回数据的处理
let datause = function extend(obj) {
  var o = {}
  var attr = Array.prototype.slice.call(arguments).slice(1)
  attr.forEach(function(val, index) {
    if (val in obj) { o[val] = obj[val] }
  })
  return o
}

export default datause
