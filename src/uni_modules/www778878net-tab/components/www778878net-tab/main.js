import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'  
import clone78 from './clone78.js'
/**
 * 表格控件封装 无需代码 
 * @description 基于官方uni-table 通过配置实现无代码即可实现增删查改 排序筛选等功能
 * @tutorial https://ext.dcloud.net.cn/plugin?id=3270
 * @property {Array} 	cols 				表头必须{id(必须),name,head,title,mode(""不能修改 HTML不关闭>),ishide
 * @property {Boolean} 	isdebug 			是否打印调试
 * @event {Function} 	getdata				分页获取数据	             
 */
export default {
	name:"www778878net-tab",
	mixins: [ZPMixin],
	emits:['getdata','delById','savedata'],
	props: {
		//常用重要输入
		cols:Array, 
		rules:{},//校验规则
		isdebug:{type:Boolean,default:true},//打印调试
		
		headFieldName:{type:String,default:'head'},//表头中文
		nameFieldName:{type:String,default:'name'}//表头列名
	},
	data() {
		return {
			showedit:false,//是否显示修改页面
			formData:null,//表单数据
		
			selectedIndexs: [],//已选中的行号
			
			dataList:[],//获取的数据 
			orderby:'' ,//排序
			filter:{},//搜索
			
			
		}
	}, 
	mounted() {
		
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
		 * item head换算 cols必须用数组 因为和后端有顺序约定
		 */
		colsobj(){
			let colstmp={}
			for(let i =0;i<this.cols.length;i++){
				colstmp[this.cols[i]["name"]]=this.cols[i]
			}
			if(this.isdebug)console.log(colstmp)
			return colstmp
		},
		/**
		 * 加上冒号 对齐用于表单
		 */
		colsForm(){
			let colstmp=clone78(this.cols)  
			let headlen=4;
			for(let i =0;i<colstmp.length;i++){
				let head=colstmp[i]["head"]
				if(head.length<headlen){
					let headtmp=""
					let lenleft=headlen-head.length
					for(let j =0;j<lenleft;j++){
						headtmp+= head[j]+ " "
					}
					if(head.length>lenleft)
						headtmp+=head.substr(lenleft,head.length-lenleft)
					head=headtmp
				}
				 
				colstmp[i]["head"]=head+":"
			}
			// if(this.isdebug)console.log(this.cols)
			// if(this.isdebug)console.log(colstmp)
			return colstmp
		},
		/**
		 * 加上必须的id
		 */
		colsall(){
			let colsalltmp=clone78(this.cols)  
		 
			colsalltmp.push({ name: "id", head: 'id',ishide:true })
			if(this.isdebug)console.log(colsalltmp.length)
			return colsalltmp
		}
	},
	methods: {
		/**
		 * 提交表单
		 */
		submit(ref){
			this.$refs[ref].validate().then(res => {
				console.log('success', res);
				// uni.showToast({
				// 	title: `校验通过`
				// })
				this.$emit("savedata",{
					formData:this.formData
				},(err,res)=>{ 
					if(this.isdebug)console.log(res)
					if(err||res.length==0){
						this.$refs.paging.complete(false);
						return
					}  
					this.$refs.paging.refresh()
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
			this.showedit=true
			this.$refs.paging.scrollToTop() 
		},
		confirmDelete(id){
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
		filterChange(e,name){
			
			if(e.filter=="")
				delete this.filter[name]
			else
				this.filter[name]=e
			this.$refs.table.clearSelection() 
			this.$nextTick(() => {
				 this.$refs.paging.reload()
			})
		},
		sortChange(e, name) { 
		  const orderByMapping = {
			  	"ascending": "",
			  	"descending": " desc"
			  }
			this.orderByFieldName = name;
			if (e.order) {
				this.orderby = name +  orderByMapping[e.order]
			} else {
				this.orderby = ''
			} 
			this.$refs.table.clearSelection()
			//this.$refs.paging.reload()
			this.$nextTick(() => {
				 this.$refs.paging.reload()
			})
		},		
	    queryList(pageNo, pageSize){  
			 this.$emit("getdata",{
				pageNo:pageNo,
			    pageSize:pageSize,
				orderby:this.orderby,
				filter:this.filter
			 },(err,res)=>{ 
				//if(this.isdebug)console.log(res)
				
				 if(err||res.length==0){
				 	this.$refs.paging.complete(false);
				 	return
				 } 
				 
				 
				 this.$refs.paging.complete(res);
			 }) 
		}, 
		 // 多选
		selectionChange(e) {
			this.selectedIndexs = e.detail.index
		 },
	}
}