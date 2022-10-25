<template>
	<view class="page-content">
 
		<www778878net-list ref="list78" @getdata="getdata" :cols="cols"  
			 :listSet="listSet" :helptexts="helptexts" 
		   >
		 
		</www778878net-list>
	</view>
</template>

<script  >
	 
	
 
	export default {
		props:{ 
			//topText: {type:String,default:'778878net荣誉出品'},
			//isdebug: {type:Boolean,default:false},
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
		
			helptexts:{type:Array,default:()=>[".帮助写在这里",".直接可以看到比一本书好点" ]
			}, 
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
