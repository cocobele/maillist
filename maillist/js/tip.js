var iXuEr_TipsPop = null;
var iXuEr_TipsoffsetX = 10; // ��ʾ��λ������������Ҳ�ľ��룻3-12 ����
var iXuEr_TipsoffsetY = 15; // ��ʾ��λ������·��ľ��룻3-12 ����
var iXuEr_TipsPopbg = "#FFFFFF"; // ��ʾ�򱳾�ɫ
var iXuEr_TipsPopfg = "infotext"; // ��ʾ��ǰ��ɫ
var iXuEr_TipsAlpha = 100; // ��ʾ��͸���ȣ�100Ϊ��͸��
var iXuEr_Tipsshadowcolor = "threedlightshadow"; // ��ʾ����Ӱ��ɫ
var iXuEr_Tipsshadowdirection = 135; // ��ʾ����Ӱ����
var iXuEr_TipsTitlebg = "activecaption"; // ��ʾ��������ֱ���
var iXuEr_TipsTitlefg = "captiontext"; // ��ʾ�����������ɫ
var iXuEr_TipsBorderColor = "activecaption"; // ��ʾ�����߿���ɫ
var iXuEr_TipsBorder	= 1; // ��ʾ�����߿���
var iXuEr_TipsBaseWidth = 265; // ��ʾ����С��� ע�����ֵ��ò�ҪС����ʾ������ؿ��
var iXuEr_TipsTitle = "������ʾ"; // ��ʾ���������
var iXuEr_TipsSmallTitle = "�����ʼ�";	// ��ʾ�򸱱������� 
var iXuEr_TipsTitleCt = " �� " // �������ֺ͸���������֮������ӷ�

var FormObj;
var UsedForm="none";
// ==================================================================================

document.write('<div id=iXuEr_TipsLayer style="display: none;position: absolute; z-index:10001;"></div>');

function iXuEr_Tips(){
	var o=event.srcElement;
	if(o.alt==null && o.title==null){return false;}
	if(o.alt!=null && o.alt!=""){o.dypop=o.alt;o.alt=""};
	if(o.title!=null && o.title!=""){o.dypop=o.title;o.title=""};
	iXuEr_TipsPop=o.dypop;
	if(iXuEr_TipsPop!=null && iXuEr_TipsPop!="" && typeof(iXuEr_TipsPop)!="undefined"){
		iXuEr_TipsLayer.style.left=-1000;
		iXuEr_TipsLayer.style.display='';
		var Msg = iXuEr_TipsPop.replace(/\n/g,"<br>"); // ���з�
		//Msg = Msg.replace(/\r/g,"<br>"); // �س���
		if(iXuEr_TipsSmallTitle==""){iXuEr_TipsTitleCt="";}
		var attr=(document.location.toString().toLowerCase().indexOf("list.asp")>0?"nowrap":"");
		var content = '<table style="FILTER:alpha(opacity='+iXuEr_TipsAlpha+') shadow(color='+iXuEr_Tipsshadowcolor+',direction='+iXuEr_Tipsshadowdirection+');" id=toolTipTalbe border=0><tr><td width="100%"><table border=0 cellspacing="'+iXuEr_TipsBorder+'" cellpadding="2" style="width:100%;background-color:'+iXuEr_TipsBorderColor+';line-height:20px;">'+
		'<tr id=iXuEr_TipsPoptop><th style="width:100%; color:'+iXuEr_TipsTitlefg+'; background-color:'+iXuEr_TipsTitlebg+';"><b><p id=topleft align=left>�I '+iXuEr_TipsTitle+iXuEr_TipsTitleCt+iXuEr_TipsSmallTitle+'</p><p id=topright align=right style="display:none">'+iXuEr_TipsSmallTitle+iXuEr_TipsTitleCt+iXuEr_TipsTitle+' �J</font></b></th></tr>'+
		'<tr><td '+attr+' style="width:100%; background-color:'+iXuEr_TipsPopbg+'; color:'+iXuEr_TipsPopfg+'; padding-left:10px; padding-right:10px; padding-top: 4px; padding-bottom:4px; line-height:135%;font-family: Verdana, Arial, Helvetica, sans-serif, "����";">'+Msg+'</td></tr>'+
		'<tr id=iXuEr_TipsPopbot style="display:none"><th style="width:100%;color:'+iXuEr_TipsTitlefg+';background-color:'+iXuEr_TipsTitlebg+';"><b><p id=botleft align=left>�L '+iXuEr_TipsTitle+iXuEr_TipsTitleCt+iXuEr_TipsSmallTitle+'</p><p id=botright align=right style="display:none">'+iXuEr_TipsSmallTitle+iXuEr_TipsTitleCt+iXuEr_TipsTitle+' �K</font></b></th></tr>'+
		'</table></td></tr></table>';
		iXuEr_TipsLayer.innerHTML = content;
		var toolTipwidth = Math.min(iXuEr_TipsLayer.clientWidth, document.body.clientWidth/2.2);
		if(toolTipwidth<iXuEr_TipsBaseWidth){toolTipwidth=iXuEr_TipsBaseWidth;}
		toolTipTalbe.style.width=toolTipwidth;
		MoveToMouseLoc();
		return true;
	}else{
		iXuEr_TipsLayer.innerHTML='';
		iXuEr_TipsLayer.style.display='none';
		return true;
	}
}

