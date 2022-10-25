<template>
	<!-- 公告 左右滚动 -->
	<view class="announcement">
		<view class="box--none">{{text}}</view>
		<view class="box box2" :class="{none: !boxStyle}" :style="boxStyle">
			<text class="text" v-text="text"></text>
		</view>
		<view v-if="domWidth>=ACWidth" class="box box1" :class="{none: !boxStyle}" :style="box1Style">
			<text class="text" v-text="text"></text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "announcement",
		props: {
			text: {
				type: String,
				default: "暂无公告"
			},
			// 延时生效
			delayTime: {
				type: Number,
				default: 1000
			},
			// 运动一个box的宽度需要的时间 ms
			time: {
				type: Number,
				default: 4000
			}
		},
		data() {
			return {
				domWidth: 0,
				ACWidth: 0,
				boxStyle: "",
				box1Style: "",
				timeOut: null
			};
		},
		watch: {
			text() {
				this.boxStyle = "";
				this.box1Style = "";
				clearTimeout(this.timeOut);
				// 防止切换字符串时动画不清空
				this.$nextTick(() => {
					this.timeOut = setTimeout(() => this.init(), 10);
				});
			}
		},
		computed: {},
		mounted() {
			this.boxStyle = "";
			this.box1Style = "";
			this.$nextTick(() => {
				this.init();
			});
		},
		methods: {
			init() {
				uni.createSelectorQuery().in(this).select(".announcement").boundingClientRect(res => {
					this.ACWidth = res.width;
					uni.createSelectorQuery().in(this).select(".box").boundingClientRect(res => {
						this.domWidth = res.width;
						if (this.domWidth > 0) {
							if (this.ACWidth > this.domWidth) {
								this.boxStyle = {
									animation: "none"
								};
							} else {
								this.boxStyle = {
									width: this.domWidth + 'px',
									"animation-duration": `${this.time}ms`,
									"animation-delay": `${this.delayTime}ms`,
								};
							}
						} else {
							this.boxStyle = "";
						}
						if (this.domWidth > 0) {
							this.box1Style = {
								width: this.domWidth + 'px',
								left: this.domWidth + 'px',
								"animation-duration": `${this.time}ms`,
								"animation-delay": `${this.delayTime}ms`,
							};
						} else {
							this.box1Style = "";
						}
					}).exec();
				}).exec();
			}
		},
	}
</script>

<style lang="scss" scoped>
	.announcement {
		width: 100%;
		position: relative;
		overflow: hidden;

		.box {
			position: absolute;
			left: 0;
			top: 0;
			animation: runLeft 0s 0s linear infinite;
			width: fit-content;

			&--none {
				opacity: 0;
			}

			&.none {
				animation: unset;
			}
		}

		.box1 {
			position: absolute;
			top: 0;
			left: 0px;
			animation: runRight 0s 0s linear infinite;
		}
	}

	@keyframes runLeft {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(-100%);
		}
	}

	@keyframes runRight {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(-100%);
		}
	}
</style>
