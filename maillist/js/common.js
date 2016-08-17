///////////////////判断是否是IP地址
function ValidIP(str)
{

   for(var i=0;i<str.length;i++)
     {
       lls=str.substring(i,i+1);
       if (!((lls>='0' && lls<='9') ||  lls=='.' ))
	  return false;
     }

	return true;

}

////////////////////////判断Email地址合法性
function ValidString(str)
{
   //判断是否是由0-9,a-z,A-Z,-, _ 和.组成的字符串
   for(var i=0;i<str.length;i++)
     {
       lls=str.substring(i,i+1);
       if (!( (lls>='0' && lls<='9') ||  (lls>='A' && lls<='Z') || (lls>='a' && lls<='z') || lls=='-' || lls=='_' ||  lls=='.' ))
		return false;
     }

	return true;

}


function ValidEmailChar(str)
{
    //首先判断是否有@号和.号
    var index=str.indexOf("@");
    if (str=="" || index==-1 || index==0)
	return false;

    //分隔username和hostname
	var user=str.substring(0,index);
	var host=str.substring(index+1);

    var index1=host.indexOf(".");
	len=host.length;
    if (index1==-1 || index1==0 || index1>len-3)
	return false;

       if(! ValidString(user))
	  return false;

       if(! ValidString(host))
	  return false;

       if(ValidIP(host))
	  return false;	

	return true; 

}

function ValidEmail(obj,errmsg)
{
   var str = obj.value;
  if(ValidEmailChar(str))
     return true;
  else
  {
       if(errmsg) alert(errmsg);
       obj.focus();
     return false;
  }
  
}

//////////////////////////////数字或价格栏位校验
function ValidNum(obj,errmsg)
{
  if(isNaN(obj.value)==true)
  {
     alert(errmsg);
     obj.focus();
     return false;
  }
  else
     return true;
}

//////////////////////////////文本或数字栏是否为空的校验
function IsEmpty(obj,errmsg)
{
    var str = obj.value;
	//alert(str);
    if(str=="")
    {
       if(errmsg) alert(errmsg);
       obj.focus();
       return true;
    }
    
    var tmpstr = str.replace(/\s*$/,"");
    var tmpstr = tmpstr.replace(/^\s*/,"");
    obj.value=tmpstr;
    
    if(tmpstr.length==0)
    {
       if(errmsg) alert(errmsg);
       obj.focus();
    }
    
    return tmpstr.length==0;
}

//////////////////////////////用户名或密码这样的文字栏校验
function ValidateString(obj,objname,minlength)
{
	errors="";
	if (IsEmpty(obj))
	{
		 errors += objname +"不能为空！\n";
         	alert(errors);
		 return false;
	}
    	str=obj.value;
    	if(str.length<minlength)
    	{
    	 	errors += objname +"不得少于"+ minlength + "位！\n";
    	 	alert(errors);
		 return false;
	}
    	
	if (str.search(/[^A-Za-z0-9_-]/)>=0) errors +=objname+ "中有非法字符！\n";
	//if (str.search(/[A-Za-z]/)<0) errors += objname + "至少要有一个英文字母！\n";
	if (errors!="")
	{
	    alert(errors);
	    obj.focus();
	}
    
	return (errors=="");
}


function ValidateDomain(obj,objname,minlength)
{
	errors="";
	if (IsEmpty(obj))
	{
		 errors += objname +"不能为空！\n";
         	alert(errors);
		 return false;
	}
    	str=obj.value;
    	if(str.length<minlength)
    	{
    	 	errors += objname +"不得少于"+ minlength + "位！\n";
    	 	alert(errors);
		 return false;
	}
    	
	if (str.search(/[^A-Za-z0-9._-]/)>=0) errors +=objname+ "中有非法字符！\n";
	//if (str.search(/[A-Za-z]/)<0) errors += objname + "至少要有一个英文字母！\n";
	if (errors!="")
	{
	    alert(errors);
	    obj.focus();
	}
    
	if(str.indexOf(".")==-1)
	{
	    errors="域名中必须含有.字符！";
	    alert(errors);
	    obj.focus();
	}
	if(str.indexOf(".")==0 || str.indexOf(".")==str.length-1)
	{
	    errors=".字符必须在域名中间！";
	    alert(errors);
	    obj.focus();
	}
	
	return (errors=="");
}

//////////////////////////////电话号码/传真栏校验
 function CheckTel(Tel)
{ 
	var i,j,strTemp,len;
	len=Tel.length;
	if(len<8 || len>32)
		return 0;
	strTemp="0123456789-()# "; 	
	for (i=0;i<len;i++)
	{ 
		j=strTemp.indexOf(Tel.charAt(i));  
		if (j==-1) 
			return 0; 
	} 

	return 1; 
}

/////////////////////////////////手机栏校验
function CheckMobile(Tel) 
{ 
	var i,j,strTemp,len; 
	len=Tel.length;
	if(!(len==11 || len==12))
		return 0;
	strTemp="0123456789"; 	
	for (i=0;i<len;i++)
	{ 
		j=strTemp.indexOf(Tel.charAt(i));  
		if (j==-1) 
			return 0; 
	} 

	return 1; 
}

////////////////////////////////查看一系列数字/价格栏位的数字校验，这些栏位的名称应该都含有objname参数指明的字串，
////////////////////////////////单个栏位可以为空，但是所有栏位不能都为空。
function CheckAllPrice(objname)
{ 
  var isnull=1;
  var iserror=0;
  for (i=0;i<=document.form1.elements.length-1;i++)
  {
    if(document.form1.elements[i].name.indexOf(objname)!=-1)
    {
       if(document.form1.elements[i].value=='');
       else
       {
          isnull=0;
          if(verifynum(document.form1.elements[i].value)==true);
          else
              iserror=1;
          
       }
       
          //alert(iserror);
    }
    
  }
  
  if(isnull==0 && iserror==0)
     return 1;
  else
     return 0;

}

///////////日期时间检查 格式为：YYYY-MM-DD
function checkdate(str)
{ 
		str = str.match(/^(\d{2,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
		if (str == null)
		{
			//alert('你输入的日期格式无效'); 
			return false;
		}else if (str[3]>12 || str[4]>31)
		{ 
			//alert("你输入的日期格式无效"); 
			return false
		}else
		{
			//alert("你输入的日期格式有效"); 
			return true; 
		}
} 

////////字符转日期
function stringtodate(DateStr)
{
    if(typeof DateStr=="undefined")
        return new Date();
    if(typeof DateStr=="date")
        return DateStr;
    
    var converted = Date.parse(DateStr);
    var myDate = new Date(converted);
    if(isNaN(myDate))
    {
    	DateStr=DateStr.replace(/:/g,"-");
    	DateStr=DateStr.replace(" ","-");
    	DateStr=DateStr.replace(".","-");
    	var arys= DateStr.split('-');
    	switch(arys.length)
    	{
    	    case 7 : myDate = new Date(arys[0],--arys[1],arys[2],arys[3],arys[4],arys[5],arys[6]);break;
    	    case 6 : myDate = new Date(arys[0],--arys[1],arys[2],arys[3],arys[4],arys[5]);break;
    	    default: myDate = new Date(arys[0],--arys[1],arys[2]);break;
    	}
    }
    
    return myDate;
}