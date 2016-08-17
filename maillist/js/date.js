function isDateTime(sDateTime) {
	var sDateTime=sDateTime.replace(/(^\s+|\s+$)/g,"");
	if(sDateTime=="") return true;
	var DateTimeArr=new Array();
	DateTimeArr=sDateTime.split(/[ ]/);

	if (DateTimeArr.length>2) return false;

	sDate=DateTimeArr[0];
	if (DateTimeArr.length==1) sTime="";
	else sTime=DateTimeArr[1];

	if (!isDate(sDate)) return false;
	if (!isTime(sTime)) return false;
	return true;
}

function isTime(sTime) {
	var Thisar_time = sTime.split(/[:]/);
	if(Thisar_time.length==2)
	{
		sTime+=":01";
	}
	var sTime=sTime.replace(/(^\s+|\s+$)/g,"");
	if(sTime=="")	return true;
	var s = sTime.replace(/[\d]{1,2}[\:]{1}[\d]{1,2}[\:]{1}[\d]{1,2}/g,"");
	if (s=="") //说明格式满足HH:MM:SS
	{
		sTime_Str=new Array();
		sTime_Str=sTime.split(/[:]/);
		sTime_Str[3]="2003";
		sTime_Str[4]="8";
		sTime_Str[5]="16";

		var t=new Date(sTime_Str[3],sTime_Str[4],sTime_Str[5],sTime_Str[0],sTime_Str[1],sTime_Str[2]);
		var iHour=t.getHours();
		var iMinutes=t.getMinutes()
		var iSecond=t.getSeconds();

		var ar = sTime.split(/[:]/);
		if(ar[0] != iHour || ar[1] != iMinutes || ar[2] != iSecond){
			return false;
		}
	}else{
		return false;
	}
	return true;
}

function isDate(sDate)
{
	var sDate=sDate.replace(/(^\s+|\s+$)/g,"");
	if(sDate=="")	return true;
	var s = sDate.replace(/[\d]{4,4}[\.\-\/]{1}[\d]{1,2}[\.\-\/]{1}[\d]{1,2}/g,"");
	if (s=="") //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D
	{
		sDate=sDate.replace(/\-/g,"/");
		sDate=sDate.replace(/\./g,"/");

		var t=new Date(sDate);

		var iYear=t.getYear();
		if (iYear<100) (iYear+=1900);
		var iMonth=t.getMonth()+1;
		var iDay=t.getDate();

		var ar = sDate.split(/[/]/);

		if(ar[0] != iYear || ar[1] != iMonth || ar[2] != iDay)	{
			return false;
		}
	}else{
		return false;
	}
	return true;
}

function GetEndDay(iYear,iMonth) {
	var oYear=iYear;
	var oMonth=iMonth;
	var oDay=31;
	for (i=31;i>=28;i--) {
		iDate=iYear+"/"+iMonth+"/"+i;
		t=new Date(iDate);
		if (t.getDate()==i) {
			oDay=i;
			break;
		}
	}
	return oYear+"-"+oMonth+"-"+oDay;
}

function AddDate(days,iDate) {
	var oDate=new Date(iDate);
	oDate.setDate(oDate.getDate()+days);
	return oDate;
}

function CmpDate(iDate1,iDate2) {
	iDate1=iDate1.replace(/\-/g,"/");
	iDate1=iDate1.replace(/\./g,"/");
	iDate2=iDate2.replace(/\-/g,"/");
	iDate2=iDate2.replace(/\./g,"/");

	if (!isDate(iDate1) || !isDate(iDate2)) {
		return NaN;
	}

	var Date1=new Date(iDate1);
	var Date2=new Date(iDate2);

	var msec=Date2.getTime()-Date1.getTime();

	if (msec<0) return -1;
	if (msec==0) return 0;
	if (msec>0)	return 1;

}

function parseDate(sDate) {
	var iIndex, iYear, iMonth, iDay

	iIndex = sDate.indexOf('-');
	iYear = parseFloat(sDate.substr(0, iIndex));
	sDate = sDate.substring(iIndex + 1, sDate.length);

	iIndex = sDate.indexOf('-');
	iMonth = parseFloat(sDate.substr(0, iIndex));
	iDay = parseFloat(sDate.substring(iIndex + 1, sDate.length));

	return new Date(iYear, iMonth - 1, iDay);
}


////////////////////////////////计算两个日期之差（日期格式 2003-02-12）
function dateadd(date1,days)
{
    //分隔开始日期年月日
    date1=date1.replace(/\//g,"-");
    date1=date1.replace(/\./g,"-");

    var str;
    index=date1.indexOf("-");
    year=parseInt(date1.substring(0,index));
    date1=date1.substring(index+1);
    index=date1.indexOf("-");
    str=date1.substring(0,index);
    if(str.substring(0,1)=="0") str=str.substring(1,2);
    month=parseInt(str);
    str=date1.substring(index+1);
    if(str.substring(0,1)=="0") str=str.substring(1,2);
    day=parseInt(str);

    startdate=new Date();
    startdate.setYear(year);
    startdate.setMonth(month-1);
    startdate.setDate(day);
    startdate.setDate(str);
    startdate.setMinutes(0);
    startdate.setSeconds(0);
    startdate.setMilliseconds(0);

    enddate=new Date();
    enddate.setDate(startdate.getDate()+days);

    day=enddate.getDate();
    month=enddate.getMonth();
    month+=1;
    year=enddate.getYear();

    return  year+"-"+month+"-"+day;

}
////////////////////////////////计算两个日期之差（日期格式 2003-02-12）
function datediff(date1,date2)
{
    //分隔开始日期年月日
    date1=date1.replace(/\//g,"-");
    date1=date1.replace(/\./g,"-");
    date2=date2.replace(/\//g,"-");
    date2=date2.replace(/\./g,"-");

    var str;
    index=date1.indexOf("-");
    year=parseInt(date1.substring(0,index));
    date1=date1.substring(index+1);
    index=date1.indexOf("-");
    str=date1.substring(0,index);
    if(str.substring(0,1)=="0") str=str.substring(1,2);
    month=parseInt(str);
    str=date1.substring(index+1);
    if(str.substring(0,1)=="0") str=str.substring(1,2);
    day=parseInt(str);

    startdate=new Date();
    startdate.setYear(year);
    startdate.setMonth(month-1);
    startdate.setDate(day);
    startdate.setDate(str);
    startdate.setMinutes(0);
    startdate.setSeconds(0);
    startdate.setMilliseconds(0);

    //分隔结束日期年月日
    index=date2.indexOf("-");
    year=parseInt(date2.substring(0,index));
    date2=date2.substring(index+1);
    index=date2.indexOf("-");
    str=date2.substring(0,index);
    if(str.substring(0,1)=="0") str=str.substring(1,2);
    month=parseInt(str);
    str=date2.substring(index+1);
    if(str.substring(0,1)=="0") str=str.substring(1,2);
    day=parseInt(str);

    enddate=new Date();
    enddate.setYear(year);
    enddate.setMonth(month-1);
    enddate.setDate(day);
    enddate.setMinutes(0);
    enddate.setSeconds(0);
    enddate.setMilliseconds(0);

    diff  = new Date();
    //diff.setTime(Math.abs(enddate.getTime() - startdate.getTime()));
    diff.setTime(enddate.getTime() - startdate.getTime());
    timediff = diff.getTime();
    days = Math.floor(timediff / (1000 * 60 * 60 * 24));

    return days;

}
