<template>
	 
 
	<www778878net-list ref="list78" @getdata="getdata"    
		 :listSet="listSet"  
	   > 
	</www778878net-list>
	 
</template>

<script  >
	 
	
 
	export default {
		props:{ 
			//topText: {type:String,default:'778878net荣誉出品'},
			//isdebug: {type:Boolean,default:false},
			listSet:{type:Array,default:()=>[
				{colleft:{name:"ddate",head:"日期:"}},
				{colleft:{name:"kind",head:"类别:"},colright:{name:"mnum",head:"金额:"}},
				{colleft:{name:"info",head:"信息:"},colright:{name:"kind2",head:"类别2:"}}
			 
			]}  
			   
		},
		data() {
			return {  
			 
			}
		},
		mounted() {
			 
		},
		methods: {   
		 
			async getdata(getpars,callback){
				console.log(getpars)
				let {pageNo, pageSize,orderby}=getpars//,filter
				let datalist=[];//造点假数据
				for(let i=0;i<pageSize;i++){
					let id=(pageNo-1)*pageSize+i +1
					let ddate="2022-01-"
					if(id>20)
						ddate="2022-01-20"
					else
						ddate="2022-01-"+id
					let dataitem={
						ddate: ddate,
						id: id,
						info: id,
						kind: "test",
						kind2: "",
						mnum: id
					}
					datalist.push(dataitem)
				}	 
				let err=null;
				callback(err,datalist) 
			}
		}
	};
</script>

<style lang="scss">
 
</style>
