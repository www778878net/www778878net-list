 let isdebug=true
 export default {
 	state: {
 		uname: "guest"
 		,sid:"GUEST888-8888-8888-8888-GUEST88GUEST"
 		,logininfo:{}//用户登录时返回的信息
 	},
 	getters: {
 		isLogined: state => {
 			if(state.uname==""||state.uname=="guest")
 				return false
 		    return true;
 		}
 	},
 	mutations: {
 		saveLogininfo(state, logininfo) {
 		   state.logininfo =logininfo  ;
 		   state.uname=logininfo["uname"]
 		   state.sid=logininfo["sid"]
		   if(isdebug)console.log(state.uname)
		   if(isdebug)console.log(logininfo)
 		}
 	},
 	actions: { 
 		saveLogininfoAction (context, logininfo) {
			context.commit('saveLogininfo', logininfo)
			if(isdebug)console.log(context.state.uname)
		}
 	}
 }
 
 
 