import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log(token,'settoken');
  localStorage.setItem('token',token)
  // return Cookies.set(TokenKey, token)
  
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
