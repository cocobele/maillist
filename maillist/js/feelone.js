function checkempty (sender, msg) {
var re = /^\s*$/;  
if (re.test(sender.value)) {
alert("["+msg+"] ����Ϊ�գ�");
sender.focus();
return false; 
}
return true;
}