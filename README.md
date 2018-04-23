#首先，引入主体文件：
<link rel="stylesheet" href="css/jetpop.css">
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
<script src="js/jetpop.js"></script>



#信息弹窗代码：
```javascript
<script>
	popmsg({msg:"这是一个信息提示！"}); // 信息提示,如果需要修改弹窗层数：popmsg({msg:"这是一个信息提示！",zindex:900}); 为空则默认900 
	popmsg({html:"<div style='padding:50px 30px; '><h2>我是一个html弹出窗口</h2>这里可以自定义你需要填写的内容</div>"}); // 弹出HTML
	popmsg({dom:".popbox"}); // 弹出DOM 
</script>
```


#图片相册代码调用代码：

```javascript
<script>
	popalbum([
	{
	picItem: ".pic1", // 图片列表的DOM名称 class使用.className , id使用#idName 
	src: ["img","src"], // 图片路径，相对picItem的位置DOM和其路径属性 
	summary: ["img","alt"], // 图片描述，相对picItem的位置和其属性，可以为空。如：<span class="pic_text">图片描述内容</span>则使用[".pic_text","text"] 
	zindex: 900 // 弹窗的的初始层数，可以为空，默认为900 
	}
	// 多个相册 
	,{
	picItem: ".pic2", 
	src: ["img","src"],
	summary: [".pic_text","text"], 
	zindex: 900
	}
	// 多个相册则复制以上代码按格式填写 
	])
</script>
```
