/*
// �˵���HTML����
var strMenu = "<div id=\"menu\" class=\"clsMenu\" onMouseover=\"highlight()\" onMouseout=\"lowlight()\">"
strMenu += "<div class=\"menuitems\" onClick=\"this.style.behavior='url(#default#homepage)';this.setHomePage('http://pc.wx-e.com');\" >.::��Ϊ��ҳ::.</div>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:window.external.AddFavorite('http://pc.wx-e.com/', '.::PC���::.')\">.::�����ղ�::.</div>"
strMenu += "<hr>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='http://pc.wx-e.com'\">.::��վ��ҳ::.</div>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='http://pc.wx-e.com/write/index.htm'\">.::����Ϳѻ::.</div>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='http://pc.wx-e.com/cheng/index.htm'\">.::�ɳ�����::.</div>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='http://pc.wx-e.com/love/index.htm'\">.::��ζ����::.</div>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='http://pc.wx-e.com/photos/index.htm'\">.::��������::.</div>"

strMenu += "<hr>"
strMenu += "<div class=\"menuitems\" onClick='window.location =\"view-source:\" + window.location.href'>.::��Դ�ļ�::.</a></div>"
strMenu += "<hr>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='http://pc.wx-e.com/others/you.htm'\">.::��������::.</div>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='http://www.21diy.net/mybook/guestbook.asp?user=choushanxiao'\">.::�л�Ҫ˵::.</a></div>"
strMenu += "<div class=\"menuitems\" onClick=\"javascript:location.href='mailto:pc728@hotmail.com'\">.::��ϵ�У�::.</a></div>"
strMenu += "</div>"
*/

// �жϿͻ��������
function ie() {
	if (navigator.appName=="Microsoft Internet Explorer") {
		return true;
	} else {
		return false;
}}

// ��ʾ�˵�
function showmenu(){
	if (ie()){
	// �ҳ�����ڴ����е�λ��
	var rightedge=document.body.clientWidth-event.clientX
	var bottomedge=document.body.clientHeight-event.clientY

	// �������ľ���С�ڲ˵��Ŀ��
	if (rightedge<menu.offsetWidth)
		// ���˵������ƶ����ʵ���λ��
		menu.style.left=document.body.scrollLeft+event.clientX-menu.offsetWidth
	else
		// ���򣬾��ڸ�λ����ʾ�˵�
		menu.style.left=document.body.scrollLeft+event.clientX

	// �����������ͬ���ж������λ��
	if (bottomedge<menu.offsetHeight)
		menu.style.top=document.body.scrollTop+event.clientY-menu.offsetHeight
	else
		menu.style.top=document.body.scrollTop+event.clientY

		menu.style.visibility="visible"
	}
	return false
}


// ���ز˵�
function hidemenu(){
	if (ie()) menu.style.visibility="hidden"
}

// �˵����ý���ʱ������ʾ
function highlight(){
	if (event.srcElement.className=="menuitems"){
		event.srcElement.style.backgroundColor="highlight"
		event.srcElement.style.color="highlighttext"
}}

// �˵���ʧȥ����
function lowlight(){
	if (event.srcElement.className=="menuitems"){
	event.srcElement.style.backgroundColor=""
	event.srcElement.style.color="menutext"
}}