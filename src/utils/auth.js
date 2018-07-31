
const TokenKey = 'Token'

export function getToken() {
  return window.sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return window.sessionStorage.setItem(TokenKey, token)
}
export function setUsername(username) {
  return window.sessionStorage.setItem('username', username)
}

export function removeToken() {
  return window.sessionStorage.removeItem(TokenKey)
}
