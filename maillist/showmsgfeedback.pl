#!/usr/bin/perl

$list_host=@ARGV[0];
$selectlist=@ARGV[1];
$archive_id=@ARGV[2];
#$list_rootdir="/var/qmail/alias";   #����aliasĿ¼�����б���
$list_rootdir="/home/vpopmail/domains/$list_host";

$count=0;
%month=("Jan",1,"Feb",2,"Mar",3,"Apr",4,"May",5,"Jun",6,"Jul",7,"Aug",8,"Sep",9,"Oct",10,"Nov",11,"Dec",12); 

$LastMsg="";    ##�������һ���ʼ���Ϣ
#######################################################################
    
###################################
for($msgdir=0;$msgdir<1000;$msgdir++)    ##���ɨ��1000��archiveĿ¼
{

	$filedir="$list_rootdir/$selectlist/archive/$msgdir";
	if (-d $filedir)
	{
	
		$filename="$filedir/index";
		#$filename="/home/lls/index";
		open(MAIL,"$filename") || die("���󣺲��ܴ��ļ�");
		while($line=<MAIL>)
		{  
	    		#print "$line<br>";
	    		###��ʽ���£�
	    		##2: lndknfihmnlbhghhllgl �����ĳе»�ӭ����
            		##	11 Aug 2002 16:51:14 -0000;gnoihhlkfahaoejgeoka test
	        
	    		if($count%2==0)
	    		{
	    	
	    			$num=$count/2+1;
	    			if($num<10) {$num="0".$num;}
	    	
	 			#$line=~/(\d+):\s[a-z]+\s(\S+)/
	 			$line=~/(\d+):\s[a-z]+\s(.+)/;
				
				$LastMsg=qq!			
    				<tr><td height=22nowrap width=13% align=left valign=middle>&nbsp;<b>��������</b>��&nbsp;</td><td align=left valign=middle colspan=2><a href='showmsg.php?list=$selectlist&msgdir=$msgdir&msgnum=$num&archive_id=$archive_id' target=_blank>$2</a></td></tr>
    				<tr><td width="12%"></td><td bgcolor="#cccccc" colspan=2></td></tr>!;
		
	    		} 
	    		else
	    		{
	    	
	    			$line=~/\s+(\d+)\s(\w+)\s(\d+)\s(\S+)\s\S+\s(\S+)/;
	    			#$line=~/\s+(\d+)\s(\w+)\s(.+)/;
	    			#��Ϊ��ʱ���ȡ�ĺ����Ǹ�������ʱ�䣬�ȱ���ʱ����8Сʱ����ʵ��ʱ��Ӧ�ü���8Сʱ
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
	    			<tr><td  height=22nowrap width=13% align=left valign=middle>&nbsp;<b>ʱ������</b>��&nbsp;</td><td align=left valign=middle colspan=2>$3��$month{$2}��$1�� $time</td></tr>
    				<tr><td width="12%"></td><td bgcolor="#cccccc" colspan=2></td></tr>
    				<tr><td  height=22nowrap width=13% align=left valign=middle>&nbsp;<b>�� �� ��</b>��&nbsp;</td><td align=left valign=middle colspan=2>$5<span id=SenderEmail></span></td></tr>
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


#########�����Ϣ##########################################

print $LastMsg;

#�¶��ڵ��õ�php������ʾ
#print qq!<tr><td  height=22nowrap width=13% align=left valign=middle>&nbsp;<b>Ͷ�ݶ���</b>��&nbsp;</td><td align=left valign=middle colspan=2>$selectlist</td></tr>
#    	     <tr><td width="12%"></td><td bgcolor="#cccccc" colspan=2></td></tr>
#!;