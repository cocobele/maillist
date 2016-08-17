//**********************************************************************************************
/**
LogicalValue:用于判断对象的值是否符合条件，现已提供的选择有：
	integer：整型，还可判断正整型和负整型
	number ：数值型，同样可判断正负
	date ：日期型，可支持以自定义分隔符的日期格式，缺省是以'-'为分隔符
	string ：判断一个字符串包括或不包括某些字符
返回值：	true或false

参  数：	ObjStr ：对象标识符——对象名；
	ObjType：对象类型('integer','number','date','string'之一)

其他说明：当对象值为空时，则返回错误。
*/
function LogicalValue(ObjStr,ObjType){
	var str='';
	if ((ObjStr==null) || (ObjStr=='') || ObjType==null){
		alert('函数LogicalValue缺少参数!');
		return false;
	}
	var obj = document.all(ObjStr);
	if (obj.value=='') return false;
	for (var i=2;i<arguments.length;i++){ 
		if (str!='')
			str += ',';
		str += 'arguments['+i+']';
	}
	str=(str==''?'obj.value':'obj.value,'+str);
	var temp=ObjType.toLowerCase();
	if (temp=='integer'){
		return eval('IsInteger('+str+')');
	}
	else if (temp=='number'){
		return eval('IsNumber('+str+')');
	}
	else if (temp=='string'){
		return eval('SpecialString('+str+')');
	}
	else if (temp=='date'){
		return eval('IsDate('+str+')');
	}
	else{
		alert('"'+temp+'"类型在现在版本中未提供');
		return false;
	}
}
//end LogicalValue() function
//**********************************************************************************************
/**
IsInteger: 用于判断一个数字型字符串是否为整形，还可判断是否是正整数或负整数，返回值为true或false
string: 需要判断的字符串
sign: 若要判断是正负数是使用，是正用'+'，负'-'，不用则表示不作判断
*/
function IsInteger(string ,sign){ 
	var integer;
	if ((sign!=null) && (sign!='-') && (sign!='+')){
		alert('IsInter(string,sign)的参数出错：\nsign为null或"-"或"+"');
		return false;
	}
	integer = parseInt(string);
	if (isNaN(integer)){
		return false;
	}
	else if (integer.toString().length==string.length){ 
		if ((sign==null) || (sign=='-' && integer<0) || (sign=='+' && integer>0)){
			return true;
		}
		else
			return false; 
	}
	else
		return false;
}
//end function IsInteger()
//**********************************************************************************************
/**
IsDate: 用于判断一个字符串是否是日期格式的字符串

返回值：	true或false

参数：	DateString： 需要判断的字符串
	Dilimeter ： 日期的分隔符，缺省值为'-'
*/

