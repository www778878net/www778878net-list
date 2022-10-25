<template>
  <view>
	   
<ju-navigator-grid element-id="navigatorMenu" 
:list="menu" @press="onPress" height="180" size="90"/>
 </view>
</template>

<script>
  export default {
    data() {
      return {
		   menu:[
			   {title: "最小使用", url: '/pages/simple/simple', iconfont:true, titleColor:'#2979ff'
			   , iconColor:'#2979ff',   icon: 'contact'},
				   {title: "完整使用", url: '/pages/team/team', iconfont:true, titleColor:'#2979ff'
				   , iconColor:'#2979ff',   icon: 'contact'}
		   ] 
		   
		
      }
    },
    methods: {
		onPress(e){
			console.log(e)
		}
    }
  }
</script>

<style lang="scss">
 
 

</style>