function MoveToMouseLoc(){
	if(iXuEr_TipsLayer.innerHTML==''){return true;}
	var MouseX=event.x;
	var MouseY=event.y;
	var popTopAdjust=0;
	//window.status="x:"+event.offsetX;
	//window.status+=" y:"+event.offsetY;
	var popHeight=iXuEr_TipsLayer.clientHeight;
	var popWidth=iXuEr_TipsLayer.clientWidth;
	if(MouseY+iXuEr_TipsoffsetY+popHeight>document.body.clientHeight){
		popTopAdjust=-popHeight-iXuEr_TipsoffsetY*1.5;
		iXuEr_TipsPoptop.style.display="none";
		iXuEr_TipsPopbot.style.display="";
	}else{
		popTopAdjust=0;
		iXuEr_TipsPoptop.style.display="";
		iXuEr_TipsPopbot.style.display="none";
	}
	if(MouseX+iXuEr_TipsoffsetX+popWidth>document.body.clientWidth){
		popLeftAdjust=-popWidth-iXuEr_TipsoffsetX*2;
		topleft.style.display="none";
		botleft.style.display="none";
		topright.style.display="";
		botright.style.display="";
	}else{
		popLeftAdjust=0;
		topleft.style.display="";
		botleft.style.display="";
		topright.style.display="none";
		botright.style.display="none";
	}
	iXuEr_TipsLayer.style.left=MouseX+iXuEr_TipsoffsetX+document.body.scrollLeft+popLeftAdjust;
	iXuEr_TipsLayer.style.top=MouseY+iXuEr_TipsoffsetY+document.body.scrollTop+popTopAdjust;
	return true;
}

document.onmousemove 	= iXuEr_Tips;

// ����Ƿ�Ϊ��Ԫ��
function IndexDemo(Obj){
	var str1 = new Array("INPUT", "TEXTAREA", "SELECT");
	var str2 = new Array("BUTTON", "SUBMIT", "RESET", "RADIO", "CHECKBOX", "IMAGE");
	var s = false;
	var i, n
	try{
		for(i=0; i<=str1.length; i++){
			if(Obj.tagName.toUpperCase()==str1[i]){
				s = true;
					if(Obj.type!=""){
						for(n=0; n<=str2.length; n++){
							if(Obj.type.toUpperCase()==str2[n]){s = false;}
						}
					}
				}
			}
		}
	catch(e){}
	return(s);
}

// ����꾭��Ԫ��ʱ
function Formover(){
	// ��ȡ�����¼���Ԫ��
	FormObj = event.srcElement;
	if (IndexDemo(FormObj)==true && FormObj.className!="input_click"){FormObj.className="input_over";}
}

// ��������Ԫ��ʱ
function Formclick(){
	// �������Ԫ��֮����ʱȡ��ԭ���������ʽ
	if(UsedForm!="none"){
		var UsedObj=document.getElementsByName(UsedForm);
		var i;
		for(i=0; i<UsedObj.length; i++){
			if(UsedObj.item(i).className!=""){
				UsedObj.item(i).className="";
				UsedForm=UsedObj.item(i);
			}
		}
	}
	// �������ָ��Ԫ��֮�ڵ��ʱ���ü�����ʽ
	if (IndexDemo(FormObj)==true){
		FormObj.className="input_click";
		if(FormObj.name){
			UsedForm=FormObj.name;
		}else{
			UsedForm="none";
		}
	}
}

// ������Ƴ���Ԫ��ʱ
function Formout(){
	if (IndexDemo(FormObj)==true && FormObj.className!="input_click"){FormObj.className="";}
}

document.onmouseover 	= Formover;
document.onmouseout 	= Formout;
document.onmousedown 	= Formclick;
