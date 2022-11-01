<template>
	<view class="page-content">
		<uni-nav-bar dark :fixed="true" shadow background-color="#007AFF" status-bar left-icon="left"
			:title="title" @clickLeft="back" />
		<view class="header">
			<view class="menu-box">
				<button v-if="isCanHelp" @click="helpClick" class="query-but" type="primary" >帮助</button>
				<button v-if="isCanFind" @click="queryClick" class="query-but"   >查找</button>
				<button v-if="isCanAdd" @click="formedit()" class="query-but"  >新增</button>
			</view>
			<view class="summary-box">
				<text>{{topText}}</text> 
			</view>
		</view>
		<z-paging class="paging-box"  ref="paging" default-page-size="10" v-model="listData" @query="queryList">
			<uni-list class="list-crad-box">
				<uni-list-item :border="false" direction="column" v-for="item in listData" :key="item.id">
					<template direction="column" v-slot:body>
						<uni-card>
							<view class="price-item" v-for="(rowset,index) in listSet" :key="index">
								<view>
									<text>{{rowset.colleft.head}}</text>
									<text>{{item[rowset.colleft.name]}}</text>
								</view>
								<view v-if="rowset.colright" class="price-right">
									<text>{{rowset.colright.head}}</text>
									<text>{{item[rowset.colright.name]}}</text>
								</view>
							</view>
							<view class="price-item" >
								<slot name="rowbotton" :item=item>
								<view   class="price-right"   >
									<button v-if="isRowModify" type="primary" @click="formedit(item)">修改</button>
									<button v-if="isRowDel" type="warn" @click="formdel(item.id)">删除</button>
								</view>
								</slot>
							</view>
						</uni-card>
					</template>
				</uni-list-item>
			</uni-list>	
		</z-paging>

		<uni-popup ref="popupHelp" type="bottom" :is-mask-click="true" safeArea backgroundColor="$uni-bg-color" >
			<view class="popup-help-box">
				<view class="help-row" v-for="(rowtext,index) in helptexts" :key="index">
					{{rowtext}}
				</view> 
				<view class="help-row">
					<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=IGEbSpBveycfGNzhBnAdyS3eU-rqXf3d&jump_from=webapi&authKey=tfpHY+ASwWfJCvBuiW6c+Ifrsai8zJBPfLGr83M6r67OJxODwaKQx1O0oHC4KCS9"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="7788开源用户群" title="7788开源用户群"></a>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="popupQuery" type="bottom" :is-mask-click="true" safeArea backgroundColor="$uni-bg-color" >	
			<slot name="find">
			<view class="screen-box"> 
				<button @click="queryQueryIn"   type="primary" >查找</button> 
			</view>
			</slot>
		</uni-popup>
		
		<uni-popup ref="popupForm" type="bottom" :is-mask-click="true" safeArea backgroundColor="$uni-bg-color">
			<view class="popup-set-box">
				<uni-forms  ref="form78" :modelValue="formData"  :rules="rulesForm">
					<scroll-view scroll-top="0" scroll-y="true" class="form-srcoll-box">						
					 <uni-forms-item v-for="(item,index) in colsobj"   :label="item.head" :name="item.name" :key="index">
						<uni-easyinput v-if="item.kind=='input'"   class="type-input"  type="text" v-model="formData[item.name]" placeholder="请输入" />
						
					</uni-forms-item>
					</scroll-view>
					<view class="uni-btn-v">
						<button form-type="submit" @click="submit('form78')" type="primary">提交</button>
						<button form-type="reset"  >清空</button>
					</view>
				</uni-forms> 
			</view>
		</uni-popup>
	</view>
</template>
<script>
export default {
	name:"www778878net-list",
}  
</script>
<script src="./main.js" />
<style lang="scss">
	.page-content {
		width: 100%;
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
		
		//按钮菜单栏
		.header{
			z-index: 1;
			width: 100%;
			background-color: $uni-bg-color;
			box-shadow: rgb(0 0 0 / 8%) 0px 0px 3px 1px;
			position: relative;
			.menu-box{
				width: 100%;
				display: flex;
				flex-direction: row;
				padding: 10px;
				border: none;
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
			.summary-box{
				padding: 0 0 10px 15px;
			}
		}
		
		
		//列表容器
		.list-crad-box{
			width: 100%;
			::v-deep .uni-list-item__container{
				margin: 0 !important;
				padding: 0 !important;
			}
			::v-deep .uni-card{
				border: none;
				margin-bottom: 3px !important;
				uni-text{
					font-size: $uni-font-size-sm;
				}
				.price-item{
					display: flex;
					justify-content: space-between; 
					.price-right{
						display: flex;
						justify-content: row;
						text-align: left;
						width: 50%;
						button{
							padding: 0;
							margin: 0 5px;
							width: 3rem;
							height: 1.5rem;
							line-height: 1.5rem;
							font-size: $uni-font-size-base;
						}
					}
				}
			}
		}
		
		//列表
		.paging-box{
			margin-top: 115px;
		}
		
		//帮助弹窗
		.popup-help-box{
			padding-left: 15px;
			padding-top: 50px;
			background-color: $uni-bg-color;
			.help-row{
				height: 30px;
				line-height: 30px;
			}
		}
		
		//设置类型弹窗
		.popup-set-box{
			display: flex;
			flex-direction: column;
			padding: 15px;
			padding-bottom: 50px;
			background-color: $uni-bg-color;
			button{
				margin: 10px 0;
				font-size: $uni-font-size-base;
			}
			.form-srcoll-box{
				height: 10rem;
				.uni-form-item{
					margin-bottom: 10px;
					.type-name{
						width: 3rem;
						height: 1.5rem;
						lineg-height: 1.5rem;
						.mark-red{
							color: red;
							padding-top: 2px;
							padding-right: 2px;
							float: left;
						}
					}
					.type-input{
						width: 80vw;
						height: 1.5rem;
						line-height: 1.5rem;
						font-size: $uni-font-size-sm;
						padding: 0 5px;
						margin: 0 5px;
					}
				}
			}
		}
	}
	
	
	
	
</style>
