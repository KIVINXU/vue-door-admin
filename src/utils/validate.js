/**
 * Created by KIVINXU on 16/11/18.
 */
/* 验证用户名*/
export function isvalidUsername(str) {
  const userReg = /^[0-9A-Za-z_]{3,16}$/;
  return userReg.test(str)
}

/* 验证登录密码*/
export function isvalidPassword(str) {
  const passReg = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!#$%&()*+,-.:;<=>?@\[\]^_`{|}~]).{3,16}$/;
  return passReg.test(str)
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 电话号码验证 */
export function validateTel(str) {
  const reg = /^$|(1[3-9]\d{9}$)/
  return reg.test(str)
}

/* 邮箱验证 */
export function validateMail(str) {
  const reg = /^$|([a-zA-Z0-9_-]+@[-_a-zA-Z0-9]+(\.[a-zA-Z0-9_-]+)+$)/
  return reg.test(str)
}

/* 微信验证 */
// 仅支持6-20个字母、数字、下划线或减号，以字母开头。解释一下，只要是字母开头
export function validateWehat(str) {
  const reg = /^$|([a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$)/
  return reg.test(str)
}
/* 身份证验证 */
export function validateIdentity18(str) {//18位数身份证验证正则表达式 ：
  const reg = /^$|((1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6|[1-5]|71|8[1-2]|91)\d{4}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)/;
  //ISO 7064:1983.MOD11-2校验码
  const q = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
  const r = [1,0,"X",9,8,7,6,5,4,3,2];
  let sum = 0, t = -1, flag = false;
  if(reg.test(str)){
    const arr = str.split("");
    if(arr.length === 0){
      flag=true;
    }else if(arr.length === 18){
      for(let k = 0; k < 17; k ++){
        sum += q[k]*arr[k];
      }
      t = sum % 11;
      if(r[t] == arr[17]){
        flag = true;
      }
    }
  }
  return flag;
}

/* 护照验证 */
export function validatePassport(str) {
  const reg = /^$/;
  const reg1 = /^[a-zA-Z]{5,17}$/;
  const reg2 = /^[a-zA-Z0-9]{5,17}$/;
  var flag = false;
  if (reg.test(str)||reg1.test(str)||reg2.test(str)){
    flag = true;
  }
  return flag;
}

/* 其他证件验证：只允许数字和英文字母,允许为空,允许下划线 */
export function validateOther(str) {
  const reg = /^[_a-zA-Z0-9]*$/;
  var flag = false;
  if (reg.test(str)){
    flag = true;
  }
  return flag;
}
/*纯数字*/
export function validateNum(str) {
  const reg = /^[0-9]*$/;
  return reg.test(str)
}

