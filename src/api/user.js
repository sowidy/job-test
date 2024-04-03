import request from "@/utils/request.js";
import Qs from 'qs'

//登录
export function Login(params) {
  return request({
    url: "http://localhost:8080/api/user/login",
    method: "post",
    data:Qs.stringify(params),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':'' }
  });
}

//注册
export function register(params){
  return request({
    url:"http://localhost:8080/api/user/register",
    method:'post',
    data:Qs.stringify(params),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

//退出
export function authLogout() {
  return request({
    url: "/logout",
    method: "get",
  });
}
//获取用户数据
export function getUserInfo() {
  return request({
    url:"http://localhost:8080/api/user/userInfo" ,
    method: "get",
  });
}

//更新用户数据
export function updateUserInfo(params) {
  return request({
    url:"http://localhost:8080/api/user/update",
    method: "put",
    data:params
  });
}
//更新头像
export function updateAvatar(params){
  return request({
    url:'http://localhost:8080/api/user/updateAvatar',
    method:'patch',
    params:{
      avatarUrl:params
    }
  })
}
//更新密码
export function updateUserPwd(params){
  return request({
    url:'http://localhost:8080/api/user/updatePwd',
    method:'patch',
    data:params
  })
}
 
//其实，也不一定就是params，也可以是 query 还有 data 的呀！
//params是添加到url的请求字符串中的，用于get请求。会将参数加到 url后面。所以，传递的都是字符串。无法传递参数中含有json格式的数据
//而data是添加到请求体（body）中的， 用于post请求。添加到请求体（body）中，json 格式也是可以的。