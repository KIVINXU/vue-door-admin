import request from '@/utils/request'

export function fetchList(url, query) {
  return request({
    url: url,
    method: 'post',
    data: query
  })
}
//提交table数据
export function SubmitTable(url, data) {
 return request({
   url: url,
   method: 'post',
   data
 })
}
export function fetchSearchOption(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
//通过select的value值找到label的值
export function valueToLabel(option, key) {
  var obj = option.find((item) => {
    return item.key === key
  });
   return obj.label;
}
//通过select的label值找到value值
export function labelToValue(option, label) {
  var obj = option.find((item) => {
    return item.label === label
  });
  return obj.key;
}


