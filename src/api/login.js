import request from '@/utils/request'
var aesjs = require('aes-js');

//密码加密
export function cryptoPass(password) {
  var key = [0x7a, 0x6a, 0x64, 0x67, 0x6d, 0x7e, 0x21, 0x40, 0x23, 0x24, 0x25, 0x5e, 0x26, 0x2a, 0x28, 0x29];
  
  //产生随机数
  var iv = [], rn;
  for(var i = 0; i < 16; i++) {
    rn = Math.floor(Math.random()*256);
    iv[i] = rn;
  }
  //加密
  var password_bytes = aesjs.utils.utf8.toBytes(password);
  var aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, 1);
  var encrypted_bytes = aesCfb.encrypt(password_bytes);
  //转为hex
  return aesjs.utils.hex.fromBytes(iv) + aesjs.utils.hex.fromBytes(encrypted_bytes);
}

export function login(username, password) {
  var user = {
    username,
    password
  };
  user.password = cryptoPass(password);
  return request({
    url: '/login',
    method: 'post',
    data: user
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
//获取用户信息
export function getUserInfo(userInfo) {
  userInfo.password = cryptoPass(userInfo.password);
  return request({
    url: '/addUsers',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
