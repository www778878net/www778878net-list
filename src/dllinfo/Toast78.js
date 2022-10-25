
export default class Toast78{
	constructor(){
		
	}
	
	/**
	 * 后面再封装更多信息 统一弹出框样式
	 */
	static show(title){
		uni.showToast({
			title:title
		})
	}
}