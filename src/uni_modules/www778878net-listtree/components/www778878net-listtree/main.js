import clone78 from './clone78.js'

/**
 * list控件 无限层级父子tree 
 * @description 基于官方uni-list 
 * @tutorial 
 * @property {Boolean} 	isdebug 			是否打印调试
 * @event {Function} 	getdata				获取数据	             
 */
export default {
	name:"www778878net-listtree",
	mixins: [],
	emits:['getDataSon'],
	props: {
		//常用重要输入
		 
		 
		//默认 可自定
		isdebug:{type:Boolean,default:true},
		childnumFieldName:{type:String,default:'childnumtext'},
		titleFieldName:{type:String,default:'title'},
		idFieldName:{type:String,default:'id'},
		showbadgeFieldName:{type:String,default:"showbadge"},
	},
	data(){
		return {
			idnow:"",//当前节点的id
			titlenow:"我的知识库",//当前节点标题
			son:[],//子节点
			value: ["0"],
			content:
			  "折叠内容主体，可自定义内容及样式，点击按钮修改内容使高度发生变化。",
		}
	},
	mounted() {
		if(this.isdebug)console.log("mounted")
		this.querySon();
	},
	computed:{
		/**
		 * 加上控制箭头和角标
		 */
		sonlist(){
			let tmp=clone78(this.son)
			 
			for(let i =0;i<tmp.length;i++){
				let sonitem=tmp[i]
				 
				if(sonitem["childnum"]==0)
					sonitem[this.showbadgeFieldName]=false
				else
					sonitem[this.showbadgeFieldName]=true
				sonitem["childnumtext"]=sonitem["childnum"].toString()
			}
			 
			return tmp
		}
	},
	methods: {
		/**
		 * 跳到子节点
		 * @param {Object} e
		 */
		onClickRight(id){
			console.log(id)
			this.idnow=id;
			this.querySon()
			//console.log(l)
			///window.event.stopPropagation();
		},		
		/**
		 * 显示该标签的列表
		 * @param {Object} e
		 */
		onClick(id){
			// console.log(e)
			// console.log(l)
		},		
		/**
		 * 获取子节点
		 */
		querySon(){			
			this.$emit("getDataSon",{
				id:this.idnow,			
			},(err,res)=>{  
				 
				 if(err||res.length==0){
				 	this.son=[]
				 	return
				 } 
				this.son=res	
				 
			}) 
		}
	},
	
}