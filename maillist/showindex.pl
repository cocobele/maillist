#!/usr/bin/perl

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
###################################################################
&ReadCGI();
$selectlist=$form{selectlist};
$list_host=$form{list_host};
$flag=$form{flag};   ##判断是否查看最后一个信体
#$list_rootdir="/var/qmail/alias";   #不用alias目录保存列表了
$list_rootdir="/home/vpopmail/domains/$list_host";

$count=0;
%month=("Jan",1,"Feb",2,"Mar",3,"Apr",4,"May",5,"Jun",6,"Jul",7,"Aug",8,"Sep",9,"Oct",10,"Nov",11,"Dec",12); 

$MsgIndex="";  ##保存邮件索引
$LastMsg="";    ##保存最后一个邮件信息
#######################################################################
      
$Head= qq!
   <p>&nbsp;</p>
  <table width="680" border="0" cellpadding="2" cellspacing="1" bgcolor="#" align=center>
    <tr bgcolor="#666666">         
    <td align="center" colspan="3">
    <font color=#ffffff><span style="font-size:14.8px"><b>--邮件列表 $selectlist 投递记录--</b></span></font>
    </td>
    </tr>
  </table>!;

 $MsgIndex= qq!

 
	<p>&nbsp;<br></p>
	<table border=1 align="center" cellpadding="1" cellspacing="0" bordercolordark="#FFFFFF" bordercolorlight="#000000" width="680">
	<tr align=center>
	<td height=24 background="images/mmto1.gif">序号</td><td background="images/mmto1.gif">邮件主题</td><td background="images/mmto1.gif">发信时间</td><td background="images/mmto1.gif">发信人</td><td background="images/mmto1.gif">投递记录</td>
	</tr>
	!;

    
###################################
for($msgdir=0;$msgdir<1000;$msgdir++)    ##最多扫描1000个archive目录
{

	$filedir="$list_rootdir/$selectlist/archive/$msgdir";
	if (-d $filedir)
	{
	
		$filename="$filedir/index";
		#$filename="/home/lls/index";
		open(MAIL,"$filename") || die("错误：不能打开文件");
		while($line=<MAIL>)
		{  
	    		#print "$line<br>";
	    		###格式如下：
	    		##2: lndknfihmnlbhghhllgl 美丽的承德欢迎您！
            		##	11 Aug 2002 16:51:14 -0000;gnoihhlkfahaoejgeoka test
	        
	    		if($count%2==0)
	    		{
	    
	    			#注：由于index文件中可能不是严格按序号，如13,14.16.17，故用index中的序号标记作为序号，而不用count++计数
	    			#$num=$count/2+1;   
	    			#if($num<10) {$num="0".$num;}
	    	
	 			#$line=~/(\d+):\s[a-z]+\s(\S+)/
	 			$line=~/(\d+):\s[a-z]+\s(.+)/;
				$num=$1;
	    			$num%=100;
	    			if($num<10) {$num="0".$num;}
				 
				 $MsgIndex.= qq!
				<tr align=center>
				<td align=center><font color=red>$1</font></td><td><a href="showmsg.php?list=$selectlist&msgdir=$msgdir&msgnum=$num">$2</a></td>
				!;
				
				$LastMsg=qq!			
    				<tr><td  height=18 nowrap width=10% align=left valign=middle>&nbsp;<b>主　　题</b>：&nbsp;</td><td align=left valign=middle>$2</td></tr>
    				<tr><td width="10%"></td><td bgcolor="#cccccc"></td></tr>!;
		
	    		} 
	    		else{
	    	
	    			$line=~/\s+(\d+)\s(\w+)\s(\d+)\s(\S+)\s\S+\s(\S+)/;
	    			#$line=~/\s+(\d+)\s(\w+)\s(.+)/;
	    			#因为该时间采取的好象是格林威治时间，比北京时间少8小时，故实际时间应该加上8小时
	    			$hour=substr($4,0,2);
	    			$mins=substr($4,2,6);
	    			if(substr($hour,0,1) eq '0')
	    			{
	    			  $hour=substr($hour,1,1);
	    			}
	    			$hour+=8;
	    			if($hour>=24)
	    			{
	    			    $hour=$hour-24;
	    			}
	    			if($hour<10)
	    			{
	    			    $hour="0".$hour;
	    			}
				$time=$hour.$mins;

	    			
	    			$MsgIndex.=qq!
	    				<td align=center>$3年$month{$2}月$1日 $time</td><td align=center>$5</td><td align=center><a href="showpostrecord.php?list=$selectlist&msgdir=$msgdir&msgnum=$num"><img src="/images/edit1.gif" border=0></a></td>
	    				<tr>!;
	    				
	    			$LastMsg.=qq!
	    			<tr><td  height=18 nowrap width=10% align=left valign=middle>&nbsp;<b>时　　间</b>：&nbsp;</td><td align=left valign=middle>$3年$month{$2}月$1日 $time</td></tr>
    				<tr><td width="10%"></td><td bgcolor="#cccccc"></td></tr>
    				<tr><td  height=18 nowrap width=10% align=left valign=middle>&nbsp;<b>发 信 人</b>：&nbsp;</td><td align=left valign=middle>$5</td></tr>
    				<tr><td width="10%"></td><td bgcolor="#cccccc"></td></tr>
    				!;
	    		}
	    
	    		$count++;
		}

       		close(MAIL);

	}
	else{
		
		last;
	}
	
	
}	


$MsgIndex.=qq!</table>!;


$TempMsg=qq! <table width="98%" align="center" cellpadding="1" cellspacing="0" bordercolorlight="cccccc" bordercolordark="ffffff" bgcolor="ffffff" border=1>
    <tr>
    <td>
    <table width=100% bgcolor=#eeeeee border=0 cellpadding=0 cellspacing=0>
    !;

$LastMsg.=qq!<tr><td  height=18 nowrap width=10% align=left valign=middle>&nbsp;<b>投递对象</b>：&nbsp;</td><td align=left valign=middle>$selectlist</td></tr>
    	     <tr><td width="10%"></td><td bgcolor="#cccccc"></td></tr>
    	!;

$LastMsg=$TempMsg.$LastMsg;
$LastMsg.=qq!</table>
    </td>
    </tr>
    </table>!;



#########头部信息##########################################
 print "Content-type: text/html\n\n"; 
 print "<html><head><title>邮件列表 “$selectlist” 投递记录</title>\n"; 
 print "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=gb2312\">\n";
 print "<LINK href=\"/css/style.css\" type=text/css rel=stylesheet>";
 print "</head><body bgcolor='white'>";

 print $Head;
 
 if($flag ne "last")
 {
    
     if($count>0){
     	print $MsgIndex;
     }
     else{
     	
     	print qq!<p align=center><br><br><br><font color=red style="font-size:14.8px">尚未分发任何邮件！</font></p>!;
     }
  }
 else
 {
    print $LastMsg;
 }

#######尾部信息###############
print "</center>";
print "</body></html>";