import request from "@/utils/request.js";
// 获取全部
export function getAllCategory(){
  return request({
    url:'http://localhost:8080/api/category',
    method:'get',
  })
}
//添加类型
export function addCategory(params){
  return request({
    url:'http://localhost:8080/api/category',
    method:'post',
    data:params
  })
}
// 查寻类型
export function editCategory(params){
  return request({
    url:'http://localhost:8080/api/category/detail',
    method:'get',
    params:{
      id:params
    },
  })
}
//删除类型
export function deleteCategory(params){
  return request({
    url:'http://localhost:8080/api/category',
    method:'delete',
    params:{
      id:params
    }
  })
}
//更新类型
export function updateCategory(params){
  return request({
    url:'http://localhost:8080/api/category',
    method:'put',
    data:params
  })
}
// 查看全部文章
//条件查询
export function getAllArticle(params){
  return request({
    url:'http://localhost:8080/api/article',
    method:'get',
    params:{
      pageNum:params.currentPage,
      pageSize:params.pageSize,
      categoryId:params.categoryId?params.categoryId:null,
      state:params.state?params.state:null,
    }
  })
}

//获取用户的所有分类
export function getUserAllCategory(){
  return request({
    url:'http://localhost:8080/api/article/category',
    method:'get',
  })
}

//按文章id查询文章信息
export function getArticleItem(params){
  return request({
    url:'http://localhost:8080/api/article/detail',
    method:'get',
    params:{
      id:params
    }
  })
}
//添加文章
export function addArticle(params){
  return request({
    url:'http://localhost:8080/api/article',
    method:'post',
    data:JSON.stringify(params),
  })
}
//更新文章
export function updateArticle(params){
  return request({
    url:'http://localhost:8080/api/article',
    method:'put',
    data:params,
  })
}

//删除文章
export function deleteArticle(params){
  return request({
    url:'http://localhost:8080/api/article',
    method:'delete',
    params:{
      id:params
    }
  })
}

