function checkempty (sender, msg) {
var re = /^\s*$/;  
if (re.test(sender.value)) {
alert("["+msg+"] ²»ÄÜÎª¿Õ£¡");
sender.focus();
return false; 
}
return true;
}