#!/usr/bin/perl

$Param=@ARGV[0];
$Value=@ARGV[1];

#######################################################################
   if($Param eq "-c")
   {
        $Param=@ARGV[1];
        $Value=@ARGV[2];

        $FILE="/var/qmail/control/".$Param;    #��ʾ Insecure dependency in open while running setuid at qmailctl.pl line 36. �����Ҫuntaint
        $FILE =~ /(.*)/;	
	$FILE = $1;
	
	open(MAIL,">$FILE")||die("���ܴ��ļ�!");
	print MAIL  $Value;
  	close(MAIL);
        
   }
   elsif($Param eq "suppls" || $Param eq "concurrencysuppl" || $Param eq "delaysuppl")
   {
        $index=@ARGV[1];
	$Value=@ARGV[2];
	
	if($Param eq "suppls")
	{
	    $Value=~s/\^/\n/g;
	}

	$Param.=$index;
        $FILE="/var/qmail/control/".$Param;    #��ʾ Insecure dependency in open while running setuid at qmailctl.pl line 36. �����Ҫuntaint
        $FILE =~ /(.*)/;	
	$FILE = $1;
	
	open(MAIL,">$FILE")||die("���ܴ��ļ�!");
	print MAIL  $Value;
  	close(MAIL);
        
    }
   elsif($Param eq "-x")            #ɾ���ļ�
   {
        $FILE="/var/qmail/control/".$Value;    #��ʾ Insecure dependency in open while running setuid at qmailctl.pl line 36. �����Ҫuntaint
        $FILE =~ /(.*)/;	
	$FILE = $1;
	
	unlink($FILE);        
    }
    elsif($Param eq "-d")   ##�Զ���ʱ��������
    {        
	$FILE="rebootinteval";
	open(MAIL,">$FILE")||die("���ܴ��ļ�!");
	print MAIL  $Value;
  	close(MAIL);
    }
    elsif($Param eq "-s")
    {    	        
        system("/usr/sbin/qmail restart");
    }
    elsif($Param eq "-r")
    {    	        
	
        ##����ϵͳ������־�ļ�����ʱ���ж�����ʱ��
        $boottime=time -24*60*60 * -M "/var/log/boot.log";
	
	$curtime=time;
	
	$runtime=$curtime-$boottime;
	
	print $runtime;
	
	##��ȡ��������
	$FILE="rebootinteval";
	open(MAIL,"<$FILE") || exit;
	$line=<MAIL>;
  	close(MAIL);
	
	if($line eq "" || $line eq "0")
	{
	    exit;
	}

	$inteval=$line*3600;	
	#print $boottime."==".$curtime."==".$runtime."==".$inteval;
		
        if($runtime>=$inteval)
        {
            
            ##system("./reboot");   ##����Insecure $ENV{PATH} while running setuid at qmailctl.pl line 63.
            
            
                use LWP::UserAgent;
    		use HTTP::Request;
    		use HTTP::Response;

		$WebHost=$Value;

		if($WebHost eq "")
		{
	 		$WebHost="127.0.0.1";
		}
    		#$Url="http://$WebHost/admin/setsystemparam.php?flag=reboot";
    		
    		$Url="http://$WebHost/admin/setsystemparam.php?flag=reboot&cron=1";

    		print $Url;
    		
    		$ua = new LWP::UserAgent;				# �a�� UserAgent ���

    		$ua->agent("Mozilla/8.0");   			#αװ��Netscape
    		$request = new HTTP::Request('GET', $Url);		# �a�� Request ���
    		$response = $ua->request($request);			# �_ʼץȡ�W퓣��K���Y������ $response
    		if ($response->is_success) {			# ��ץȡ�W퓳ɹ����tӡ�� HTML ԭʼ�a
			$Doc=$response->content;
			#print $Doc;
    		}
    		else {						# ��ץȡ�W퓲��ɹ����tӡ���e�`ӍϢ
        		print $response->error_as_HTML;
        		exit;

        	}
        }
        
    }