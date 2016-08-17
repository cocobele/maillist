//**********************************************************************************************
/**
LogicalValue:�����ж϶����ֵ�Ƿ���������������ṩ��ѡ���У�
	integer�����ͣ������ж������ͺ͸�����
	number ����ֵ�ͣ�ͬ�����ж�����
	date �������ͣ���֧�����Զ���ָ��������ڸ�ʽ��ȱʡ����'-'Ϊ�ָ���
	string ���ж�һ���ַ��������򲻰���ĳЩ�ַ�
����ֵ��	true��false

��  ����	ObjStr �������ʶ��������������
	ObjType����������('integer','number','date','string'֮һ)

����˵����������ֵΪ��ʱ���򷵻ش���
*/
function LogicalValue(ObjStr,ObjType){
	var str='';
	if ((ObjStr==null) || (ObjStr=='') || ObjType==null){
		alert('����LogicalValueȱ�ٲ���!');
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
		alert('"'+temp+'"���������ڰ汾��δ�ṩ');
		return false;
	}
}
//end LogicalValue() function
//**********************************************************************************************
/**
IsInteger: �����ж�һ���������ַ����Ƿ�Ϊ���Σ������ж��Ƿ���������������������ֵΪtrue��false
string: ��Ҫ�жϵ��ַ���
sign: ��Ҫ�ж�����������ʹ�ã�������'+'����'-'���������ʾ�����ж�
*/
function IsInteger(string ,sign){ 
	var integer;
	if ((sign!=null) && (sign!='-') && (sign!='+')){
		alert('IsInter(string,sign)�Ĳ�������\nsignΪnull��"-"��"+"');
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
IsDate: �����ж�һ���ַ����Ƿ������ڸ�ʽ���ַ���

����ֵ��	true��false

������	DateString�� ��Ҫ�жϵ��ַ���
	Dilimeter �� ���ڵķָ�����ȱʡֵΪ'-'
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
	var tDateString = tempy + '/'+tempm + '/'+tempd+' 8:0:0';//�Ӱ�Сʱ����Ϊ���Ǵ��ڶ�����
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
IsNumber:�����ж�һ���������ַ����Ƿ�Ϊ��ֵ�ͣ������ж��Ƿ�����������������ֵΪtrue��false
string:	 ��Ҫ�жϵ��ַ���
sign:	 ��Ҫ�ж�����������ʹ�ã�������'+'����'-'���������ʾ�����ж�
*/
function IsNumber(string,sign){
	var number;
	if (string==null) return false;
	if ((sign!=null) && (sign!='-') && (sign!='+')){
		alert('IsNumber(string,sign)�Ĳ�������\nsignΪnull��"-"��"+"');
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
SpecialString: �����ж�һ���ַ����Ƿ��л򲻺���ĳЩ�ַ�

����ֵ��	true��false

������	string �� ��Ҫ�жϵ��ַ���
	compare �� �Ƚϵ��ַ���(��׼�ַ���)
	BelongOrNot�� true��false����true����ʾstring��ÿһ���ַ���������compare�У���false����ʾstring��ÿһ���ַ�����������compare��
*/
function SpecialString(string,compare,BelongOrNot){
	if ((string==null) || (compare==null) || ((BelongOrNot!=null) && (BelongOrNot!=true) && (BelongOrNot!=false))){
		alert('function SpecialString(string,compare,BelongOrNot)��������');
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
lTrim(): ȥ���ִ���ߵĿո�

������str ����Ҫȥ���ո���ַ���
*/
function lTrim(str){
	if (str.charAt(0) == " "){
		//����ִ���ߵ�һ���ַ�Ϊ�ո�
		str = str.slice(1);//���ո���ִ���ȥ��
		//��һ��Ҳ�ɸĳ� str = str.substring(1, str.length);
		str = lTrim(str); //�ݹ����
	}
	return str;
}
//**********************************************************************************************
/**
rTrim(): ȥ���ִ��ұߵĿո�

������str ����Ҫȥ���ո���ַ���
*/
function rTrim(str){
	var iLength;

	iLength = str.length;
	if (str.charAt(iLength - 1) == " "){
		//����ִ��ұߵ�һ���ַ�Ϊ�ո�
		str = str.slice(0, iLength - 1);//���ո���ִ���ȥ��
		//��һ��Ҳ�ɸĳ� str = str.substring(0, iLength - 1);
		str = rTrim(str); //�ݹ����
	}
	return str;
}
//**********************************************************************************************
/**
trim(): ȥ���ִ����ߵĿո�

������str ����Ҫȥ���ո���ַ���
*/
function trim(str){
	return lTrim(rTrim(str));
}
//**********************************************************************************************
/**
hasSpecialChar(): �ж��Ƿ��������ַ�

������inString ����Ҫ�жϵ��ַ���
specialChars �������ַ�����
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
isEmail(): �ж��Ƿ��������ַ�

������inString ����Ҫ�жϵ��ַ���
specialChars �������ַ�����
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