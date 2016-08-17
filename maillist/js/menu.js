/*
// 菜单的HTML代码
var strMenu = "<div id=\"menu\" class=\"clsMenu\" onMouseover=\"highlight()\" onMouseout=\"lowlight()\">"
strMenu += "<div class=\"menuitems\" onClick=\"this.style.behavior='url(#default#homepage)';this.setHomePage('http://pc.wx-e.com');\" >.::设为首页::.</div>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:window.external.AddFavorite('http://pc.wx-e.com/', '.::PC真空::.')\">.::加入收藏::.</div>"
strMenu += "<hr>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='http://pc.wx-e.com'\">.::网站首页::.</div>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='http://pc.wx-e.com/write/index.htm'\">.::信手涂鸦::.</div>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='http://pc.wx-e.com/cheng/index.htm'\">.::成长历程::.</div>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='http://pc.wx-e.com/love/index.htm'\">.::五味爱情::.</div>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='http://pc.wx-e.com/photos/index.htm'\">.::岁月留痕::.</div>"

strMenu += "<hr>"
strMenu += "<div class=\"menuitems\" onClick='window.location =\"view-source:\" + window.location.href'>.::看源文件::.</a></div>"
strMenu += "<hr>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='http://pc.wx-e.com/others/you.htm'\">.::友情链接::.</div>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='http://www.21diy.net/mybook/guestbook.asp?user=choushanxiao'\">.::有话要说::.</a></div>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='mailto:pc728@hotmail.com'\">.::联系ＰＣ::.</a></div>"
strMenu += "</div>"
*/

// 判断客户端浏览器
function ie() {
	if (navigator.appName=="Microsoft Internet Explorer") {
		return true;
	} else {
		return false;
}}

// 显示菜单
function showmenu(){
	if (ie()){
	// 找出鼠标在窗口中的位置
	var rightedge=document.body.clientWidth-event.clientX
	var bottomedge=document.body.clientHeight-event.clientY

	// 如果横向的距离小于菜单的宽度
	if (rightedge<menu.offsetWidth)
		// 将菜单向左移动到适当的位置
		menu.style.left=document.body.scrollLeft+event.clientX-menu.offsetWidth
	else
		// 否则，就在该位置显示菜单
		menu.style.left=document.body.scrollLeft+event.clientX

	// 与上面道理相同，判断纵向的位置
	if (bottomedge<menu.offsetHeight)
		menu.style.top=document.body.scrollTop+event.clientY-menu.offsetHeight
	else
		menu.style.top=document.body.scrollTop+event.clientY

		menu.style.visibility="visible"
	}
	return false
}


// 隐藏菜单
function hidemenu(){
	if (ie()) menu.style.visibility="hidden"
}

// 菜单项获得焦点时加亮显示
function highlight(){
	if (event.srcElement.className=="menuitems"){
		event.srcElement.style.backgroundColor="highlight"
		event.srcElement.style.color="highlighttext"
}}

// 菜单项失去焦点
function lowlight(){
	if (event.srcElement.className=="menuitems"){
	event.srcElement.style.backgroundColor=""
	event.srcElement.style.color="menutext"
}}