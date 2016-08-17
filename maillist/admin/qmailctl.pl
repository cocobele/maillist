#!/usr/bin/perl

$Param=@ARGV[0];
$Value=@ARGV[1];

#######################################################################
   if($Param eq "-c")
   {
        $Param=@ARGV[1];
        $Value=@ARGV[2];

        $FILE="/var/qmail/control/".$Param;    #提示 Insecure dependency in open while running setuid at qmailctl.pl line 36. 因此先要untaint
        $FILE =~ /(.*)/;	
	$FILE = $1;
	
	open(MAIL,">$FILE")||die("不能打开文件!");
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
        $FILE="/var/qmail/control/".$Param;    #提示 Insecure dependency in open while running setuid at qmailctl.pl line 36. 因此先要untaint
        $FILE =~ /(.*)/;	
	$FILE = $1;
	
	open(MAIL,">$FILE")||die("不能打开文件!");
	print MAIL  $Value;
  	close(MAIL);
        
    }
   elsif($Param eq "-x")            #删除文件
   {
        $FILE="/var/qmail/control/".$Value;    #提示 Insecure dependency in open while running setuid at qmailctl.pl line 36. 因此先要untaint
        $FILE =~ /(.*)/;	
	$FILE = $1;
	
	unlink($FILE);        
    }
    elsif($Param eq "-d")   ##自动定时重启电脑
    {        
	$FILE="rebootinteval";
	open(MAIL,">$FILE")||die("不能打开文件!");
	print MAIL  $Value;
  	close(MAIL);
    }
    elsif($Param eq "-s")
    {    	        
        system("/usr/sbin/qmail restart");
    }
    elsif($Param eq "-r")
    {    	        
	
        ##根据系统启动日志文件创建时间判断启动时间
        $boottime=time -24*60*60 * -M "/var/log/boot.log";
	
	$curtime=time;
	
	$runtime=$curtime-$boottime;
	
	print $runtime;
	
	##读取重启参数
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
            
            ##system("./reboot");   ##错误Insecure $ENV{PATH} while running setuid at qmailctl.pl line 63.
            
            
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
    		
    		$ua = new LWP::UserAgent;				# 產生 UserAgent 物件

    		$ua->agent("Mozilla/8.0");   			#伪装成Netscape
    		$request = new HTTP::Request('GET', $Url);		# 產生 Request 物件
    		$response = $ua->request($request);			# 開始抓取網頁，並將結果傳會 $response
    		if ($response->is_success) {			# 若抓取網頁成功，則印出 HTML 原始碼
			$Doc=$response->content;
			#print $Doc;
    		}
    		else {						# 若抓取網頁不成功，則印出錯誤訊息
        		print $response->error_as_HTML;
        		exit;

        	}
        }
        
    }