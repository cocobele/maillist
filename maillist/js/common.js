///////////////////�ж��Ƿ���IP��ַ
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

////////////////////////�ж�Email��ַ�Ϸ���
function ValidString(str)
{
   //�ж��Ƿ�����0-9,a-z,A-Z,-, _ ��.��ɵ��ַ���
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
    //�����ж��Ƿ���@�ź�.��
    var index=str.indexOf("@");
    if (str=="" || index==-1 || index==0)
	return false;

    //�ָ�username��hostname
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

//////////////////////////////���ֻ�۸���λУ��
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

//////////////////////////////�ı����������Ƿ�Ϊ�յ�У��
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

//////////////////////////////�û���������������������У��
function ValidateString(obj,objname,minlength)
{
	errors="";
	if (IsEmpty(obj))
	{
		 errors += objname +"����Ϊ�գ�\n";
         	alert(errors);
		 return false;
	}
    	str=obj.value;
    	if(str.length<minlength)
    	{
    	 	errors += objname +"��������"+ minlength + "λ��\n";
    	 	alert(errors);
		 return false;
	}
    	
	if (str.search(/[^A-Za-z0-9_-]/)>=0) errors +=objname+ "���зǷ��ַ���\n";
	//if (str.search(/[A-Za-z]/)<0) errors += objname + "����Ҫ��һ��Ӣ����ĸ��\n";
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
		 errors += objname +"����Ϊ�գ�\n";
         	alert(errors);
		 return false;
	}
    	str=obj.value;
    	if(str.length<minlength)
    	{
    	 	errors += objname +"��������"+ minlength + "λ��\n";
    	 	alert(errors);
		 return false;
	}
    	
	if (str.search(/[^A-Za-z0-9._-]/)>=0) errors +=objname+ "���зǷ��ַ���\n";
	//if (str.search(/[A-Za-z]/)<0) errors += objname + "����Ҫ��һ��Ӣ����ĸ��\n";
	if (errors!="")
	{
	    alert(errors);
	    obj.focus();
	}
    
	if(str.indexOf(".")==-1)
	{
	    errors="�����б��뺬��.�ַ���";
	    alert(errors);
	    obj.focus();
	}
	if(str.indexOf(".")==0 || str.indexOf(".")==str.length-1)
	{
	    errors=".�ַ������������м䣡";
	    alert(errors);
	    obj.focus();
	}
	
	return (errors=="");
}

//////////////////////////////�绰����/������У��
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

/////////////////////////////////�ֻ���У��
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

////////////////////////////////�鿴һϵ������/�۸���λ������У�飬��Щ��λ������Ӧ�ö�����objname����ָ�����ִ���
////////////////////////////////������λ����Ϊ�գ�����������λ���ܶ�Ϊ�ա�
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

///////////����ʱ���� ��ʽΪ��YYYY-MM-DD
function checkdate(str)
{ 
		str = str.match(/^(\d{2,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
		if (str == null)
		{
			//alert('����������ڸ�ʽ��Ч'); 
			return false;
		}else if (str[3]>12 || str[4]>31)
		{ 
			//alert("����������ڸ�ʽ��Ч"); 
			return false
		}else
		{
			//alert("����������ڸ�ʽ��Ч"); 
			return true; 
		}
} 

////////�ַ�ת����
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