function redir(url,url2)
	{
		location.href="/WebTraffic/UrlMoniter.asp?url="+url+"&url2="+url2
	}
var __cc_sys_url = "/webtraffic/getinfo.asp?";

/*
	count.js - COCOON Counter 6
	var __cc_uid = "test";
	var __cc_style = 20;
*/
if(typeof(__cc_style)=="undefined") __cc_style=20;
var url = escape(location.href);
var frompage = escape(document.referrer);

var __cc_count = __cc_sys_url + "url="+url+"&frompage="+frompage;
//alert(__cc_count);		   
document.write( '<img src="../template06.files/%27%2B__cc_count%2B%27" width=0 height=0>');
