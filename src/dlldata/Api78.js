
import String78 from "./String78"
import Promise78 from '@www778878net/promise78'
 


 

export default class Api78 {
  
	
	/**
	 * 要从settingin 带过来的cid sid
	 */
    constructor(settingin) { 
		this.settings = {
			m: 'get',
			url: '',
			//ajaxtype: "GET",//GET POST
			//pars: [],参数必须数组

			cache: 'random',//WEB缓存 空:全缓存 随机:不缓存 mid行缓存 bcid cid公司缓存 sid用户缓存
			mid: '',// guidnew78(),
			bcid: 'd4856531-e9d3-20f3-4c22-fe3c65fb009c',// 
			cid: '',
			sid:"",
			cols:null,//返回哪些列['all']

			//callback: Function,//function(data,err)
			backpars: {},//回调传参
			getnumber: 1000,//获取多少行数据
			getstart: 0,//从哪行开始
			order: "idpk",//排序字段
			//jsonp: 0,//jsonp
			uname: '',//用于报错
			v: 22,
			//apipt: null,//可指定调用ALI还是QQ 默认就自动
			//jsonbase64: 1,//已默认 pars cols数组转为字符 
			//system: "guest",//微服务名称 ex:view food
			isTest: true,//本地测试加上域名
			testhost:"http://uniapp.778878.net",//本地调试域名
			isdebug: false,//是否打印调试信息
			pars:[],//参数每次不一样 有可能不传过来
		}	;
		Object.assign(this.settings, settingin);
		
    }
	
	_init(){
		this.settings["cid"] = uni.getStorageSync('cid');
		let sid = uni.getStorageSync('sid');
		if (!sid )
		    sid ="GUEST888-8888-8888-8888-GUEST88GUEST" 
		 this.settings["sid"]=sid
		 let uname = uni.getStorageSync("uname")
		 if (!uname)
		 	uname = "guest"
		 this.settings.uname = uname;
		 if(this.settings.isdebug)console.log(this.settings)
	}
	
	/**
	 *调API前先验证是否登录 未登录直接返错误信息	 
	 */
	doAsyc( settingin ){ 
		if(this.settings.isdebug)console.log(settingin)
		return Promise78((resolve)=>{
			this.do((data ,err )=>{
				if(err){
					reject(err)
					return;
				}
				// reject({test:"err"})
				if(this.settings.isdebug)console.log(data.length)
				 resolve(data)
			} , settingin)
		})
		// return Promise78( 
		// 	new Promise((resolve,reject)=>{
				
		// 	}) 
		// )
	}
	
	/**
	 * 无需验证的调API
	 */
	do(callback,settingin ){ 
		this._init()
		delete this.settings.pars
		Object.assign(this.settings, settingin);
		//let that = this;
	
		let urlapi = "/" + this.settings.url + "/" + this.settings.m;
		if (typeof  this.settings.pars  === 'string') {
			this.settings.pars = [this.settings.pars];
		}
		let tmp=""
		let pars=this.settings.pars 
		let datapars=""
	 
		if(pars!=undefined){
			if(this.settings["v"]>=22){
				let isini = true;
				for (let i = 0; i < pars.length; i++)
				{
					if (isini)
					{
						isini = false;
						tmp += pars[i];
					}
					else
					{
						tmp += ",~" + pars[i];
					}
				}
			}else{
				tmp=JSON.stringify(pars)
			}
			//let tmparr=String78.str2ArrayBuffer (tmp)
			let base64str=String78.str2Base64(tmp)
			if (base64str)
			  	datapars = base64str;
		}
	

		//var cols = JSON.stringify(this.settings.cols);
		//来源
		let source = uni.getStorageSync("source");
		if (!source)
			source = "pc";
		var data = { 
			pars: datapars//下版没有也应该可以不传
			//, cols: cols//下版默认应该可以不传
			, jsonbase64: 1//下版默认为1
			, v: 22
			, source: source 
		}
		if(this.settings.cols)
			data["cols"]=JSON.stringify(this.settings.cols);
		if (this.settings.bcid != "d4856531-e9d3-20f3-4c22-fe3c65fb009c")
			data["bcid"] = this.settings.bcid;
		if (this.settings.mid != "")
			data["mid"] = this.settings.mid;
		if (this.settings.getnumber != 1000)
			data["getnumber"] = this.settings.getnumber;
		if (this.settings.getstart != 0)
			data["getstart"] = this.settings.getstart;
		if (this.settings.order != "idpk")
			data["order"] = this.settings.order;
		//缓存
		switch (this.settings.cache) {
			case "bcid":
				urlapi += "?cache=" + this.settings.bcid;
				break;
			case "cid":
				urlapi += "?cache=" + this.settings.cid;
				break;
			case "sid":
				urlapi += "?cache=" + this.settings.sid;
				break;
			case "mid":
				urlapi += "?cache=" + this.settings.mid;
				break;
			case "random":
				urlapi += "?cache=" + Math.random();
				break;
			case "":
				urlapi += "?cache=" + Math.random();
				break;
			default:
				urlapi += "?cache=" + this.settings.cache;
				break;
		}
		if (this.settings.isTest)
			urlapi=this.settings.testhost+urlapi
		if(this.settings.isdebug)console.log(urlapi);
			
		 
		uni.request({
		    url: urlapi,  
			data:data,
			method:"POST" ,
		    header: {
				'content-type':"application/json",
		         sid: this.settings.sid 
				, "uname": encodeURIComponent(this.settings.uname)
		    },
		    success: (res) => {
				if(this.settings.isdebug)
					console.log(res.data);
				callback(res.data,null)
		    }
			,fail:(err)=>{
				//if(this.settings.isdebug)
				console.log("err"+JSON.stringify(err) );
				callback(null,err)
			} 
		});
	}
	
	 
	
	test(){
		// uni.request({
		//     url: this.settings.url!, //仅为示例，并非真实接口地址。 
		//     header: {
		//         'custom-header': 'hello' //自定义请求头信息
		//     },
		//     success: (res) => {
		// 		if(this.settings.isdebug)
		// 			console.log(res);
		// 		this.settings.callback(res,null)
		//     }
		// 	,fail:(err)=>{
		// 		//if(this.settings.isdebug)
		// 		console.log("err"+JSON.stringify(err) );
		// 		this.settings.callback(null,err)
		// 	} 
		// });
	}
}

 