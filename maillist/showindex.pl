#!/usr/bin/perl

##################����CGI���ݵĲ���,��������$form��##################
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
$flag=$form{flag};   ##�ж��Ƿ�鿴���һ������
#$list_rootdir="/var/qmail/alias";   #����aliasĿ¼�����б���
$list_rootdir="/home/vpopmail/domains/$list_host";

$count=0;
%month=("Jan",1,"Feb",2,"Mar",3,"Apr",4,"May",5,"Jun",6,"Jul",7,"Aug",8,"Sep",9,"Oct",10,"Nov",11,"Dec",12); 

$MsgIndex="";  ##�����ʼ�����
$LastMsg="";    ##�������һ���ʼ���Ϣ
#######################################################################
      
$Head= qq!
   <p>&nbsp;</p>
  <table width="680" border="0" cellpadding="2" cellspacing="1" bgcolor="#" align=center>
    <tr bgcolor="#666666">         
    <td align="center" colspan="3">
    <font color=#ffffff><span style="font-size:14.8px"><b>--�ʼ��б� $selectlist Ͷ�ݼ�¼--</b></span></font>
    </td>
    </tr>
  </table>!;

 $MsgIndex= qq!

 
	<p>&nbsp;<br></p>
	<table border=1 align="center" cellpadding="1" cellspacing="0" bordercolordark="#FFFFFF" bordercolorlight="#000000" width="680">
	<tr align=center>
	<td height=24 background="images/mmto1.gif">���</td><td background="images/mmto1.gif">�ʼ�����</td><td background="images/mmto1.gif">����ʱ��</td><td background="images/mmto1.gif">������</td><td background="images/mmto1.gif">Ͷ�ݼ�¼</td>
	</tr>
	!;

    
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
	    
	    			#ע������index�ļ��п��ܲ����ϸ���ţ���13,14.16.17������index�е���ű����Ϊ��ţ�������count++����
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
    				<tr><td  height=18 nowrap width=10% align=left valign=middle>&nbsp;<b>��������</b>��&nbsp;</td><td align=left valign=middle>$2</td></tr>
    				<tr><td width="10%"></td><td bgcolor="#cccccc"></td></tr>!;
		
	    		} 
	    		else{
	    	
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

	    			
	    			$MsgIndex.=qq!
	    				<td align=center>$3��$month{$2}��$1�� $time</td><td align=center>$5</td><td align=center><a href="showpostrecord.php?list=$selectlist&msgdir=$msgdir&msgnum=$num"><img src="/images/edit1.gif" border=0></a></td>
	    				<tr>!;
	    				
	    			$LastMsg.=qq!
	    			<tr><td  height=18 nowrap width=10% align=left valign=middle>&nbsp;<b>ʱ������</b>��&nbsp;</td><td align=left valign=middle>$3��$month{$2}��$1�� $time</td></tr>
    				<tr><td width="10%"></td><td bgcolor="#cccccc"></td></tr>
    				<tr><td  height=18 nowrap width=10% align=left valign=middle>&nbsp;<b>�� �� ��</b>��&nbsp;</td><td align=left valign=middle>$5</td></tr>
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

$LastMsg.=qq!<tr><td  height=18 nowrap width=10% align=left valign=middle>&nbsp;<b>Ͷ�ݶ���</b>��&nbsp;</td><td align=left valign=middle>$selectlist</td></tr>
    	     <tr><td width="10%"></td><td bgcolor="#cccccc"></td></tr>
    	!;

$LastMsg=$TempMsg.$LastMsg;
$LastMsg.=qq!</table>
    </td>
    </tr>
    </table>!;



#########ͷ����Ϣ##########################################
 print "Content-type: text/html\n\n"; 
 print "<html><head><title>�ʼ��б� ��$selectlist�� Ͷ�ݼ�¼</title>\n"; 
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
     	
     	print qq!<p align=center><br><br><br><font color=red style="font-size:14.8px">��δ�ַ��κ��ʼ���</font></p>!;
     }
  }
 else
 {
    print $LastMsg;
 }

#######β����Ϣ###############
print "</center>";
print "</body></html>";