function IsDate(DateString , Dilimeter){
	if (DateString==null) return false;
	if (Dilimeter=='' || Dilimeter==null)
		Dilimeter = '-';
	var tempy='';
	var tempm='';
	var tempd='';
	var tempArray;
	if (DateString.length<8 || DateString.length>10)
		return false; 
	tempArray = DateString.split(Dilimeter);
	if (tempArray.length!=3)
		return false;
	if (tempArray[0].length==4){
		tempy = tempArray[0];
		tempm = tempArray[1];
		tempd = tempArray[2];
	}
	else{
		//tempy = tempArray[2];
		//tempm = tempArray[1];
		//tempd = tempArray[0];
		return false;
	}
	if (tempy.length !=4 || tempm.length != 2 || tempd.length != 2){
		return false;
	}
	if (tempm.charAt(0) == "0"){
		tempm = tempm.substring(1);	
	}
	if (tempd.charAt(0) == "0"){
		tempd = tempd.substring(1);
	}
	var tDateString = tempy + '/'+tempm + '/'+tempd+' 8:0:0';//加八小时是因为我们处于东八区
	var tempDate = new Date(tDateString);
	if (isNaN(tempDate))
		return false;
	if (((tempDate.getUTCFullYear()).toString()==tempy) && (tempDate.getMonth()==parseInt(tempm)-1) && (tempDate.getDate()==parseInt(tempd))){
		return true;
	}
	else{
		return false;
	}
}
//end function IsDate()
//**********************************************************************************************
/**
IsNumber:用于判断一个数字型字符串是否为数值型，还可判断是否是正数或负数，返回值为true或false
string:	 需要判断的字符串
sign:	 若要判断是正负数是使用，是正用'+'，负'-'，不用则表示不作判断
*/
function IsNumber(string,sign){
	var number;
	if (string==null) return false;
	if ((sign!=null) && (sign!='-') && (sign!='+')){
		alert('IsNumber(string,sign)的参数出错：\nsign为null或"-"或"+"');
		return false;
	}
	number = new Number(string);
	if (isNaN(number)){
		return false;
	}
	else if ((sign==null) || (sign=='-' && number<0) || (sign=='+' && number>0)){
		return true;
	}
	else
		return false;
}
//end function IsNumber()
//**********************************************************************************************
/**
SpecialString: 用于判断一个字符串是否含有或不含有某些字符

返回值：	true或false

参数：	string ： 需要判断的字符串
	compare ： 比较的字符串(基准字符串)
	BelongOrNot： true或false，“true”表示string的每一个字符都包含在compare中，“false”表示string的每一个字符都不包含在compare中
*/
function SpecialString(string,compare,BelongOrNot){
	if ((string==null) || (compare==null) || ((BelongOrNot!=null) && (BelongOrNot!=true) && (BelongOrNot!=false))){
		alert('function SpecialString(string,compare,BelongOrNot)参数错误');
		return false;
	}
	if (BelongOrNot==null || BelongOrNot==true){
		for (var i=0;i<string.length;i++){
			if (compare.indexOf(string.charAt(i))==-1)
				return false
		}
		return true;
	}
	else{
		for (var i=0;i<string.length;i++){
			if (compare.indexOf(string.charAt(i))!=-1)
				return false
		}
		return true;
	}
}
//end function SpeialString()
//**********************************************************************************************
/**
lTrim(): 去掉字串左边的空格

参数：str ：需要去掉空格的字符串
*/
function lTrim(str){
	if (str.charAt(0) == " "){
		//如果字串左边第一个字符为空格
		str = str.slice(1);//将空格从字串中去掉
		//这一句也可改成 str = str.substring(1, str.length);
		str = lTrim(str); //递归调用
	}
	return str;
}
//**********************************************************************************************
/**
rTrim(): 去掉字串右边的空格

参数：str ：需要去掉空格的字符串
*/
function rTrim(str){
	var iLength;

	iLength = str.length;
	if (str.charAt(iLength - 1) == " "){
		//如果字串右边第一个字符为空格
		str = str.slice(0, iLength - 1);//将空格从字串中去掉
		//这一句也可改成 str = str.substring(0, iLength - 1);
		str = rTrim(str); //递归调用
	}
	return str;
}
//**********************************************************************************************
/**
trim(): 去掉字串两边的空格

参数：str ：需要去掉空格的字符串
*/
function trim(str){
	return lTrim(rTrim(str));
}
//**********************************************************************************************
/**
hasSpecialChar(): 判断是否是特殊字符

参数：inString ：需要判断的字符串
specialChars ：特殊字符数组
*/
function hasSpecialChar(inString, specialChars){
	for(var i = 0; i < inString.length; i++){
		var inChar = inString.charAt(i);
		for(var j = 0; j < specialChars.length; j++){
			if(inChar == specialChars[j]){
				return true;
			}
		}
	}
	return false;
}
//**********************************************************************************************
/**
isEmail(): 判断是否是特殊字符

参数：inString ：需要判断的字符串
specialChars ：特殊字符数组
*/
function isEmail(inString, specialChars){
	if(!hasSpecialChar(inString, specialChars)){
		if(inString.indexOf("@") != -1){
			return true;
		}
	}
	return false;
}
//**********************************************************************************************