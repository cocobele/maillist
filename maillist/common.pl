###################################################################

sub MessageBox {   
	local($width,$title,$message1,$message2,$ifBack)=@_;   
	
	if ($width<100){ $width=350; }   
	
	if (length($title)<1){ $title="提示信息"; }   
	
	$result="<form><center><table border=1 cellpadding=0 cellspacing=1 bgcolor=#C0C0C0>
		<tr><td><table border=0 cellspacing=0>
			<tr bgcolor=navy><td><font color=white>$title</td>
					<td align=right><img src='/HotelRes/images/title.gif'></td>
			</tr>
			<tr><td height=50 width=$width colspan=2>$message1</td></tr>
		";  
	
	if (length($message2)>0){      
		$result=$result."<tr><td align=center colspan=2>$message2</td></tr> ";     
	}
	if ($ifBack ne 0){ 
		$result=$result."<tr><td height=70 colspan=2 align=center><input TYPE=Button language=javascript VALUE='返回上一页' NAME=Action  onclick='window.history.back()'> </td></tr>";     
	}else{       
		$result=$result."<tr><td colspan=2 height=50><center>&nbsp;&nbsp;</td></tr>";
	}  
	
	$result=$result."</table></td></tr></table></form>";
	
	return $result;
}

#### 对url参数进行编码，只用于href标签

sub UrlEncode{  
	local %escapes;  
	local $text=shift;   
	
	for (0..255) {    
		$escapes{chr($_)} = sprintf("%%%02X", $_);    
	}   
	
	$text =~ s/([\x00-\x20"#%;<>?{}|\\\\^~`\[\]\x7F-\xFF])/$escapes{$1}/g; #";   
	
	return $text;
}
	
#############################头部信息
sub Head{
	
	local($Title)=@_;
	
	print "Content-type:text/html\n\n";
	print "<html><head><title>$Title</title>\n"; 
 	print "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=gb2312\">\n";
	print "<style type='text/css'>	
		<!--	 
			p,td,input,select {font-size: 9pt ;}	 
			.font {font-size: 9pt ; line-height:14pt;}
			.font1 {font-size: 14.8px ; line-height:14pt;}
			A { text-decoration:none;} 	
			A:visited { color:purple; text-decoration:none;}
			A:active { color:ff0000; }
			A:hover { color:ff0000; text-decoration:underline;}
		-->	
		</style>";
	print "<BODY bgcolor=white>";
}

#############################尾部信息
sub Tail{
	
	print "</body></html>"; 
 
}

##################解析CGI传递的参数,存入数组$form中##################
sub ReadCGI{
	if ($ENV{'REQUEST_METHOD'} eq 'POST')   {    
		read(STDIN, $buffer, $ENV{'CONTENT_LENGTH'});    
	}elsif ($ENV{'REQUEST_METHOD'} eq 'GET')   {     
		$buffer=$ENV{'QUERY_STRING'};   
	}else {     
		return;   
	}    
	
	@pairs = split(/&/, $buffer);   
	foreach $pair(@pairs) {      
		($name, $value)=split(/=/, $pair);
		$value =~tr/+/ /;      
		$value =~s/%([a-fA-F0-9][a-fA-F0-9])/pack("C", hex($1))/eg;      
		if($form{$name} eq ''){         
			$form{$name} = $value;         
		}else{         
			$form{$name}.=','.$value;         
		}    
	}
}

##########################end of parse CGI#########################

$list_rootdir="/var/qmail/alias";
$MailData_Dir="/home/httpd/bizsky/maillist/mail";
$MailData_HttpDir="/maillist/mail";

1;
