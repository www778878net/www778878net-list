import clone78 from './clone78.js'
import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'  

/**
 * 表格控件封装 低代码控件
 * @description 基于官方uni-list 通过配置实现低代码封装实现增删查改 排序筛选等功能
 * @tutorial https://ext.dcloud.net.cn/plugin?id=3270
 * @property {Array} 	listData 			数据	 
 * @property {Boolean} 	isdebug 			是否打印调试
 * @event {Function} 	getdata				分页获取数据	             
 */
export default {
	name:"www778878net-list",
	mixins: [ZPMixin],
	emits:['getdata','queryQuery','savedata','delById'],
	props:{		
		listSet:Array,//列表格式设置
		helptexts:Array,//帮助文本
		qqservices:"657225485",//客服qq
		cols:Array, //表单数据
		rules:{},//校验规则
		topText:{type:String,default:'778878net荣誉出品(可替换这行字显示点有用的)'},
		//filter:{},//搜索条件
		isdebug:{type:Boolean,default:true},//打印调试 
	},
	data(){
		return{ 
			listData:[ ],//列表数据
			orderby:'' ,//排序 
			formData:{},//表单数据
		}
	},
	mounted() {
		//console.log("7788listmounted") 
	},
	computed:{
		/**
		 * 计算错误信息
		 */
		rulesForm(){
			let ruletmp=clone78(this.rules)  // Object.assign({},this.rules) 
			for(let item in ruletmp ){
				let rulestmp=ruletmp[item]["rules"]
		 
				for(let i =0;i<rulestmp.length;i++){
					let rule=rulestmp[i]
			 
					if(rule["errorMessage"])continue
					if(rule["required"]){
						rule["errorMessage"]="请输入"+this.colsobj[item]["head"]
						continue
					}
					if(rule["minLength"]){
						rule["errorMessage"]=this.colsobj[item]["head"]+"长度在 "+rule["minLength"]+" 到 "+rule["maxLength"]+" 个字符"
						continue
					} 
				}
			} 
			return ruletmp
		},
		/**
		 * []转成{} 
		 * item head换算 cols必须用数组 因为和后端有顺序约定
		 */
		colsobj(){
		 
			let colstmp={}
			for(let i =0;i<this.cols.length;i++){
				colstmp[this.cols[i]["name"]]=this.cols[i]
			}
			//if(this.isdebug)console.log(colstmp)
			return colstmp
		},
		qqservicesurl(){
			return "http://wpa.qq.com/msgrd?v=3&amp;uin="+this.qqservices+"&amp;site=qq&amp;menu=yes"
		}
	},
	methods: {
		formdel(id){
			if(this.isdebug)console.log(id)
			if (!id || !id.length) {
				return
			}
			uni.showModal({
				title: '提示',
				content:'是否删除该数据',
				showCancel: true,
				success: (res) => {
					if (!res.confirm) {
						return
					} 
					this.$emit("delById",{
						id:id, 
					},(err,res)=>{ 
						if(this.isdebug)console.log(res)
						if(err||res.length==0){
							this.$refs.paging.complete(false);
							return
						}  
						this.$refs.paging.refresh()
					}) 
					
				}
			})
		},
		/**
		 * 提交表单
		 */
		submit(ref){ 
			this.$refs[ref].validate().then(res => {  
				this.$emit("savedata",{
					formData:this.formData
				},(err,res)=>{ 
					if(this.isdebug)console.log(res)
					if(err||res.length==0){
						this.$refs.paging.complete(false);
						return
					}  
					this.$refs.paging.refresh()
					this.$refs.popupForm.close();
				}) 
			}).catch(err => {
				console.log('err', err);
			})
		},
	 
		/**
		 * 进入行编辑状态
		 * @param {Object} rowdata
		 * @param {Object} clear
		 */
		formedit(rowdata) {	
			//先默认全空 后面根据类型变不同的值
			if(!rowdata){
				rowdata={}
				for(let item in this.colsobj)
				{
					rowdata[item]=""
				}
			}
			this.formData=rowdata
			if(this.isdebug)console.log(rowdata)
			this.$refs.popupForm.open('bottom')
		},
		modifyClick(){//修改
			this.$refs.popupForm.open('bottom')
		},
		queryQueryIn(){
			this.$refs.popupQuery.close();
			this.$refs.paging.reload();
		},
		queryClick(){//查找弹窗
			this.$refs.popupQuery.open('top')
		},
		helpClick(){//帮助
			this.$refs.popupHelp.open('top')
		},
	 
		queryList(pageNo, pageSize){
			 this.$emit("getdata",{
				pageNo:pageNo,
				pageSize:pageSize,
				orderby:this.orderby,
				//filter:this.filter
			 },(err,res)=>{  
				 if(err||res.length==0){
					this.$refs.paging.complete(false);
					return
				 }  
				 
				 this.$refs.paging.complete(res); 
			 }) 
		}, 
	}		
}