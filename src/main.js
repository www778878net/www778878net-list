import App from './App'
import store from './store/index'
import common from './common/common.js'

 
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$adpid = "1111111111"
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
Vue.prototype.common = common
App.mpType = 'app'
const app = new Vue({
	store,
	common,
	...App
})
app.$mount()

//全局组件注册
 // import lgLsit from './components/lg-list/lg-list';
 // //import nav from './components/nav/nav';
 // Vue.component({
	//  'lg-list':lgLsit,
	 
	//  })

 
