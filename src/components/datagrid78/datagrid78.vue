<template>
	<www778878net-tab ref="unitab78" @savedata="savedata" @delById="delById" @getdata="getdata" v-bind="$attrs" :cols="cols">
		
	</www778878net-tab>
</template>

<script>
	import Api78 from '@/dlldata/Api78'
	import Toast78 from '@/dllinfo/Toast78'
	let api=new Api78()
	 
	/**
	 * 
	 */
	export default {
		name:"datagrid78",
		props:{
			 url: {type:String,default:''},  //必须 api调用
			 cols:{type:Array,default:{}},
			 getm: {type:String,default:'get'},//get方法可自定义 真实调用url+getm
			 m:{type:String,default:'m'}  ,//修改方法可自定义 真实调用url+m
			 getmPars:{},//get方法追加参数 合并调API的参数里面 
			  
		},
		data() {
			return {
				 isdebug:true
			};
		},
		methods:{
			async savedata(parsin,callback){
				if(this.isdebug)console.log(parsin)
				let formData=parsin["formData"]
				let settingin2={
					url:this.url,// "api7819/services/Services78",
					m:  this.m,  
					mid:formData["id"],
					isdebug:true
				} 
				let pars=[]
				for(let item in this.cols){
					let name=this.cols[item]["name"]  
					if(this.isdebug)console.log(name)
					if(this.isdebug)console.log(formData[name])
					pars.push(formData[name]) 
				}		
				settingin2["pars"]=pars
				
				if(this.isdebug)console.log(settingin2)
				 
				let [err,res]=await api.doAsyc(settingin2)
				
				if(err || res["back"].length==0){
				 	Toast78.show('修改失败',"error")
					//return;
				} 
				if(this.isdebug)console.log(res["back"].length)
				 
				callback(err,res["back"])
			},
			async delById(parsin,callback){
				let {id}=parsin
				let settingin2={
					url:this.url,// "api7819/services/Services78",
					m:  "del",  
					mid:id,
					isdebug:true
				} 
				if(this.isdebug)console.log(settingin2)
				let [err,res]=await api.doAsyc(settingin2)
				if(err || res["back"].length==0){
				 	Toast78.show('删除失败',"error")
					//return;
				} 
				Toast78.show('删除成功')
				if(this.isdebug)console.log(res["back"])
				 
				callback(err,res["back"])
			},
			async getdata(getpars,callback){ 
				let {pageNo, pageSize,orderby,filter}=getpars
				let settingin2={
					url:this.url,// "api7819/services/Services78",
					m: this.getm,//"test",
					//pars:this.pars,
					getstart:(pageNo-1)*pageSize,
					getnumber:pageSize, 
					isdebug:false
				} 
				if(orderby)settingin2["order"]=orderby
				if(filter &&Object.keys(filter).length>=1 ){
					let pars=[]
					//必须和数据库ts一一对应 
					for(let item in this.cols){
						let name=this.cols[item]["name"] 
						
						if(filter[name]){
							pars.push(filter[name]["filter"])
						}
						else
							pars.push("")
					}		
					settingin2["pars"]=pars
				}
				else
					delete settingin2["pars"]
				Object.assign(settingin2, this.getmPars); 
				if(this.isdebug)console.log(settingin2)
				let [err,res]=await api.doAsyc(settingin2)
				
				if(err || res["back"].length==0){
				 	Toast78.show('没有数据',"error")
					//return;
				} 
				if(this.isdebug)console.log(res["back"].length)
				 
				callback(err,res["back"])
		 
				 
			}, 
		}
	}
</script>

<style>

</style>