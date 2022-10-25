import Vue from 'vue'
import Vuex from 'vuex'

//import moduleA from '@/store/modules/moduleA'
import Userinfo from './modules/Userinfo'

Vue.use(Vuex)
export default new Vuex.Store({
	strict: true,
	modules:{
		//moduleA,
		Userinfo
	}
})