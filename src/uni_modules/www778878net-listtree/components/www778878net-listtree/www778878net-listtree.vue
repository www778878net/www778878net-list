<template>
  <view>
    <uni-section class="mb-10" :title="titlenow" type="line">
      <uni-list>
        <uni-list-item
          v-for="(item, index) in sonlist"
          :key="index"
          :title="item[titleFieldName]"
          @click="onClick(item[idFieldName])"
          clickable
        >
          <template v-slot:footer>
            <uni-badge
              v-if="item[showbadgeFieldName]"
              type="success"
              :text="item[childnumFieldName]"
              @click.native.stop="onClickRight(item[idFieldName])"
            />
            <uni-icons
              v-if="item[showbadgeFieldName]"
              :size="16"
              class="uni-icon-wrapper"
              color="#bbb"
              type="arrowright"
              @click.native.stop="onClickRight(item[idFieldName])"
            ></uni-icons>
          </template>
        </uni-list-item>
      </uni-list>
    </uni-section>
    <uni-collapse ref="collapse" v-model="value">
      <uni-collapse-item title-border="none" :border="false">
        <template v-slot:title>
          <view style="position: relative"> 
			<uni-list>
            <uni-list-item
              title="标题使用自定义标题插槽"
              :show-extra-icon="true"
              :extra-icon="extraIcon"
            >
            </uni-list-item>
          </uni-list>
          <uni-badge
            type="success"
            style="
              position: absolute;
              top: 50%;
              right: 0;
              transform: translate(0, -50%);
            "
            :text="2"
            @click.native.stop="onClickRight(item[idFieldName])"
          />
		  </view>
          
        </template>
        <view class="content">
			<uni-list>
          <uni-list-item
            v-for="(item, index) in 5"
            :key="index"
            title="折叠内容主体，可自定义内容及样式"
            @click="onClick()"
            clickable
          >
          </uni-list-item>
        </uni-list>
          <text class="text">折叠内容主体，可自定义内容及样式</text>
          <uni-badge
            type="success"
            :text="2"
            @click.native.stop="onClickRight(item[idFieldName])"
          />
        </view>
      </uni-collapse-item>
      <uni-collapse-item title="折叠内容">
        <uni-badge
          type="success"
          :text="2"
          @click.native.stop="onClickRight(item[idFieldName])"
        />
        <view class="content">
          <text class="text"
            >折叠内容主体，这是一段比较长内容。默认折叠主要内容，只显示当前项标题。点击标题展开，才能看到这段文字。再次点击标题，折叠内容。</text
          >
        </view>
      </uni-collapse-item>
    </uni-collapse>
  </view>
</template>

<script>
export default {
  name: "www778878net-listtree",
};
</script>
<script src="./main.js" />

<style lang="scss">
</style>