strHTML = document.forms[0].message.value;
document.write('<iframe ID="editor" NAME="editor" style="width: 630; height:500;display:none"></iframe>');
document.write('<div id="switchDiv" style="padding: 0;margin: 0;width: 610"><table border="0" cellspacing="0" cellpadding="0" width="100%" style="background-color:buttonface">');
document.write('<tr><td id="status1" class="MyContentTdbg"><map name="switch1">');
document.write('<area onclick="switchstatus(2)" shape="polygon" coords="50, 1, 46, 7, 50, 14, 90, 14, 95, 2">');
document.write('<area onclick="switchstatus(3)" shape="polygon" coords="128, 13, 134, 0, 96, 0, 93, 10, 96, 14">');
document.write('</map><img SRC="images/normal.gif" height="15" width="135" usemap="#switch1" border="0">');
document.write('</td><td id="status2" style="display:none" class="MyContentTdbg"><map name="switch2">');
document.write('<area onclick="switchstatus(1)" shape="polygon" coords="5, 3, 12, 14, 43, 14, 49, 6, 43, 0">');
document.write('<area onclick="switchstatus(3)" shape="polygon" coords="97, 0, 94, 7, 98, 14, 127, 14, 134, 0">');
document.write('</map><img SRC="images/html.gif" height="15" width="135" usemap="#switch2" border="0">');
document.write('</td><td id="status3" style="display:none" class="MyContentTdbg"><map name="switch3">');
document.write('<area onclick="switchstatus(1)" shape="polygon" coords="3, 2, 10, 14, 41, 14, 50, 0">');
document.write('<area onclick="switchstatus(2)" shape="polygon" coords="87, 14, 91, 5, 87, 0, 50, 0, 46, 9, 49, 14">');
document.write('</map><img SRC="images/preview.gif" height="15" width="135" usemap="#switch3" border="0"></td>');
document.write('</tr></table></div>');
function switchstatus(flag){
	document.frames.editor.frames.edit1.swapModes(flag);
	for(var i = 1; i < 4; i++){
		document.all["status" + i].style.display = "none";
	}
	document.all["status" + flag].style.display = "block";
}
function win_init(){
	document.all.editor.src = "edit.htm";
	window.status = "程序载入中，请等待……";
}
window.onload = win_init;