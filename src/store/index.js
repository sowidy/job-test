//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
import user from './modules/user'

//应用Vuex插件
Vue.use(Vuex)

// const actions = {
// 	addUserInfo(context,value){
// 		// console.log(context,"context");
// 		context.commit('ADD_USER',value);
// 	}
// }
// //准备mutations——用于操作数据（state）
// const mutations = {
// 	ADD_USER(state,value){
// 		// console.log(state,"state");
// 		state.id = value.id;
// 		state.account = value.username;
// 		state.password = value.password;
// 	}
// }
// //准备state——用于存储数据
// const state = {
// 	id:'',
// 	account:'',
// 	password:'',
// }

//创建并暴露store
export default new Vuex.Store({
	// actions,
	// mutations,
	// state,
	modules: {
    user
  },
})