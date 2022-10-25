<template>
	<view class="page-content">
		
		<www778878net-list ref="list78" @queryQuery="queryQuery" :cols="cols" :rules="rules"
		   @getdata="getdata" @savedata="savedata" @delById="delById"
			:topText="topText" :listSet="listSet" :helptexts="helptexts" 
			:isCanFind="isCanFind" :isCanAdd="isCanAdd"
			:isRowModify="isRowModify" :isRowDel="isRowDel"
			:title="title"
		   >
			<template v-slot:find>
				<view class="screen-box">
				<view class="query flex-direction-row">
					<uni-text>起日期:</uni-text>
					<input class="uni-input query-input" focus v-model="querystart"/>  
					
				</view> 
				<view class="query flex-direction-row">
					<uni-text>止日期:</uni-text>
					<input class="uni-input query-input" focus v-model="queryend"/> 
					<button @click="queryQuery" class="query-but" type="primary" >查找</button>
				</view>
				</view> 
			</template>
		</www778878net-list>
	</view>
</template>

<script  >
	import Api78 from '@/dlldata/Api78'
	import Toast78 from '@/dllinfo/Toast78'
	let api=new Api78()
	
 
	export default {
		props:{
			url: {type:String,default:"apinet/personal/personal_rmbhistory"},  //必须 api调用
			getm: {type:String,default:'getByWeb'},//get方法可自定义 真实调用url+getm
			topText: {type:String,default:'778878net荣誉出品'},
			isdebug: {type:Boolean,default:true},
			listSet:{type:Array,default:()=>[
				{colleft:{name:"ddate",head:"日期:"}},
				{colleft:{name:"kind",head:"类别:"},
				colright:{name:"mnum",head:"金额:"}},
				{colleft:{name:"info",head:"信息:"},
				colright:{name:"kind2",head:"类别2:"}}
			 
			]},
			cols:{type:Array,default:()=>[
				{ name: "ddate", head: '日期' },
				{ name: "kind", head: '类别' },
				{ name: "mnum", head: '金额' },
				{ name: "info", head: '信息' },					
				{ name: "kind2", head: '类别2' }				 
				],
			},
			title: {type:String,default:'列表控件778878net'},
			isCanFind:{type:Boolean,default:true},//是否允许查找
			isCanAdd:{type:Boolean,default:true},//是否允许新增 
			isRowModify:{type:Boolean,default:true},//是否允许行修改
			isRowDel:{type:Boolean,default:true},//是否允许行删除
			helptexts:{type:Array,default:()=>[".public参数000",".腾迅云 阿里云均可更新" ]
			},
		
		},
		data() {
			return { 
				querystart:'1900-01-01',
				queryend:'2099-01-01',
				rules:   {
					// 对name字段进行必填验证
					kind: {
						rules: [{
								required: true, 
							},
							{
								minLength: 3,
								maxLength: 10, 
							}
						]}   
				} 
			}
		},
		mounted() {
			 
		},
		methods: {
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
			async savedata(parsin,callback){ 
				let formData=parsin["formData"]
				let settingin2={
					url:this.url,// "api7819/services/Services78",
					m:  "m",  
					mid:formData["id"],
					isdebug:false
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
		
		 
		 
			queryQuery(){
				this.$refs.list78.queryQueryIn();
			},
			async getdata(getpars,callback){
				let {pageNo, pageSize,orderby}=getpars//,filter
				 if(this.isdebug)console.log(pageNo)
				let settingin2={
					url:this.url,// "api7819/services/Services78",
					m: this.getm,//"test",
					//pars:this.pars,
					getstart:(pageNo-1)*pageSize,
					getnumber:pageSize, 
					isdebug:true
				} 
				if(orderby)settingin2["order"]=orderby
			 	settingin2["pars"] =[this.querystart, this.queryend ];
				//['5.2','steambuff',"1999-01-01 00:00:00",'沙漠之鹰'], 
				 //
				Object.assign(settingin2, this.getmPars); 
				if(this.isdebug)console.log(settingin2)
				let [err,res]=await api.doAsyc(settingin2)
				
				if(err || (res["back"] && res["back"].length==0)){
					Toast78.show('没有数据',"error")
					return;
				} 
				if(this.isdebug)console.log(res["back"].length)
				// for(let index in res["back"]){
				// 	let item=res["back"][index]
				// 	item.steambuy=parseFloat(item.steambuy)/100
				// 	item.steamsell=parseFloat(item.steamsell)/100
				// 	item.buffbuy=parseFloat(item.buffbuy)/100
				// 	item.tranval=parseFloat(item.tranval)/100
				// }	
				callback(err,res["back"]) 
			}
		}
	};
</script>

<style lang="scss">
.page-content {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: $uni-font-size-sm;
	.flex-direction-row{
		display: flex;
		flex-direction: row;
		
	}
	uni-input{
		border-radius: 3px;
		border: 1px solid $uni-border-color;
		background-color: $uni-bg-color;
	}
	
	
	.menu-box{
		width: 100%;
		display: flex;
		flex-direction: row;
		padding: 10px;
		button{
			font-size: $uni-font-size-base;
			width: 3rem;
			height: 25px;
			line-height: 25px;
			padding: 0;
			margin: 0;
			margin-left: 6px;
		}
	}
	//筛选板块
	.screen-box{
		width: 100%;
		padding: 15px;
		padding-top: 50px;
		background-color: $uni-bg-color;
		.query{
			width: 18rem;
			margin-bottom: 10px;
			uni-text{
				line-height: 1.5rem;
			}
			.query-input{
				width: 10rem;
				height: 1.5rem;
				line-height: 1.5rem;
				font-size: $uni-font-size-sm;
				padding: 0 5px;
				margin: 0 5px;
			}
			uni-button{
				width: 3rem;
				line-height: 1.5rem;
				font-size: $uni-font-size-base;
				padding: 0;
				margin: 2px;
			}
		}
		.set-up{
			.rate{
				uni-text{
					line-height: 1.5rem;
				}
				.rate-input{
					width: 2rem;
					height: 1.5rem;
					font-size: $uni-font-size-sm;
					padding: 0 3px;
					margin-left: 5px;
				}
			}
			.type{
				margin-left: 5px;
				.type-item{
					height: 1.5rem;
					line-height: 1.5rem;
					font-size: $uni-font-size-sm;
					padding: 0 5px;
					border-radius: 5px;
					margin: 0 3px;
					background-color: $uni-bg-color;
					border: 1px solid $uni-border-color;
					
				}
				.typeItemCheck{
					color: $uni-text-color-inverse;
					background-color: $uni-color-primary;
				}
			}
		}
	}	 
}
</style>
