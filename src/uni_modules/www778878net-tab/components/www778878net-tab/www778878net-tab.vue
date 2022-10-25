<template> 
 			
<view>
		<z-paging ref="paging"   v-model="dataList" default-page-size=10   @query="queryList">
		<text class="title">这一排准备放头部按钮一排</text>
		<button type="primary" size="mini" @click="submit('form78')">提交</button>
		<uni-forms v-if="showedit" ref="form78" :modelValue="formData" :rules="rulesForm">
			 <uni-forms-item v-for="(item,index) in colsForm"   :label="item[headFieldName]" :name="item[nameFieldName]" :key="index">
				<uni-easyinput    type="text" v-model="formData[item[nameFieldName]]" placeholder="请输入" />
			</uni-forms-item>
		</uni-forms>
		<uni-table ref="table"  emptyText="没有更多数据了" border stripe
			type="selection" @selection-change="selectionChange"> 
			<uni-tr >    
				<uni-th  v-for="(item,index) in cols"   filter-type="search" @filter-change="filterChange($event,  item[nameFieldName] )"
				 sortable @sort-change="sortChange($event, item[nameFieldName] )"  
				 align="center"    :key="index"> 
				  {{item[nameFieldName] +item[headFieldName] }} 
				  
				 </uni-th> 
				<uni-th><button  @click="formedit()" class="uni-button" size="mini"
				 						type="primary">新增</button> </uni-th> 
			</uni-tr>
			
			<uni-tbody height="55vh">
	 
			 <uni-tr v-for="(row,index) in dataList" :model="row" :key="index">
				<uni-td align="center" v-for="(item,index) in colsall"   :key="index"> 
				 <view v-if="item[nameFieldName]=='id'" class="uni-group">
				 	<button @click="formedit(row )" class="uni-button" size="mini"
				 		type="primary">修改</button>  
				 	<button @click="confirmDelete(row[item[nameFieldName]])" class="uni-button" size="mini"
				 		type="warn">删除</button>
				 </view>
				 <view v-else v-html="row[item[nameFieldName]]">
			 
				 </view>
				</uni-td>
				<uni-td align="center">
					
				</uni-td>
			 </uni-tr> 
			</uni-tbody>
			
		</uni-table>
	
 </z-paging>  
</view>
</template>

<script> 

	export default {
		name:"www778878net-tab",
	}  
</script>
<script src="./main.js" />
<style lang="scss"> 


</style>
