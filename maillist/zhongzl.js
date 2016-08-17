function rf(){
	return false; 
} 
document.oncontextmenu = rf 
function keydown(){
	//if(event.ctrlKey ==true || event.keyCode ==93 || event.shiftKey ==true){
	if(event.keyCode ==93){
		return false;
	}
} 
document.onkeydown =keydown 
function drag(){
	return false;
} 
document.ondragstart=drag  
/*
function stopmouse(e){  
	if (navigator.appName == 'Netscape' && (e.which == 3 || e.which == 2)){   
 		return false; 
	} 
	else if (navigator.appName == 'Microsoft Internet Explorer' && (event.button == 2 || event.button == 3)){   
 		alert("ª∂”≠ π”√£°"); 
		return false;   
 	} 
	return true;  
}  
document.onmousedown=stopmouse;   
if (document.layers)  
	window.captureEvents(Event.MOUSEDOWN);  
window.onmousedown=stopmouse;
*/