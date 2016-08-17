var format = "HTML";
var initHTML = "";
var edit;
var RangeType;
function setFocus() {
	textEdit.focus();
}
function selectRange(){
	edit = textEdit.document.selection.createRange();
	RangeType = textEdit.document.selection.type;
}
function addpic (what,opt,which) {
	myEditor = textEdit.document.selection.createRange();
	RangeType = textEdit.document.selection.type;
	if (RangeType == "Control") {
		EditCtrl.document.execCommand("InsertImage",true);
	} else {
		var picvar = which;
		if (picvar != null) {
			picvar = picvar.split("*");
			var src_v = picvar[0];
			if (src_v != "" && src_v != "http:\/\/") {
				var alt_v = picvar[1];
				var link_v = picvar[2];
				var arrange_v = picvar[3];
				var border_v = picvar[4];
				var iwidth_v = picvar[5];
				var iheight_v = picvar[6];
				if (border_v == "") {
					border_v = "0";
				}

				var image = "";
				var ext_v = src_v.substring(src_v.length - 5);
				if(ext_v.indexOf(".jpg") != -1 || ext_v.indexOf(".gif") != -1 || ext_v.indexOf(".png") != -1){
					image = "<img src=\"" + src_v + "\" alt=\"" + alt_v + "\" border=\"" + border_v + "\" align=\"" + arrange_v + "\" ";
					if(iwidth_v != "" && iwidth_v != "0"){
						image += " width=\"" + iwidth_v + "\" ";
					}
					if(iheight_v != "" && iheight_v != "0"){
						image += " height=\"" + iheight_v + "\" ";
					}
					image += ">";
					if (link_v != "" && link_v != "http:\/\/") {
						image = "<a href=\"" + link_v + "\" target=\"_blank\">" + image + "</a>";
					}				
				}else if(ext_v.indexOf(".swf") != -1){
					image = "<embed src=\"" + src_v + "\" quality=\"high\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" "
					if(iwidth_v != "" && iwidth_v != "0"){
						image += " width=\"" + iwidth_v + "\" ";
					}else{
						image += " width=\"600\" ";
					}
					if(iheight_v != "" && iheight_v != "0"){
						image += " height=\"" + iheight_v + "\" ";
					}else{
						image += " height=\"400\" ";
					}					
					image += "></embed>";
				}
				myEditor.pasteHTML(image);
			}
		}
	}
}
function execCommand(command) {	
	if (format == "HTML"){
		setFocus();
		selectRange();	
		if ((command == "Undo") || (command == "Redo"))
			document.execCommand(command);
		else{
			if (arguments[1]==null)				
				edit.execCommand(command);
			else
				edit.execCommand(command, false, arguments[1]);}
		textEdit.focus();
		if (RangeType != "Control") edit.select();
	}	
}

function swapModes(Mode) {	
	//alert(Mode);
	//alert(format);
	switch(Mode){
		case 1:
			if (format == "ABC"){
				textEdit.document.body.innerHTML = textEdit.document.body.innerText;
				textEdit.document.body.style.fontFamily = "";
				textEdit.document.body.style.fontSize ="";
			}
			else{
				initHTML = textEdit.document.body.innerHTML;
				initEditor();
			}
			format = "HTML";
			break;	
		case 2:
			if (format == "PREVIEW"){
				initHTML = textEdit.document.body.innerHTML;
				initEditor();
			}	
			textEdit.document.body.innerText = textEdit.document.body.innerHTML;
			textEdit.document.body.style.fontFamily = "Verdana";
			if(parent.parent.document.forms[0].CssStyle.value==2) 
			    textEdit.document.body.style.fontSize = "9pt";		
			else
			    textEdit.document.body.style.fontSize = "14.8px";			
			format = "ABC";
			break;
		case 3:
			var strHTML = "";
			if(format == "ABC"){
				strHTML = textEdit.document.body.innerText;
				textEdit.document.body.style.fontFamily = "";
				textEdit.document.body.style.fontSize ="";
			}
			else{
				strHTML = textEdit.document.body.innerHTML;				
			}			
			format = "PREVIEW";
			textEdit.document.designMode="Off";
			textEdit.document.open();
			textEdit.document.write(strHTML);
			textEdit.document.close();
			if(textEdit.document.styleSheets.length == 0){
				textEdit.document.createStyleSheet();
				var oSS = textEdit.document.styleSheets[0];
				oSS.addRule("TABLE.ubb","border: 1px solid #A9A9A9;FONT-SIZE: 9pt; ");
				oSS.addRule("TD.ubb","border: 1px solid #A9A9A9;FONT-SIZE: 9pt; ");
				if(parent.parent.document.forms[0].CssStyle.value==2)
			    		oSS.addRule("BODY","FONT-SIZE: 9pt;");
				else
					oSS.addRule("BODY","FONT-SIZE: 14.8px;");
				oSS.addRule("IMG","border: 0");
			}
			break;
		default:
			return(0);
	}
	textEdit.focus();
	return(1);
}
function specialtype(Mark){
	if (format == "HTML"){
		var strHTML;
		setFocus();
		selectRange();	
		if (RangeType == "Text"){
			strHTML = "<" + Mark + ">" + edit.text + "</" + Mark + ">"; 
			edit.pasteHTML(strHTML);
			textEdit.focus();
			edit.select();			
		}
	}
}
function pasteHTML(HTML){	
	if (format == "HTML"){
		setFocus();
		selectRange();
		edit.pasteHTML(HTML);
		textEdit.focus();
		if (RangeType != "Control") edit.select();
	}
}
function initEditor() {
	textEdit.document.designMode="On";
	textEdit.document.open();
	textEdit.document.write(initHTML);
	textEdit.document.close();
	initHTML = "";
	if(textEdit.document.styleSheets.length == 0){
		textEdit.document.createStyleSheet();
		var oSS = textEdit.document.styleSheets[0];
		oSS.addRule("TABLE.ubb","border: 1px solid #A9A9A9;FONT-SIZE: 9pt; ");
		oSS.addRule("TD.ubb","border: 1px solid #A9A9A9;FONT-SIZE: 9pt; ");
		oSS.addRule("IMG","border: 0");
		if(parent.parent.document.forms[0].CssStyle.value==2)
			oSS.addRule("BODY","FONT-SIZE: 9pt;");
		else
			oSS.addRule("BODY","FONT-SIZE: 14.8px;");
	}	
}
function init() {
	initEditor();
	with (parent){
		if (loaded){
			parent.status = "";
		}
		else
			loaded = 1;	
	}
}
initHTML = parent.parent.strHTML;
window.onload = init