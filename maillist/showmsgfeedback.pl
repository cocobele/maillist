#!/usr/bin/perl

$list_host=@ARGV[0];
$selectlist=@ARGV[1];
$archive_id=@ARGV[2];
#$list_rootdir="/var/qmail/alias";   #不用alias目录保存列表了
$list_rootdir="/home/vpopmail/domains/$list_host";

$count=0;
%month=("Jan",1,"Feb",2,"Mar",3,"Apr",4,"May",5,"Jun",6,"Jul",7,"Aug",8,"Sep",9,"Oct",10,"Nov",11,"Dec",12); 

$LastMsg="";    ##保存最后一个邮件信息
#######################################################################
    
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
	    	
	    			$num=$count/2+1;
	    			if($num<10) {$num="0".$num;}
	    	
	 			#$line=~/(\d+):\s[a-z]+\s(\S+)/
	 			$line=~/(\d+):\s[a-z]+\s(.+)/;
				
				$LastMsg=qq!			
    				<tr><td height=22nowrap width=13% align=left valign=middle>&nbsp;<b>主　　题</b>：&nbsp;</td><td align=left valign=middle colspan=2><a href='showmsg.php?list=$selectlist&msgdir=$msgdir&msgnum=$num&archive_id=$archive_id' target=_blank>$2</a></td></tr>
    				<tr><td width="12%"></td><td bgcolor="#cccccc" colspan=2></td></tr>!;
		
	    		} 
	    		else
	    		{
	    	
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
				
	    				
	    			$LastMsg.=qq!
	    			<tr><td  height=22nowrap width=13% align=left valign=middle>&nbsp;<b>时　　间</b>：&nbsp;</td><td align=left valign=middle colspan=2>$3年$month{$2}月$1日 $time</td></tr>
    				<tr><td width="12%"></td><td bgcolor="#cccccc" colspan=2></td></tr>
    				<tr><td  height=22nowrap width=13% align=left valign=middle>&nbsp;<b>发 信 人</b>：&nbsp;</td><td align=left valign=middle colspan=2>$5<span id=SenderEmail></span></td></tr>
    				<tr><td width="12%"></td><td bgcolor="#cccccc" colspan=2></td></tr>
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


#########输出信息##########################################

print $LastMsg;

#下段在调用的php内已显示
#print qq!<tr><td  height=22nowrap width=13% align=left valign=middle>&nbsp;<b>投递对象</b>：&nbsp;</td><td align=left valign=middle colspan=2>$selectlist</td></tr>
#    	     <tr><td width="12%"></td><td bgcolor="#cccccc" colspan=2></td></tr>
#!;