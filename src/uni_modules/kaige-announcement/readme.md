直接下载项目查看使用方式，就这一句话

```javascript
<kaige-announcement :text="title" :time="8000" :delayTime="1000"></kaige-announcement>

time            运行一周的时间
delayTime       延时执行

```

* 【插件使用 `setTimeout` 作为运行机制，`网页不在主屏` 可能导致 `插件错位` 问题。】已修复此问题

插件使用css动画作为运行机制。

```
测试环境：谷歌浏览器    版本 101.0.4951.67（正式版本） （64 位）
```
