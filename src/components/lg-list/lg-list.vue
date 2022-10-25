<template>
	<view>
		<uni-list class="list-crad-box">
			<uni-list-item :border="false" direction="column" v-for="item in listData" :key="item.id">
				<template direction="column" v-slot:body>
					<uni-card>
						<text class="crad-name">{{item.sname}}</text>
						<view class="price-item">
							<view>
								<text>steam求购价:</text>
								<text>{{item.steambuy}}</text>
							</view>
							<view class="price-right">
								<text>挂售价:</text>
								<text>{{item.steamsell}}</text>
							</view>
						</view>
						<view class="price-item">
							<view>
								<text>buff求购价:</text>
							<text>{{item.buffbuy}}</text>
							</view>
							<view class="price-right">
								<text>挂售价:</text>
								<text>{{item.tranval}}</text>
							</view>
						</view>
						<view class="price-item">
							<view>
								<text>收益:</text>
								<text>{{item.def}}</text>
							</view>
							<view class="price-right">
								<text>收益%:</text>
								<text>{{item.per}}</text>
							</view>
						</view >
						<view class="price-item">
							<view>
								<text>交易量:</text>
								<text>{{item.sellnum}}</text>
							</view>
							<view class="price-right">
								<button type="primary" @click="itemModifyClick">修改</button>
								<navigator class="see-details" url="/pages/sweep-price-details/sweep-price-details">查找详情</navigator>
							</view>
						</view>
					</uni-card>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>
<script>
	export default {
	    props: {
	        listData: {
				type: Array,
				required: true,
				default: [],
			}
	    },
	    data() {
	        return {}
	    },
	    computed: {
			
	    },
	    mounted() {
			
	    },
	    methods: {
			itemModifyClick(e){
				this.$emit("listModifyClick",{id: 1})
			}
		},
	}
</script>

<style lang="scss">
	
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
			}
			.price-item{
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
</style>